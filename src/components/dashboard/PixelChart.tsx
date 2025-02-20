
interface PixelChartProps {
  data: Array<{ date: string; sales: number; rentals: number }>;
  maxValue: number;
}

export function PixelChart({ data, maxValue }: PixelChartProps) {
  const pixelsPerColumn = 20;
  const valuePerPixel = maxValue / pixelsPerColumn;

  const getPixelsForValue = (value: number) => {
    return Math.round(value / valuePerPixel);
  };

  return (
    <div className="absolute inset-0 flex items-end gap-4 pt-8">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex gap-1 justify-center">
          <div className="flex flex-col-reverse gap-[2px]">
            {Array.from({ length: getPixelsForValue(item.sales) }).map((_, i) => (
              <div
                key={i}
                className="w-[6px] h-[6px] bg-[#11f7b1]"
              />
            ))}
          </div>
          <div className="flex flex-col-reverse gap-[2px]">
            {Array.from({ length: getPixelsForValue(item.rentals) }).map((_, i) => (
              <div
                key={i}
                className="w-[6px] h-[6px] bg-[#11f7b180]"
              />
            ))}
          </div>
          <div className="absolute -bottom-6 text-xs text-center w-full">
            {item.date}
          </div>
        </div>
      ))}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="text-xs text-gray-500">
            {Math.round((maxValue * (4 - i)) / 4)}
          </div>
        ))}
      </div>
    </div>
  );
}
