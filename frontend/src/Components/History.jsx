export default function History({ history, onSelect }) {
  if (history.length === 0) return null

  const getVerdictColor = (verdict) => {
    if (verdict === "Scam") return "text-red-400"
    if (verdict === "Suspicious") return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-400 mb-3">
        Recent Analyses
      </h3>
      <div className="space-y-2">
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${getVerdictColor(item.verdict)}`}>
                {item.verdict} — {item.risk_score}/100
              </span>
              <span className="text-xs text-gray-600">{item.time}</span>
            </div>
            <p className="text-sm text-gray-400 truncate">{item.message}</p>
          </button>
        ))}
      </div>
    </div>
  )
}