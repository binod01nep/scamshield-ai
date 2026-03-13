import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      background: "#020008",
      fontFamily: "'Courier New', monospace",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Animated grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,255,180,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,180,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        animation: "gridMove 20s linear infinite",
      }} />

      {/* Glowing orbs */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,180,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,0,255,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>

        {/* Badge */}
        <div style={{
          display: "inline-block",
          border: "1px solid rgba(0,255,180,0.3)",
          borderRadius: 20,
          padding: "6px 20px",
          marginBottom: 40,
          marginTop:3,
          color: "#00ffb4",
          fontSize: 12,
          letterSpacing: 4,
          textTransform: "uppercase",
          background: "rgba(0,255,180,0.05)",
        }}>
          ⚡ Powered by Groq AI
        </div>

        {/* Main title */}
        <h1 style={{
          fontSize: "clamp(48px, 8vw, 100px)",
          fontWeight: 900,
          margin: "0 0 20px",
          lineHeight: 1,
          color: "#fff",
          letterSpacing: -2,
        }}>
          SCAM<span style={{ color: "#00ffb4" }}>SHIELD</span>
          <span style={{ display: "block", fontSize: "0.4em", letterSpacing: 8, color: "rgba(255,255,255,0.3)", fontWeight: 300, marginTop: 8 }}>ARTIFICIAL INTELLIGENCE</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
          maxWidth: 500,
          margin: "0 auto 60px",
          lineHeight: 1.6,
        }}>
          Detect scams, phishing attacks & fraud instantly.<br />
          Paste text or upload screenshots — AI does the rest.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, justifyContent: "center", marginBottom: 60, flexWrap: "wrap" }}>
          {[["99.2%", "Accuracy"], ["< 1s", "Response Time"], ["3 Types", "Detection"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#00ffb4" }}>{val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button — NO hover effect */}
        <button
          onClick={() => navigate("/app")}
          style={{
            background: "linear-gradient(135deg, #00ffb4, #00d4ff)",
            border: "none",
            borderRadius: 4,
            padding: "18px 60px",
            fontSize: 16,
            fontWeight: 800,
            color: "#000",
            cursor: "pointer",
            letterSpacing: 3,
            textTransform: "uppercase",
            boxShadow: "0 0 40px rgba(0,255,180,0.3)",
          }}
        >
          GET STARTED →
        </button>

        {/* Features */}
        <div style={{ display: "flex", gap: 30, justifyContent: "center", marginTop: 80, flexWrap: "wrap" }}>
          {[
            ["🔍", "Text Analysis", "Paste any suspicious message"],
            ["📸", "Image Scan", "Upload screenshots & PDFs"],
            ["⚡", "Instant Results", "AI response in milliseconds"],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "24px 30px",
              textAlign: "center",
              width: 180,
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
<div style={{
  textAlign: "center",
  fontSize: 11,
  color: "rgba(100,255,100,1)",
  letterSpacing: 3,
  textTransform: "uppercase",
  marginTop: 60,
  paddingBottom: 30,
}}>
        © 2026 ScamShield AI — Developed by Binod Budha &nbsp;|&nbsp; All Rights Reserved
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
      `}</style>
    </div>
  );
}