import { BookOpen, PlusCircle, List, Layers, Home, Search, HelpCircle, ChevronUp } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="h-full bg-[#3F4D67] text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <div className="text-lg font-bold flex items-center">
          <span className="text-purple-400">CHARTS</span>
          <span className="text-emerald-400">MAZE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <BookOpen className="h-4 w-4 mr-3" />
              My Rule Book
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <PlusCircle className="h-4 w-4 mr-3" />
              Add Trades
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <List className="h-4 w-4 mr-3" />
              Manage Trades
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <Layers className="h-4 w-4 mr-3" />
              Open Positions
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <Home className="h-4 w-4 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm bg-gray-700">
              <BookOpen className="h-4 w-4 mr-3" />
              Trade Diary
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <Search className="h-4 w-4 mr-3" />
              ChartMaze Screener
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
              <HelpCircle className="h-4 w-4 mr-3" />
              Help or Feedback
            </a>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-xs mr-2">
            <span>S</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">SAMARTH GITE</div>
          </div>
          <ChevronUp className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
