# 🛡️ ScamShield AI
> AI-powered multimodal scam detection using Amazon Nova 2 Lite + Groq AI

Built for the **Amazon Nova AI Hackathon** on Devpost.

## 🎯 What it does
ScamShield AI analyzes suspicious messages, emails, screenshots and PDFs to detect scams instantly using AI.

- ✍️ Paste any suspicious text message
- 📸 Upload screenshot or PDF of suspicious content
- 🤖 AI analyzes it instantly
- 📊 Get a risk score (0-100)
- ⚠️ See exactly why it's suspicious
- 💡 Get personalized safety advice

## 🏗️ Architecture
```
User → React Frontend → Flask Backend → Amazon Nova 2 Lite (AWS Bedrock) / Groq AI (Fallback)
```

## 🛠️ Tech Stack
- **Frontend:** React + Vite
- **Backend:** Python + Flask
- **AI:** Amazon Nova 2 Lite via AWS Bedrock (primary) + Groq LLaMA (fallback)
- **Image Processing:** Groq Vision (LLaMA 4 Scout)
- **Cloud:** AWS

## 🚀 How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `backend/.env`:
```
GROQ_API_KEY=your_groq_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
```

## 🌍 Impact
Online scams affect millions of people every day. ScamShield AI helps protect everyone — especially elderly people and students — from falling victim to phishing and fraud.

People who cannot type or copy suspicious messages can simply **take a screenshot** and upload it — making ScamShield AI accessible to everyone.

## 📹 Demo
[Watch Demo Video](#)

## 👨‍💻 Built by
**Binod Budha** — CSE 3rd Year Student, India  
GitHub: [@binod01nep](https://github.com/binod01nep)
