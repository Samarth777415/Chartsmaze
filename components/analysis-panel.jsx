import { PieChart, Pie, Cell } from "recharts"

export default function AnalysisPanel({ title, data }) {
  // Calculate total for percentage
  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="analysis-panel">
      <h3 className="analysis-title">{title}</h3>

      <div className="percentage-row">
        {data.map((item) => (
          <div key={item.name} className="percentage-item">
            <div className="percentage-label">{item.name}</div>
            <div className={`percentage-value ${item.name.toLowerCase()}`}>{item.value.toFixed(1)}%</div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <PieChart width={280} height={280}>
          <Pie data={data} cx={140} cy={140} innerRadius={80} outerRadius={120} paddingAngle={0} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="chart-center">
          <div className="total-value">1</div>
          <div className="total-label">Total Trades</div>
        </div>
      </div>

      <div className="legend-row">
        {data.map(
          (item) =>
            item.value > 0 && (
              <div key={`legend-${item.name}`} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="legend-name">{item.name}</div>
                <div className="legend-percentage">{item.value.toFixed(1)}%</div>
              </div>
            ),
        )}
      </div>
    </div>
  )
}
