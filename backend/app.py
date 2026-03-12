from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = boto3.client(
    service_name="bedrock-runtime",
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"error": "No message provided"}), 400

    prompt = f"""You are a scam detection expert. Analyze the following message and determine if it is a scam.

Message: {message}

Respond in this exact JSON format:
{{
    "risk_score": <number from 0 to 100>,
    "verdict": "<Safe / Suspicious / Scam>",
    "reasons": ["<reason 1>", "<reason 2>", "<reason 3>"],
    "advice": "<one sentence advice for the user>"
}}

Only respond with the JSON. No extra text."""

    body = json.dumps({
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "text": prompt
                }
            ]
        }
    ],
    "inferenceConfig": {
        "max_new_tokens": 500
    }
})

    response = client.invoke_model(
        modelId="amazon.nova-lite-v1:0",
        body=body
    )

    response_body = json.loads(response["body"].read())
    result = response_body["output"]["message"]["content"][0]["text"]
    result_json = json.loads(result)

    return jsonify(result_json)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)