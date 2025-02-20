
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ChartDemo from '../components/ChartDemo';
import { SunIcon, MoonIcon } from 'lucide-react';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-100'}`}>
      <div className="w-full p-4 flex justify-end">
        <Button
          variant="outline"
          size="icon"
          className={`${isDarkMode ? 'border-gray-800 text-white' : 'border-gray-200'}`}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </Button>
      </div>
      <ChartDemo isDarkMode={isDarkMode} />
    </div>
  );
};

export default Index;
