
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

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
        {payload.map((entry, index) => (
          <p 
            key={index} 
            style={{ color: entry.color }}
          >
            {`${entry.dataKey === 'sales' ? 'Sales' : 
               entry.dataKey === 'rentals' ? 'Rentals' : 
               entry.dataKey === 'price' ? 'Price: $' : 
               'Mindshare: '}${entry.dataKey === 'mindshare' ? 
               (entry.value * 100).toFixed(2) + '%' : 
               entry.value.toFixed(entry.dataKey === 'price' ? 4 : 0)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartDemo() {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const latestData = data[data.length - 1];
  const priceChange = ((latestData.price - data[0].price) / data[0].price * 100).toFixed(2);
  const mindshareChange = ((latestData.mindshare - data[0].mindshare) / data[0].mindshare * 100).toFixed(2);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-[#121212] rounded-xl">
      <div className="grid grid-cols-4 gap-4 mb-8 text-white">
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm text-gray-400">Market cap</h3>
            <span className="text-xs text-gray-600">#633</span>
          </div>
          <p className="text-2xl font-bold">1.85M</p>
          <p className="text-sm text-[#11f7b1]">+1,557.3% 7D</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400">Holders</h3>
          <p className="text-2xl font-bold">1.48K</p>
          <p className="text-sm text-[#11f7b1]">+242.1% 7D</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400">Mindshare</h3>
          <p className="text-2xl font-bold">{(latestData.mindshare * 100).toFixed(2)}%</p>
          <p className="text-sm text-[#11f7b1]">+{mindshareChange}% 7D</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400">Price</h3>
          <p className="text-2xl font-bold">
            ${hoveredPrice?.toFixed(4) || latestData.price.toFixed(4)}
          </p>
          <p className="text-sm text-[#11f7b1]">+{priceChange}% 7D</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#11f7b1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#11f7b1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#845EF7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#845EF7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#666"
                tick={{ fill: '#666' }}
                domain={[0, (dataMax: number) => dataMax * 1.2]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#666"
                tick={{ fill: '#666' }}
                domain={[0, 0.5]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="sales"
                fill="url(#colorSales)"
                yAxisId="left"
                barSize={20}
                strokeWidth={2}
                stroke="#11f7b1"
              />
              <Bar
                dataKey="rentals"
                fill="url(#colorRentals)"
                yAxisId="left"
                barSize={20}
                strokeWidth={2}
                stroke="#845EF7"
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#11f7b1"
                strokeWidth={2}
                dot={{ fill: '#11f7b1', r: 4 }}
                yAxisId="left"
                onMouseEnter={(_, index) => {
                  setHoveredPrice(data[index].price);
                }}
                onMouseLeave={() => setHoveredPrice(null)}
              />
              <Line
                type="monotone"
                dataKey="mindshare"
                stroke="#666"
                strokeWidth={2}
                dot={{ fill: '#666', r: 4 }}
                yAxisId="right"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-white">
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400">Engagement (Avg.)</h3>
          <p className="text-2xl font-bold">22.88</p>
          <p className="text-sm text-[#11f7b1]">+83.5% 7D</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400">Impressions (Avg.)</h3>
          <p className="text-2xl font-bold">1.34K</p>
          <p className="text-sm text-[#11f7b1]">+79% 7D</p>
        </div>
      </div>
    </div>
  );
}
