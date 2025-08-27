import React, { useState, useEffect } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  Heart, 
  MapPin, 
  Bluetooth, 
  Trophy, 
  TrendingUp, 
  Download,
  Watch,
  Zap,
  Target,
  Calendar
} from 'lucide-react';

interface FitnessData {
  steps: number;
  heartRate: number;
  distance: number;
  calories: number;
  activeMinutes: number;
  sleepHours: number;
}

interface FitnessSignalsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FitnessSignalsKit: React.FC<FitnessSignalsProps> = ({ isVisible, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceData, setDeviceData] = useState<FitnessData>({
    steps: 0,
    heartRate: 0,
    distance: 0,
    calories: 0,
    activeMinutes: 0,
    sleepHours: 0
  });
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Mock data for demonstration
  const mockWeeklyData = [
    { day: 'Mon', steps: 8500, heartRate: 72, calories: 320 },
    { day: 'Tue', steps: 9200, heartRate: 75, calories: 385 },
    { day: 'Wed', steps: 7800, heartRate: 70, calories: 295 },
    { day: 'Thu', steps: 10500, heartRate: 78, calories: 420 },
    { day: 'Fri', steps: 11200, heartRate: 80, calories: 465 },
    { day: 'Sat', steps: 12800, heartRate: 76, calories: 510 },
    { day: 'Sun', steps: 9600, heartRate: 73, calories: 380 }
  ];

  const achievements = [
    { id: 1, title: "Step Master", description: "10,000+ steps for 7 days", unlocked: true },
    { id: 2, title: "Heart Hero", description: "Maintain target HR zone", unlocked: true },
    { id: 3, title: "Distance Destroyer", description: "5km daily for a week", unlocked: false },
    { id: 4, title: "Consistency King", description: "30 days active streak", unlocked: false }
  ];

  useEffect(() => {
    if (isVisible) {
      setWeeklyData(mockWeeklyData);
      // Simulate real-time data updates
      const interval = setInterval(() => {
        if (isConnected) {
          setDeviceData(prev => ({
            steps: prev.steps + Math.floor(Math.random() * 5),
            heartRate: 70 + Math.floor(Math.random() * 20),
            distance: prev.distance + (Math.random() * 0.1),
            calories: prev.calories + Math.floor(Math.random() * 3),
            activeMinutes: prev.activeMinutes + Math.floor(Math.random() * 2),
            sleepHours: 7.5 + (Math.random() * 1.5)
          }));
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isVisible, isConnected]);

  const connectDevice = async () => {
    setConnectionStatus('connecting');
    
    // Simulate Bluetooth connection to Bangle.js 2
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnectionStatus('connected');
    setIsConnected(true);
    setDeviceData({
      steps: 8547,
      heartRate: 75,
      distance: 6.2,
      calories: 342,
      activeMinutes: 45,
      sleepHours: 7.8
    });
  };

  const generateWeeklyReport = async () => {
    // Simulate generating PDF report via PlutoPrint
    console.log('Generating weekly fitness report...');
    
    const reportData = {
      weeklyAverage: {
        steps: weeklyData.reduce((sum, day) => sum + day.steps, 0) / weeklyData.length,
        heartRate: weeklyData.reduce((sum, day) => sum + day.heartRate, 0) / weeklyData.length,
        calories: weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length
      },
      insights: [
        "Your step count improved 15% this week",
        "Heart rate variability is in optimal range",
        "Most active on weekends - consider weekday improvements",
        "Sleep quality correlates with step count"
      ]
    };

    // This would integrate with PlutoPrint MCP tool
    alert('Weekly report generated! (In production, this would download a PDF)');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassContainer className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Watch className="w-6 h-6 text-archon-primary" />
              <h2 className="text-2xl font-semibold text-archon-primary">Fitness Signals Kit</h2>
              <Badge variant="outline" className="ml-2">Premium</Badge>
            </div>
            <GlassButton onClick={onClose} variant="outline">
              Close
            </GlassButton>
          </div>

          {/* Device Connection Section */}
          <Card className="p-6 mb-6 bg-archon-card border-archon-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Bluetooth className="w-5 h-5 text-archon-primary" />
                <h3 className="text-lg font-semibold">Bangle.js 2 Device</h3>
                <Badge variant={isConnected ? "default" : "secondary"}>
                  {connectionStatus === 'connected' ? 'Connected' : 
                   connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </Badge>
              </div>
              {!isConnected && (
                <GlassButton 
                  onClick={connectDevice}
                  disabled={connectionStatus === 'connecting'}
                >
                  {connectionStatus === 'connecting' ? 'Connecting...' : 'Connect Device'}
                </GlassButton>
              )}
            </div>
            
            {isConnected && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-2 mx-auto">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-archon-primary">{deviceData.steps.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Steps</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-2 mx-auto">
                    <Heart className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-2xl font-bold text-archon-primary">{deviceData.heartRate}</div>
                  <div className="text-sm text-muted-foreground">BPM</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-2 mx-auto">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-archon-primary">{deviceData.distance.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">km</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full mb-2 mx-auto">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-archon-primary">{deviceData.calories}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-2 mx-auto">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-archon-primary">{deviceData.activeMinutes}</div>
                  <div className="text-sm text-muted-foreground">Active Min</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/20 rounded-full mb-2 mx-auto">
                    <Calendar className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-archon-primary">{deviceData.sleepHours.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Sleep Hours</div>
                </div>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Trends */}
            <Card className="lg:col-span-2 p-6 bg-archon-card border-archon-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-archon-primary">Weekly Activity Trends</h3>
                <GlassButton onClick={generateWeeklyReport} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </GlassButton>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid #8b5cf6',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Achievements & Goals */}
            <Card className="p-6 bg-archon-card border-archon-border">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-archon-primary" />
                <h3 className="text-lg font-semibold text-archon-primary">Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-archon-surface border-archon-border'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className={`w-4 h-4 ${
                        achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                      }`} />
                      <span className="font-medium text-sm">{achievement.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>

              {/* Daily Goals Progress */}
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-archon-primary">Daily Goals</h4>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Steps</span>
                    <span>{deviceData.steps.toLocaleString()}/10,000</span>
                  </div>
                  <Progress value={(deviceData.steps / 10000) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Active Minutes</span>
                    <span>{deviceData.activeMinutes}/30</span>
                  </div>
                  <Progress value={(deviceData.activeMinutes / 30) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span>{deviceData.calories}/400</span>
                  </div>
                  <Progress value={(deviceData.calories / 400) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Heart Rate Trends */}
          <Card className="mt-6 p-6 bg-archon-card border-archon-border">
            <h3 className="text-lg font-semibold mb-4 text-archon-primary">Heart Rate Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid #ef4444',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Integration Status */}
          <Card className="mt-6 p-4 bg-archon-card border-archon-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-archon-primary">Integration Status</h4>
                <p className="text-sm text-muted-foreground">
                  Connected to PlutoPrint for reports, Basedash for analytics, Stripe for premium features
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Live</span>
              </div>
            </div>
          </Card>
        </div>
      </GlassContainer>
    </div>
  );
};