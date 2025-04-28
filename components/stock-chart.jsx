"use client"

import { useState } from "react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts"
import styles from "./StockChart.module.css"

// Sample stock data for ACME Corp
const generateSampleData = () => {
  const data = []
  let date = new Date(2024, 0, 1)
  let price = 150
  
  for (let i = 0; i < 60; i++) {
    const volatility = Math.random() * 5
    const open = price
    const close = Math.round((open + (Math.random() - 0.5) * volatility) * 100) / 100
    const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.02) * 100) / 100
    const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.02) * 100) / 100
    const volume = Math.round(Math.random() * 10000 + 5000)
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      open,
      close,
      high,
      low,
      volume,
      fullDate: date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    })
    
    // Advance to next trading day (skip weekends)
    do {
      date.setDate(date.getDate() + 1)
    } while (date.getDay() === 0 || date.getDay() === 6)
    
    // Set next day's opening price to previous day's close
    price = close
  }
  
  return data
}

export default function StockChart() {
  const [stockData] = useState(generateSampleData())
  const [timeframe, setTimeframe] = useState("3M")
  const [selectedCandle, setSelectedCandle] = useState(null)
  
  const timeframeFilters = {
    "1M": stockData.slice(-20),
    "3M": stockData.slice(-60),
    "1W": stockData.slice(-5)
  }
  
  const displayData = timeframeFilters[timeframe]
  
  const minPrice = Math.floor(Math.min(...displayData.map(item => item.low)) * 0.99)
  const maxPrice = Math.ceil(Math.max(...displayData.map(item => item.high)) * 1.01)
  
  // Find performance metrics
  const startPrice = displayData[0].open
  const currentPrice = displayData[displayData.length - 1].close
  const performancePercent = ((currentPrice - startPrice) / startPrice * 100).toFixed(2)
  const performanceValue = (currentPrice - startPrice).toFixed(2)
  const isPositive = currentPrice >= startPrice
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipTitle}>{data.fullDate}</p>
          <p className={styles.tooltipData}>Open: ${data.open.toFixed(2)}</p>
          <p className={styles.tooltipData}>Close: ${data.close.toFixed(2)}</p>
          <p className={styles.tooltipData}>High: ${data.high.toFixed(2)}</p>
          <p className={styles.tooltipData}>Low: ${data.low.toFixed(2)}</p>
          <p className={styles.tooltipData}>Volume: {data.volume.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  const CandlestickChart = ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          onMouseMove={(e) => {
            if (e && e.activePayload) {
              setSelectedCandle(e.activePayload[0].payload)
            }
          }}
          onMouseLeave={() => setSelectedCandle(null)}
        >
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={[minPrice, maxPrice]} />
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Candlesticks as custom shaped areas */}
          {data.map((item, index) => {
            const isUp = item.close >= item.open
            return (
              <g key={index}>
                {/* Candle body */}
                <rect
                  x={38 + index * (550 / data.length)}
                  y={isUp ? 
                    (item.close - minPrice) / (maxPrice - minPrice) * 300 : 
                    (item.open - minPrice) / (maxPrice - minPrice) * 300}
                  width={9}
                  height={Math.abs(
                    (item.close - item.open) / (maxPrice - minPrice) * 300
                  ) || 1}
                  fill={isUp ? "#10B981" : "#EF4444"}
                />
                {/* Candle wick */}
                <line
                  x1={42.5 + index * (550 / data.length)}
                  y1={(item.high - minPrice) / (maxPrice - minPrice) * 300}
                  x2={42.5 + index * (550 / data.length)}
                  y2={(item.low - minPrice) / (maxPrice - minPrice) * 300}
                  stroke={isUp ? "#10B981" : "#EF4444"}
                  strokeWidth={1}
                />
              </g>
            )
          })}
          
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke={isPositive ? "#10B981" : "#EF4444"} 
            fillOpacity={0.2}
            fill={`url(#color${isPositive ? 'Green' : 'Red'})`}
            strokeWidth={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>ACME Corporation (ACME)</h1>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${currentPrice.toFixed(2)}</span>
            <span className={`${styles.performance} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(performanceValue)} ({performancePercent}%)
            </span>
          </div>
        </div>
        <div className={styles.timeframeButtons}>
          <button 
            onClick={() => setTimeframe("1W")}
            className={`${styles.button} ${timeframe === "1W" ? styles.activeButton : ''}`}
          >
            1W
          </button>
          <button 
            onClick={() => setTimeframe("1M")}
            className={`${styles.button} ${timeframe === "1M" ? styles.activeButton : ''}`}
          >
            1M
          </button>
          <button 
            onClick={() => setTimeframe("3M")}
            className={`${styles.button} ${timeframe === "3M" ? styles.activeButton : ''}`}
          >
            3M
          </button>
        </div>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <p className={styles.statsLabel}>Open</p>
          <p className={styles.statsValue}>${selectedCandle ? selectedCandle.open.toFixed(2) : displayData[displayData.length - 1].open.toFixed(2)}</p>
        </div>
        <div className={styles.statsCard}>
          <p className={styles.statsLabel}>High</p>
          <p className={styles.statsValue}>${selectedCandle ? selectedCandle.high.toFixed(2) : displayData[displayData.length - 1].high.toFixed(2)}</p>
        </div>
        <div className={styles.statsCard}>
          <p className={styles.statsLabel}>Low</p>
          <p className={styles.statsValue}>${selectedCandle ? selectedCandle.low.toFixed(2) : displayData[displayData.length - 1].low.toFixed(2)}</p>
        </div>
        <div className={styles.statsCard}>
          <p className={styles.statsLabel}>Volume</p>
          <p className={styles.statsValue}>{selectedCandle ? selectedCandle.volume.toLocaleString() : displayData[displayData.length - 1].volume.toLocaleString()}</p>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        <CandlestickChart data={displayData} />
      </div>
      
      <div className={styles.insightsGrid}>
        <div className={styles.insightCard}>
          <h3 className={styles.insightTitle}>Open/Close Trend</h3>
          <div className={styles.insightData}>
            <span className={`${styles.trendIcon} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? '▲' : '▼'}
            </span>
            <span className={styles.trendValue}>{performanceValue}</span>
          </div>
          <p className={styles.insightSubtext}>Performance: {performancePercent}%</p>
        </div>
        <div className={styles.insightCard}>
          <h3 className={styles.insightTitle}>Volume Trend</h3>
          <p className={styles.insightSubtext}>Observe the volume changes over time for insights on trading activity.</p>
        </div>
      </div>
    </div>
  )
}