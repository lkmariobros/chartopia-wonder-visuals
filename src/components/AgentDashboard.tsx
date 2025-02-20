
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Award, 
  DollarSign, 
  Home, 
  Trophy, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";

const KpiCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  rank,
}: { 
  title: string;
  value: string;
  change: string;
  icon: any;
  rank?: string;
}) => (
  <Card className="bg-[#1a1a1a] border-gray-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">
        <div className="flex items-baseline gap-2">
          {title}
          {rank && <span className="text-xs text-gray-600">#{rank}</span>}
        </div>
      </CardTitle>
      <Icon className="h-4 w-4 text-[#11f7b1]" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className={cn(
        "text-sm",
        change.startsWith("+") ? "text-[#11f7b1]" : "text-red-500"
      )}>
        {change}
      </p>
    </CardContent>
  </Card>
);

export default function AgentDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400">Welcome back, Agent Smith</p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span className="text-white font-semibold">Top 5 Agent</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Monthly Commission"
          value="$45,850"
          change="+12% from last month"
          icon={DollarSign}
        />
        <KpiCard
          title="Active Listings"
          value="24"
          change="+4 from last month"
          icon={Home}
          rank="5"
        />
        <KpiCard
          title="Client Base"
          value="156"
          change="+8 new this month"
          icon={Users}
        />
        <KpiCard
          title="Conversion Rate"
          value="68%"
          change="+5% from last month"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Appointments</CardTitle>
            <CardDescription>You have 2 appointments today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#222] rounded-lg">
              <div>
                <p className="text-white font-medium">Property Viewing</p>
                <p className="text-sm text-gray-400">John Smith - 123 Main St</p>
              </div>
              <span className="text-gray-400">2:00 PM Today</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#222] rounded-lg">
              <div>
                <p className="text-white font-medium">Contract Signing</p>
                <p className="text-sm text-gray-400">Sarah Johnson - 456 Oak Ave</p>
              </div>
              <span className="text-gray-400">10:00 AM Tomorrow</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Achievement Progress</CardTitle>
            <CardDescription>Your current badges and rankings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-[#222] rounded-lg">
              <Award className="h-8 w-8 text-[#11f7b1]" />
              <div>
                <p className="text-white font-medium">Top Performer Q1</p>
                <p className="text-sm text-gray-400">Achieved $250K in sales</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-[#222] rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-white font-medium">Rising Star</p>
                <p className="text-sm text-gray-400">Top 5 in conversion rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
