"use client"

import { useState } from "react"
import { ChevronDown, Menu, BarChart2, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "./sidebar"
import StockChart from "./stock-chart"
import SummaryView from "./summary-view"
import "./ChartMazeInterface.css"

export default function ChartMazeInterface() {
  const [dateRange, setDateRange] = useState("26/04/2025 - 26/04/2025")
  const [initialCapital, setInitialCapital] = useState("9")
  const [activeTab, setActiveTab] = useState("trades") // State to track active tab
  const [sidebarVisible, setSidebarVisible] = useState(true) // State to track sidebar visibility

  // Toggle between trades and summary views
  const toggleView = (tab) => {
    setActiveTab(tab)
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="chart-maze-container">
      {/* Conditionally render sidebar based on visibility state */}
      <div className={`sidebar-container ${sidebarVisible ? "sidebar-visible" : "sidebar-hidden"}`}>
        <Sidebar />
      </div>

      <div className={`main-content ${sidebarVisible ? "" : "main-content-expanded"}`}>
        <header className="top-nav">
          <Button variant="ghost" size="icon" className="menu-button" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        {/* Main Content Area */}
        <div className="content-area">
          {/* Trades/Summary Toggle */}
          <div className="toggleContainer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Empty div to help with centering */}
            <div style={{ width: "200px" }}></div>
            
            {/* Centered toggle wrapper */}
            <div className="toggleWrapper" style={{ margin: "0 auto" }}>
              <button
                className={`toggleButton ${activeTab === "trades" ? "toggleActive" : ""}`}
                onClick={() => toggleView("trades")}
              >
                <BarChart2 className="tab-icon mr-2" size={16} />
                Trades
              </button>
              <button
                className={`toggleButton ${activeTab === "summary" ? "toggleActive" : ""}`}
                onClick={() => toggleView("summary")}
              >
                <BarChart2 className="tab-icon mr-2" size={16} />
                Summary
              </button>
              <div
                className="toggleIndicator"
                style={{ transform: activeTab === "summary" ? "translateX(100%)" : "translateX(0)" }}
              />
            </div>
            
            {/* Load container on the right */}
            <div className="load-container" style={{ marginRight: '0', width: "200px" }}>
              <span className="load-label">Load:</span>
              <div className="symbol-selector">
                <span>ADSA</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              <button className="expand-button">
                <span className="expand-icon">⤢</span>
              </button>
            </div>
          </div>
          

          {/* Conditionally render content based on active tab */}
          {activeTab === "trades" ? (
            /* Trades View */
            <>
              {/* Filters Row */}
              <div className="filters-row">
                <div className="filter-group">
                  <span className="filter-label">Sell Dates</span>
                  <div className="input-with-icon">
                    <Input value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="date-input" />
                    <X className="clear-icon" />
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-label">Initial Total Capital:</span>
                  <div className="input-with-button">
                    <Input
                      value={initialCapital}
                      onChange={(e) => setInitialCapital(e.target.value)}
                      className="capital-input"
                    />
                    <Button size="icon" className="search-button">
                      <Search className="search-icon" />
                    </Button>
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-label">Sort:</span>
                  <div className="sort-dropdown">
                    <span className="dropdown-text">Date (Newest First)</span>
                    <ChevronDown className="dropdown-icon" />
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-label">Search</span>
                  <Input placeholder="Search Trades by Symbol..." className="search-input" />
                </div>
              </div>

              {/* Stock Info */}
              <div className="stock-info-section">
                <h2 className="stock-title">TCS</h2>

                <div className="stock-metrics">
                  <div className="metric-card">
                    <div className="metric-label">STATUS</div>
                    <div className="metric-value success">Win</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">AVG BUYING PRICE</div>
                    <div className="metric-value">500.00</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">AVG SELLING PRICE</div>
                    <div className="metric-value">550.00</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">QNT</div>
                    <div className="metric-value">100</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">DAYS HELD</div>
                    <div className="metric-value">0</div>
                  </div>
                </div>

                <div className="advanced-metrics">
                  <div className="metric-card">
                    <div className="metric-label">P/L</div>
                    <div className="metric-value success">10.00% (5000.00₹)</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">PORTFOLIO P/L (CURRENT BALANCE)</div>
                    <div className="metric-value">
                      <span className="success">5555.56 % | </span>
                      <span>₹5009.00</span>
                    </div>
                  </div>

                  <div className="risk-metrics">
                    <div className="metric-card">
                      <div className="metric-label">SL PRICE</div>
                      <Input value="495" className="small-input" />
                    </div>

                    <div className="metric-card">
                      <div className="metric-label">RR RATIO</div>
                      <div className="metric-value">1:10.0</div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-label">RISK %</div>
                      <div className="metric-value">500.00/5555.56</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-3 border-b">
                    <h3 className="text-sm font-medium">Entry Chart</h3>
                  </div>
                  <StockChart />
                  <div className="p-3 border-t">
                    <div className="text-xs text-gray-500 mb-2">ENTRY DATES</div>
                    <div className="text-sm">Buy 100 @ 500 (26-04-2025 22:24)</div>

                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">SITUATIONAL AWARENESS</div>
                      <div className="relative">
                        <button className="w-full text-left border rounded p-2 text-sm flex justify-between items-center">
                          <span>No rules selected</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">ENTRY TRIGGER</div>
                      <div className="relative">
                        <button className="w-full text-left border rounded p-2 text-sm flex justify-between items-center">
                          <span>No rules selected</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="p-3 border-b">
                    <h3 className="text-sm font-medium">Exit Chart</h3>
                  </div>
                  <StockChart />
                  <div className="p-3 border-t">
                    <div className="text-xs text-gray-500 mb-2">EXIT DATES</div>
                    <div className="text-sm">Sell 100 @ 550 (26-04-2025 22:24)</div>

                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">RISK MANAGEMENT</div>
                      <div className="relative">
                        <button className="w-full text-left border rounded p-2 text-sm flex justify-between items-center">
                          <span>No rules selected</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">EXIT TRIGGER</div>
                      <div className="relative">
                        <button className="w-full text-left border rounded p-2 text-sm flex justify-between items-center">
                          <span>No rules selected</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="notes-section">
                <div className="section-label">ADDITIONAL NOTES</div>
              </div>
            </>
          ) : (
            /* Summary View - Now using the new SummaryView component */
            <SummaryView />
          )}
        </div>
      </div>
    </div>
  )
}