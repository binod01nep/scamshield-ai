import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Analyzer() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const getVerdictColor = (v) => v === "Safe" ? "#00ffb4" : v === "Suspicious" ? "#ffaa00" : "#ff3366";
  const getRiskBg = (s) => s < 30 ? "#00ffb4" : s < 70 ? "#ffaa00" : "#ff3366";

  const analyzeText = async () => {
    if (!message.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", { message });
      setResult(res.data);
    } catch { alert("Error!"); }
    setLoading(false);
  };

  const analyzeFile = async () => {
    if (!file) return;
    setLoading(true); setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://127.0.0.1:5000/analyze-image", formData);
      setResult(res.data);
    } catch { alert("Error analyzing file!"); }
    setLoading(false);
  };

  const s = {
    page: { minHeight: "100vh", background: "#020008", fontFamily: "'Courier New', monospace", padding: "20px", color: "#fff" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 800, margin: "0 auto 40px", padding: "0 10px" },
    card: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,180,0.1)", borderRadius: 16, padding: 32, maxWidth: 800, margin: "0 auto" },
    tabs: { display: "flex", gap: 8, marginBottom: 24, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 6 },
    tab: (active) => ({ flex: 1, padding: "10px", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14, letterSpacing: 1, transition: "all 0.2s", background: active ? "linear-gradient(135deg, #00ffb4, #00d4ff)" : "transparent", color: active ? "#000" : "rgba(255,255,255,0.4)" }),
    textarea: { width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,180,0.15)", borderRadius: 12, padding: 16, color: "#fff", fontSize: 14, height: 160, resize: "none", outline: "none", fontFamily: "'Courier New', monospace", boxSizing: "border-box" },
    btn: (disabled) => ({ width: "100%", marginTop: 16, padding: "16px", border: "none", borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer", fontWeight: 800, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", background: disabled ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #00ffb4, #00d4ff)", color: disabled ? "rgba(255,255,255,0.2)" : "#000" }),
    dropzone: (over) => ({ border: `2px dashed ${over ? "#00ffb4" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: 50, textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: over ? "rgba(0,255,180,0.05)" : "transparent" }),
    result: { marginTop: 24, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 24 },
    footer: { textAlign: "center", marginTop: 40, fontSize: 11, color: "rgba(255,255,255,0.1)", letterSpacing: 3, textTransform: "uppercase" },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>SCAM<span style={{ color: "#00ffb4" }}>SHIELD</span></span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 3 }}>AI SCAM DETECTOR</div>
      </div>

      {/* Main Card */}
      <div style={s.card}>
        {/* Tabs */}
        <div style={s.tabs}>
          <button style={s.tab(activeTab === "text")} onClick={() => setActiveTab("text")}>✍️ TEXT MESSAGE</button>
          <button style={s.tab(activeTab === "file")} onClick={() => setActiveTab("file")}>📸 IMAGE / PDF</button>
        </div>

        {/* Text Tab */}
        {activeTab === "text" && (
          <div>
            <textarea
              style={s.textarea}
              placeholder="Paste suspicious message here..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button style={s.btn(loading || !message.trim())} disabled={loading || !message.trim()} onClick={analyzeText}>
              {loading ? "ANALYZING..." : "🔍 ANALYZE MESSAGE"}
            </button>
          </div>
        )}

        {/* File Tab */}
        {activeTab === "file" && (
          <div>
            <div
              style={s.dropzone(dragOver)}
              onDrop={e => { e.preventDefault(); setDragOver(false); setFile(e.dataTransfer.files[0]); }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => document.getElementById("fi").click()}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Drag & drop screenshot or PDF</div>
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 4 }}>or click to browse</div>
              {file && <div style={{ color: "#00ffb4", marginTop: 16, fontWeight: 700 }}>✅ {file.name}</div>}
            </div>
            <input id="fi" type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            <button style={s.btn(loading || !file)} disabled={loading || !file} onClick={analyzeFile}>
              {loading ? "ANALYZING..." : "🔍 ANALYZE FILE"}
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={s.result}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: getVerdictColor(result.verdict) }}>
                {result.verdict === "Safe" ? "✅" : result.verdict === "Suspicious" ? "⚠️" : "🚨"} {result.verdict.toUpperCase()}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: getVerdictColor(result.verdict) }}>{result.risk_score}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>RISK SCORE</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 6, marginBottom: 24, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${result.risk_score}%`, background: getRiskBg(result.risk_score), borderRadius: 4, transition: "width 1s ease" }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 10, textTransform: "uppercase" }}>🔎 Reasons</div>
              {result.reasons.map((r, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid rgba(0,255,180,0.3)" }}>
                  {r}
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(0,255,180,0.05)", border: "1px solid rgba(0,255,180,0.15)", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#00ffb4", marginBottom: 8, textTransform: "uppercase" }}>💡 Advice</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{result.advice}</div>
            </div>
          </div>
        )}
      </div>

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
        © 2026 ScamShield AI — Developed by Binod Budha  &nbsp;|&nbsp; All Rights Reserved
      </div>
    </div>
  );
}