export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
        <div className="text-3xl font-bold text-blue-500 mb-1">99%</div>
        <div className="text-gray-400 text-sm">Detection Accuracy</div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
        <div className="text-3xl font-bold text-blue-500 mb-1">10K+</div>
        <div className="text-gray-400 text-sm">Scams Detected</div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
        <div className="text-3xl font-bold text-blue-500 mb-1">&lt;2s</div>
        <div className="text-gray-400 text-sm">Analysis Time</div>
      </div>
    </div>
  )
}