# 🛡️ ScamShield AI

> AI-powered scam detection using Amazon Nova 2 Lite

Built for the **Amazon Nova AI Hackathon** on Devpost.

## 🎯 What it does

ScamShield AI analyzes suspicious messages, emails, and texts to detect scams instantly using Amazon Nova 2 Lite.

- 🔍 Paste any suspicious message
- 🤖 AI analyzes it using Amazon Nova
- 📊 Get a risk score (0-100)
- ⚠️ See exactly why it's suspicious
- 💡 Get safety advice

## 🏗️ Architecture
```
User → React Frontend → Flask Backend → Amazon Nova 2 Lite (AWS Bedrock)
```

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS + Vite
- **Backend:** Python + Flask
- **AI:** Amazon Nova 2 Lite via AWS Bedrock
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

## 🌍 Impact

Online scams affect millions of people every day. ScamShield AI helps protect everyone — especially elderly people and students — from falling victim to phishing and fraud.

## 📹 Demo

[Watch Demo Video](#)

## 👨‍💻 Built by

Binod Budha — CSE Student