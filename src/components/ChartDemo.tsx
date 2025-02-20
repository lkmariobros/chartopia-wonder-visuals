
import { useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { StarBorder } from './ui/star-border';
import { StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const data = [
  { date: 'Feb 12', sales: 60, rentals: 40, mindshare: 0.12 },
  { date: 'Feb 13', sales: 90, rentals: 60, mindshare: 0.15 },
  { date: 'Feb 14', sales: 70, rentals: 50, mindshare: 0.11 },
  { date: 'Feb 15', sales: 120, rentals: 80, mindshare: 0.18 },
  { date: 'Feb 16', sales: 250, rentals: 150, mindshare: 0.25 },
  { date: 'Feb 17', sales: 180, rentals: 120, mindshare: 0.22 },
  { date: 'Feb 18', sales: 150, rentals: 100, mindshare: 0.20 }
];

interface ChartDemoProps {
  isDarkMode: boolean;
}

export default function ChartDemo({ isDarkMode }: ChartDemoProps) {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [pinnedCards, setPinnedCards] = useState<number[]>([]);
  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const togglePin = (index: number) => {
    setPinnedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
      action: "SOLD",
      property: "Oceanview Mansion",
      price: "$2.4M",
      timestamp: "2h",
      avatar: "/avatar-chen.jpg"
    },
    {
      agent: "Michael Rodriguez",
      action: "RENT",
      property: "Downtown Penthouse",
      price: "$8.5K/mo",
      timestamp: "4h",
      avatar: "/avatar-rodriguez.jpg"
    },
    {
      agent: "Emily Wong",
      action: "SOLD",
      property: "Suburban Villa",
      price: "$950K",
      timestamp: "1d",
      avatar: "/avatar-wong.jpg"
    },
    {
      agent: "David Kim",
      action: "RENT",
      property: "Lake House Estate",
      price: "$12K/mo",
      timestamp: "1d",
      avatar: "/avatar-kim.jpg"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className={`grid grid-cols-3 gap-6 mb-6 ${textColor}`}>
        {cards.map((card, index) => (
          <div key={index} className={`${bgColor} rounded-xl border ${borderColor} p-6 relative`}>
            <StarBorder
              className="absolute top-2 right-2 p-0"
              onClick={() => togglePin(index)}
            >
              <StarIcon 
                className={`h-5 w-5 ${pinnedCards.includes(index) ? 'text-[#11f7b1]' : 'text-gray-400'}`} 
              />
            </StarBorder>
            <h3 className="font-semibold mb-2">{card.title}</h3>
            {card.title === "Client Satisfaction" ? (
              <div className="flex items-center gap-4">
                <div className="space-y-1 flex-1">
                  {card.ratings?.map((rating, i) => (
                    <div key={i} className="h-1 bg-[#11f7b1] rounded" style={{ width: `${rating * 20}%` }} />
                  ))}
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ) : card.title === "Conversion Rate" ? (
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full border-4 border-[#11f7b1] flex items-center justify-center">
                  <span className="text-lg font-bold">{card.value}</span>
                </div>
                <p className="text-[#11f7b1] text-sm">{card.change}</p>
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-[#11f7b1] text-sm">{card.change}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={`grid grid-cols-7 gap-6 ${textColor}`}>
        <div className={`col-span-5 ${bgColor} rounded-xl border ${borderColor} p-6 h-[500px]`}>
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={0}>
                <XAxis 
                  dataKey="date" 
                  stroke={isDarkMode ? '#666' : '#888'}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke={isDarkMode ? '#666' : '#888'}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                    border: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }} 
                />
                <Bar
                  dataKey="sales"
                  fill="#11f7b1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="rentals"
                  fill="#11f7b180"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`col-span-2 ${bgColor} rounded-xl border ${borderColor} p-6 overflow-auto`}>
          <h2 className="text-lg font-semibold mb-4">Recent Events</h2>
          <div className="space-y-1">
            {recentEvents.map((event, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 py-1.5"
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src={event.avatar} alt={event.agent} />
                  <AvatarFallback>
                    {event.agent.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`${textColor} text-xs font-medium truncate`}>
                      {event.agent}
                    </span>
                    <span className="text-[#11f7b1] text-xs">{event.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className={`${event.action === 'SOLD' ? 'text-[#11f7b1]' : 'text-blue-400'}`}>
                      {event.action}
                    </span>
                    <span className={subTextColor}>•</span>
                    <span className={subTextColor}>{event.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
