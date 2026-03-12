import { useState } from "react"
import axios from "axios"
import Stats from "./Components/Stats"
import History from "./Components/History"
const getRiskColor = (score) => {
  if (score >= 70) return "text-red-500"
  if (score >= 40) return "text-yellow-500"
  return "text-green-500"
}

const getRiskBg = (score) => {
  if (score >= 70) return "bg-red-500"
  if (score >= 40) return "bg-yellow-500"
  return "bg-green-500"
}

const getVerdictBg = (verdict) => {
  if (verdict === "Scam") return "bg-red-500/20 border border-red-500 text-red-400"
  if (verdict === "Suspicious") return "bg-yellow-500/20 border border-yellow-500 text-yellow-400"
  return "bg-green-500/20 border border-green-500 text-green-400"
}

export default function App() {
  const [message, setMessage] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  const analyzeMessage = async () => {
    if (!message.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        message: message
      })
      setResult(response.data)
      setHistory(prev => [{
      message: message,
      verdict: response.data.verdict,
      risk_score: response.data.risk_score,
      time: new Date().toLocaleTimeString()
}, ...prev].slice(0, 5))
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ScamShield AI</h1>
            <p className="text-xs text-gray-400">Powered by Amazon Nova</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Detect Scams
            <span className="text-blue-500"> Instantly</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Paste any suspicious message, email, or text and our AI will analyze it for scam patterns.
          </p>
        </div>
        <Stats />
        {/* Input Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-3">
            Paste suspicious message here
          </label>
          <textarea
            className="w-full bg-gray-800 rounded-xl p-4 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none resize-none h-40"
            placeholder="Example: Your bank account has been locked. Click here to verify your identity immediately..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={analyzeMessage}
            disabled={loading || !message.trim()}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg"
          >
            {loading ? "🔍 Analyzing..." : "🔍 Analyze Message"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6 text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-6">
            {/* Verdict */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Analysis Result</h3>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getVerdictBg(result.verdict)}`}>
                {result.verdict}
              </span>
            </div>

            {/* Risk Score */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Risk Score</span>
                <span className={`font-bold text-lg ${getRiskColor(result.risk_score)}`}>
                  {result.risk_score}/100
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getRiskBg(result.risk_score)}`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
            </div>

            {/* Reasons */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Why we flagged this:</h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-red-400 mt-0.5">⚠</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Advice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-sm text-blue-300">
                💡 <span className="font-medium">Advice: </span>{result.advice}
              </p>
            </div>
          </div>
        )}

        {/* Examples */}
        {!result && !loading && (
          <div className="mt-8">
            <p className="text-gray-500 text-sm text-center mb-4">Try an example:</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Your bank account is locked. Click here to verify your identity now or your account will be deleted.",
                "Congratulations! You have won $1,000,000. Send us your bank details to claim your prize.",
                "Hey, are we still meeting for lunch tomorrow at 1pm?"
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(example)}
                  className="text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-sm text-gray-400 transition-all duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
        <History history={history} onSelect={(item) => setMessage(item.message)} />
      </div>
    </div>
  )
}