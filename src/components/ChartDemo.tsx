
import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Line, LineChart } from 'recharts';
import { MetricCard } from './dashboard/MetricCard';
import { RecentEvents } from './dashboard/RecentEvents';

const data = [
  { date: 'Feb 12', sales: 60, rentals: 40, mindshare: 0.12 },
  { date: 'Feb 13', sales: 90, rentals: 60, mindshare: 0.15 },
  { date: 'Feb 14', sales: 70, rentals: 50, mindshare: 0.11 },
  { date: 'Feb 15', sales: 120, rentals: 80, mindshare: 0.18 },
  { date: 'Feb 16', sales: 250, rentals: 150, mindshare: 0.25 },
  { date: 'Feb 17', sales: 180, rentals: 120, mindshare: 0.22 },
  { date: 'Feb 18', sales: 150, rentals: 100, mindshare: 0.20 }
];

const cards = [
  {
    title: "Average Deal Size",
    value: "$485K",
    change: "+12.3% vs last month"
  },
  {
    title: "Conversion Rate",
    value: "75%",
    change: "+5% vs last month"
  },
  {
    title: "Client Satisfaction",
    value: "4.7",
    ratings: [4.8, 4.2, 4.5, 4.9, 4.7]
  }
];

const recentEvents = [
  {
    agent: "Sarah Chen",
    action: "SOLD" as const,
    property: "Oceanview Mansion",
    price: "$2.4M",
    timestamp: "2h",
    avatar: "/avatar-chen.jpg"
  },
  {
    agent: "Michael Rodriguez",
    action: "RENT" as const,
    property: "Downtown Penthouse",
    price: "$8.5K/mo",
    timestamp: "4h",
    avatar: "/avatar-rodriguez.jpg"
  },
  {
    agent: "Emily Wong",
    action: "SOLD" as const,
    property: "Suburban Villa",
    price: "$950K",
    timestamp: "1d",
    avatar: "/avatar-wong.jpg"
  },
  {
    agent: "David Kim",
    action: "RENT" as const,
    property: "Lake House Estate",
    price: "$12K/mo",
    timestamp: "1d",
    avatar: "/avatar-kim.jpg"
  }
];

interface ChartDemoProps {
  isDarkMode: boolean;
}

export default function ChartDemo({ isDarkMode }: ChartDemoProps) {
  const [pinnedCards, setPinnedCards] = useState<number[]>([]);
  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const gridColor = isDarkMode ? '#333' : '#e5e7eb';
  const labelColor = isDarkMode ? '#888' : '#666';

  const togglePin = (index: number) => {
    setPinnedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg border ${borderColor}`}>
          <p className={`text-sm font-medium ${textColor}`}>{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-blue-400 text-sm">
              Sales: {payload[0].value} cases
            </p>
            <p className="text-emerald-400 text-sm">
              Rentals: {payload[1].value} cases
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-4 gap-8">
        {/* Left section - 3 columns */}
        <div className="col-span-3 space-y-8">
          {/* Container for metric cards */}
          <div className={`${bgColor} rounded-2xl border ${borderColor} p-8 shadow-lg`}>
            <h2 className={`text-xl font-semibold mb-6 ${textColor}`}>Key Metrics</h2>
            <div className="grid grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <div key={index}>
                  <MetricCard
                    {...card}
                    isPinned={pinnedCards.includes(index)}
                    onPin={() => togglePin(index)}
                    isDarkMode={isDarkMode}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Chart sections */}
          <div className={`${bgColor} rounded-2xl border ${borderColor} p-8 shadow-lg`}>
            <div className="space-y-12">
              {/* Agent Performance Chart */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className={`text-xl font-semibold ${textColor}`}>Agent Performance</h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sales and Rental Cases by Day</p>
                  </div>
                  <div className="text-sm font-medium">
                    <span className="inline-flex items-center mr-4">
                      <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                      <span className={textColor}>Sales Cases</span>
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></span>
                      <span className={textColor}>Rental Cases</span>
                    </span>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke={labelColor}
                        tickLine={false}
                        axisLine={{ stroke: gridColor }}
                      />
                      <YAxis 
                        stroke={labelColor}
                        tickLine={false}
                        axisLine={{ stroke: gridColor }}
                        label={{ 
                          value: 'Number of Cases', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { fill: labelColor }
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sales" stackId="a" fill="#60a5fa" />
                      <Bar dataKey="rentals" stackId="a" fill="#34d399" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Active Subscribers Chart */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-semibold ${textColor}`}>Active Subscribers</h2>
                  <div className="text-sm font-medium">
                    <span className="inline-flex items-center mr-4">
                      <span className="w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
                      <span className={textColor}>Current</span>
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                      <span className={textColor}>Previous</span>
                    </span>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={subscriberData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="month" stroke={labelColor} />
                      <YAxis stroke={labelColor} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: isDarkMode ? '#1f1f1f' : '#fff', borderColor: gridColor }}
                        itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="current" 
                        stroke="#c084fc" 
                        strokeWidth={2}
                        dot={{ fill: '#c084fc' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="previous" 
                        stroke="#9ca3af" 
                        strokeWidth={2}
                        dot={{ fill: '#9ca3af' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - 1 column */}
        <div className="col-span-1">
          <div className={`${bgColor} rounded-2xl border ${borderColor} p-8 shadow-lg h-full`}>
            <h2 className={`text-xl font-semibold mb-6 ${textColor}`}>Recent Events</h2>
            <RecentEvents events={recentEvents} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
