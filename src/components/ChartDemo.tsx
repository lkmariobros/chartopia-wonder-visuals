
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
  { date: 'Feb 12', price: 0.001, volume: 100, mindshare: 0.12 },
  { date: 'Feb 13', price: 0.0015, volume: 150, mindshare: 0.15 },
  { date: 'Feb 14', price: 0.001, volume: 120, mindshare: 0.11 },
  { date: 'Feb 15', price: 0.002, volume: 200, mindshare: 0.18 },
  { date: 'Feb 16', price: 0.006, volume: 400, mindshare: 0.25 },
  { date: 'Feb 17', price: 0.004, volume: 300, mindshare: 0.22 },
  { date: 'Feb 18', price: 0.003, volume: 250, mindshare: 0.20 }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
        <p className="text-[#11f7b1]">{`Price: $${payload[0].value.toFixed(4)}`}</p>
        <p className="text-[#11f7b1]">{`Mindshare: ${(payload[1].value * 100).toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

export default function ChartDemo() {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#121212] rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Price & Mindshare</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#11f7b1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#11f7b1" stopOpacity={0} />
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
                dataKey="volume"
                fill="url(#colorVolume)"
                yAxisId="left"
                barSize={30}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#11f7b1"
                strokeWidth={2}
                dot={{ fill: '#11f7b1', r: 4 }}
                yAxisId="left"
                onMouseEnter={(data) => setHoveredPrice(data.value)}
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

      <div className="grid grid-cols-3 gap-4 text-white">
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-2xl font-bold text-[#11f7b1]">
            ${hoveredPrice?.toFixed(4) || data[data.length - 1].price.toFixed(4)}
          </p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <p className="text-sm text-gray-400">Volume</p>
          <p className="text-2xl font-bold text-[#11f7b1]">
            {data[data.length - 1].volume}
          </p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
          <p className="text-sm text-gray-400">Mindshare</p>
          <p className="text-2xl font-bold text-[#11f7b1]">
            {(data[data.length - 1].mindshare * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
