
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { date: 'Feb 12', price: 0.001, sales: 60, rentals: 40, mindshare: 0.12 },
  { date: 'Feb 13', price: 0.0015, sales: 90, rentals: 60, mindshare: 0.15 },
  { date: 'Feb 14', price: 0.001, sales: 70, rentals: 50, mindshare: 0.11 },
  { date: 'Feb 15', price: 0.002, sales: 120, rentals: 80, mindshare: 0.18 },
  { date: 'Feb 16', price: 0.006, sales: 250, rentals: 150, mindshare: 0.25 },
  { date: 'Feb 17', price: 0.004, sales: 180, rentals: 120, mindshare: 0.22 },
  { date: 'Feb 18', price: 0.003, sales: 150, rentals: 100, mindshare: 0.20 }
];

interface ChartDemoProps {
  isDarkMode: boolean;
}

export default function ChartDemo({ isDarkMode }: ChartDemoProps) {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="container mx-auto p-6">
      <div className={`grid grid-cols-3 gap-6 ${textColor}`}>
        {/* Main Chart Area */}
        <div className={`col-span-2 ${bgColor} rounded-xl border ${borderColor} p-6`}>
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#11f7b1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#11f7b1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke={isDarkMode ? '#666' : '#888'} />
                <YAxis stroke={isDarkMode ? '#666' : '#888'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                    border: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#11f7b1"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#11f7b1"
                  dot={{ fill: '#11f7b1', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <h2 className="text-lg font-semibold mb-4">Details</h2>
          <div className="space-y-4">
            <div className={`${cardBg} p-4 rounded-lg`}>
              <h3 className={subTextColor}>Total Revenue</h3>
              <p className="text-2xl font-bold">$45,231.89</p>
              <p className="text-[#11f7b1] text-sm">+20.1% from last month</p>
            </div>
            <div className={`${cardBg} p-4 rounded-lg`}>
              <h3 className={subTextColor}>Active Listings</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className={`${cardBg} p-4 rounded-lg`}>
              <h3 className={subTextColor}>Pending Deals</h3>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <h3 className="font-semibold mb-2">Average Deal Size</h3>
          <p className="text-2xl font-bold">$485K</p>
          <p className="text-[#11f7b1] text-sm">+12.3% vs last month</p>
        </div>

        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <h3 className="font-semibold mb-2">Conversion Rate</h3>
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-full border-4 border-[#11f7b1] flex items-center justify-center">
              <span className="text-lg font-bold">75%</span>
            </div>
            <p className="text-[#11f7b1] text-sm">+5% vs last month</p>
          </div>
        </div>

        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <h3 className="font-semibold mb-2">Client Satisfaction</h3>
          <div className="flex items-center gap-4">
            <div className="space-y-1 flex-1">
              {[4.8, 4.2, 4.5, 4.9, 4.7].map((rating, i) => (
                <div key={i} className="h-1 bg-[#11f7b1] rounded" style={{ width: `${rating * 20}%` }} />
              ))}
            </div>
            <p className="text-2xl font-bold">4.7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
