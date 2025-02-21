
import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
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
                <div key={index} className={`${bgColor} rounded-xl border ${borderColor} relative pt-4`}>
                  <div className="absolute -top-3 left-4 px-3 py-1 text-xs font-medium bg-[#11f7b1] text-black rounded-full shadow-md">
                    Section {index + 1}
                  </div>
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

          {/* Chart section */}
          <div className={`${bgColor} rounded-2xl border ${borderColor} p-8 shadow-lg`}>
            <h2 className={`text-xl font-semibold mb-6 ${textColor}`}>Performance Overview</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <Area
                    type="monotone"
                    dataKey="mindshare"
                    stroke="#11f7b1"
                    fill="#11f7b120"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
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
