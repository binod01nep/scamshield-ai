from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import json
import os
import base64
import fitz
import io
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_text(text):
    prompt = f"""You are a scam detection expert. Analyze the following message and determine if it is a scam.

Message: {text}

Respond in this exact JSON format:
{{
    "risk_score": <number from 0 to 100>,
    "verdict": "<Safe / Suspicious / Scam>",
    "reasons": ["<reason 1>", "<reason 2>", "<reason 3>"],
    "advice": "<one sentence advice for the user>"
}}

Only respond with the JSON. No extra text."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )

    result = response.choices[0].message.content
    clean = result.strip()
    if clean.startswith("```"):
        clean = clean.split("```")[1]
        if clean.startswith("json"):
            clean = clean[4:]
    return json.loads(clean.strip())

def analyze_image_with_groq(base64_image, media_type):
    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{media_type};base64,{base64_image}"
                        }
                    },
                    {
                        "type": "text",
                        "text": """You are a scam detection expert. Look at this image and analyze if it contains a scam message.

Respond in this exact JSON format:
{
    "risk_score": <number from 0 to 100>,
    "verdict": "<Safe / Suspicious / Scam>",
    "reasons": ["<reason 1>", "<reason 2>", "<reason 3>"],
    "advice": "<one sentence advice for the user>"
}

Only respond with the JSON. No extra text."""
                    }
                ]
            }
        ],
        max_tokens=500
    )

    result = response.choices[0].message.content
    clean = result.strip()
    if clean.startswith("```"):
        clean = clean.split("```")[1]
        if clean.startswith("json"):
            clean = clean[4:]
    return json.loads(clean.strip())

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "No message provided"}), 400
    result = analyze_text(message)
    return jsonify(result)

@app.route("/analyze-image", methods=["POST"])
def analyze_image():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filename = file.filename.lower()

    # Handle PDF - convert first page to image
    if filename.endswith(".pdf"):
        pdf_bytes = file.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        page = doc[0]
        pix = page.get_pixmap()
        img_bytes = pix.tobytes("png")
        base64_image = base64.b64encode(img_bytes).decode("utf-8")
        media_type = "image/png"
    else:
        img_bytes = file.read()
        base64_image = base64.b64encode(img_bytes).decode("utf-8")
        ext = filename.split(".")[-1]
        media_type = f"image/{ext}" if ext != "jpg" else "image/jpeg"

    result = analyze_image_with_groq(base64_image, media_type)
    return jsonify(result)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)