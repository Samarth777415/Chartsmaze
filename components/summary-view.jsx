import AnalysisPanel from "./analysis-panel"
import "./summary-view.css"

export default function SummaryView() {
  // Sample data for the charts
  const chartData = [
    { name: "Good", value: 0.0, color: "#10B981" },
    { name: "Bad", value: 0.0, color: "#EF4444" },
    { name: "Unknown", value: 100.0, color: "#9CA3AF" },
  ] 

  return (
    <div className="summary-view">
      
      <div className="analysis-grid">
        <AnalysisPanel title="Situational Awareness Analysis" data={chartData} />
        <AnalysisPanel title="Entry Trigger Analysis" data={chartData} />
        <AnalysisPanel title="Risk Management Analysis" data={chartData} />
        <AnalysisPanel title="Exit Trigger Analysis" data={chartData} />
      </div>
    </div>
  )
}
