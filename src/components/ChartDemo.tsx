import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Line, LineChart } from 'recharts';
import { MetricCard } from './dashboard/MetricCard';
import { RecentEvents } from './dashboard/RecentEvents';

const subscriptionData = [
  { month: 'Jan 2024', individual: 1200, team: 2300, enterprise: 1500 },
  { month: 'Feb', individual: 1500, team: 3000, enterprise: 2000 },
  { month: 'Mar', individual: 1300, team: 2800, enterprise: 1800 },
  { month: 'Apr', individual: 2000, team: 3500, enterprise: 2500 },
  { month: 'May', individual: 2200, team: 5000, enterprise: 4000 },
  { month: 'Jun', individual: 2100, team: 4500, enterprise: 3500 },
  { month: 'Jul', individual: 1800, team: 2000, enterprise: 1500 },
  { month: 'Aug', individual: 2500, team: 3500, enterprise: 3000 },
  { month: 'Sep', individual: 3000, team: 6000, enterprise: 4500 },
  { month: 'Oct', individual: 2800, team: 4000, enterprise: 3000 },
  { month: 'Nov', individual: 2000, team: 3000, enterprise: 2000 },
  { month: 'Dec 2025', individual: 2500, team: 3500, enterprise: 2500 }
];

const subscriberData = [
  { month: 'Jan', current: 20000, previous: 15000 },
  { month: 'Feb', current: 25000, previous: 18000 },
  { month: 'Mar', current: 30000, previous: 22000 },
  { month: 'Apr', current: 35000, previous: 28000 },
  { month: 'May', current: 45000, previous: 35000 },
  { month: 'Jun', current: 50000, previous: 40000 },
  { month: 'Jul', current: 48000, previous: 42000 },
  { month: 'Aug', current: 52000, previous: 45000 },
  { month: 'Sep', current: 60000, previous: 48000 },
  { month: 'Oct', current: 58000, previous: 50000 },
  { month: 'Nov', current: 62000, previous: 52000 },
  { month: 'Dec', current: 65000, previous: 55000 }
];

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
              {/* Subscriptions Chart */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-semibold ${textColor}`}>Subscriptions Sold</h2>
                  <div className="text-sm font-medium">
                    <span className="inline-flex items-center mr-4">
                      <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                      <span className={textColor}>Individual</span>
                    </span>
                    <span className="inline-flex items-center mr-4">
                      <span className="w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
                      <span className={textColor}>Team</span>
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></span>
                      <span className={textColor}>Enterprise</span>
                    </span>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subscriptionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="month" stroke={labelColor} />
                      <YAxis stroke={labelColor} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: isDarkMode ? '#1f1f1f' : '#fff', borderColor: gridColor }}
                        itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}
                      />
                      <Bar dataKey="individual" stackId="a" fill="#f87171" />
                      <Bar dataKey="team" stackId="a" fill="#c084fc" />
                      <Bar dataKey="enterprise" stackId="a" fill="#34d399" />
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
