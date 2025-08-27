import React, { useState, useEffect } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity, Mic, Send } from 'lucide-react';

interface AnalyticsQuery {
  query: string;
  chartType: 'line' | 'bar' | 'pie' | 'area';
  data: any[];
  insights: string[];
}

interface BasedashProps {
  isVisible: boolean;
  onClose: () => void;
}

export const BasedashAnalytics: React.FC<BasedashProps> = ({ isVisible, onClose }) => {
  const [query, setQuery] = useState('');
  const [currentAnalytics, setCurrentAnalytics] = useState<AnalyticsQuery | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Sample data for demonstration
  const sampleQueries = [
    "Show me monthly revenue growth",
    "Agent performance by type",
    "Fitness tracker engagement rates",
    "LlamaIndex API usage trends"
  ];

  const generateMockData = (queryType: string): AnalyticsQuery => {
    const mockData = {
      revenue: [
        { month: 'Jan', value: 12000, growth: 5 },
        { month: 'Feb', value: 15000, growth: 25 },
        { month: 'Mar', value: 18000, growth: 20 },
        { month: 'Apr', value: 22000, growth: 22 },
        { month: 'May', value: 26000, growth: 18 },
        { month: 'Jun', value: 30000, growth: 15 }
      ],
      agents: [
        { type: 'CrewAI', tasks: 450, success: 92 },
        { type: 'Visual', tasks: 320, success: 88 },
        { type: 'Voice', tasks: 280, success: 95 },
        { type: 'Motia', tasks: 150, success: 97 }
      ],
      fitness: [
        { device: 'Bangle.js 2', users: 1250, engagement: 78 },
        { device: 'Generic', users: 850, engagement: 45 },
        { device: 'Smartwatch', users: 950, engagement: 62 }
      ],
      api: [
        { week: 'W1', calls: 8500, cost: 120 },
        { week: 'W2', calls: 9200, cost: 135 },
        { week: 'W3', calls: 11000, cost: 158 },
        { week: 'W4', calls: 12500, cost: 180 }
      ]
    };

    if (queryType.includes('revenue')) {
      return {
        query: queryType,
        chartType: 'line',
        data: mockData.revenue,
        insights: [
          "Revenue growth consistently above 15% monthly",
          "Q2 showing strongest acceleration",
          "Fitness Signals Kit driving 40% of new revenue"
        ]
      };
    } else if (queryType.includes('agent')) {
      return {
        query: queryType,
        chartType: 'bar',
        data: mockData.agents,
        insights: [
          "Motia workflows have highest success rate at 97%",
          "Voice agents show best user satisfaction",
          "CrewAI handling highest task volume"
        ]
      };
    } else if (queryType.includes('fitness')) {
      return {
        query: queryType,
        chartType: 'pie',
        data: mockData.fitness,
        insights: [
          "Bangle.js 2 users show 78% daily engagement",
          "Premium fitness features drive retention",
          "Weekly coaching reports most-requested feature"
        ]
      };
    } else {
      return {
        query: queryType,
        chartType: 'area',
        data: mockData.api,
        insights: [
          "LlamaIndex API usage growing 15% weekly",
          "Cost efficiency improving with volume",
          "Document Q&A most popular endpoint"
        ]
      };
    }
  };

  const handleQuery = async (queryText: string) => {
    setIsLoading(true);
    setQuery(queryText);
    
    // Simulate API call to Basedash backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analytics = generateMockData(queryText);
    setCurrentAnalytics(analytics);
    setIsLoading(false);
  };

  const handleVoiceQuery = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleQuery(transcript);
      };

      recognition.start();
    }
  };

  const renderChart = () => {
    if (!currentAnalytics) return null;

    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

    switch (currentAnalytics.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentAnalytics.data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentAnalytics.data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="type" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="tasks" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="success" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentAnalytics.data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="users"
                label={({ device, users }) => `${device}: ${users}`}
              >
                {currentAnalytics.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #10b981',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentAnalytics.data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #f59e0b',
                  borderRadius: '8px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="calls" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassContainer className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-archon-primary" />
              <h2 className="text-2xl font-semibold text-archon-primary">Basedash Analytics</h2>
            </div>
            <GlassButton onClick={onClose} variant="outline">
              Close
            </GlassButton>
          </div>

          {/* Natural Language Query Interface */}
          <Card className="p-4 mb-6 bg-archon-card border-archon-border">
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Ask me anything... e.g., 'Show me weekly API usage trends'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuery(query)}
                className="flex-1"
              />
              <GlassButton 
                onClick={() => handleQuery(query)}
                disabled={isLoading || !query.trim()}
              >
                <Send className="w-4 h-4" />
              </GlassButton>
              <GlassButton 
                onClick={handleVoiceQuery}
                disabled={isLoading}
                variant="outline"
                className={isListening ? 'animate-pulse' : ''}
              >
                <Mic className="w-4 h-4" />
              </GlassButton>
            </div>

            {/* Sample Queries */}
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sampleQuery, index) => (
                <GlassButton
                  key={index}
                  onClick={() => handleQuery(sampleQuery)}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                >
                  {sampleQuery}
                </GlassButton>
              ))}
            </div>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card className="p-8 text-center bg-archon-card border-archon-border">
              <div className="flex items-center justify-center gap-3">
                <Activity className="w-6 h-6 text-archon-primary animate-spin" />
                <span>Analyzing data and generating insights...</span>
              </div>
            </Card>
          )}

          {/* Analytics Results */}
          {currentAnalytics && !isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Visualization */}
              <Card className="lg:col-span-2 p-6 bg-archon-card border-archon-border">
                <h3 className="text-lg font-semibold mb-4 text-archon-primary">
                  {currentAnalytics.query}
                </h3>
                {renderChart()}
              </Card>

              {/* AI Insights */}
              <Card className="p-6 bg-archon-card border-archon-border">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-archon-primary" />
                  <h3 className="text-lg font-semibold text-archon-primary">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {currentAnalytics.insights.map((insight, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg bg-archon-surface border border-archon-border text-sm"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Integration Status */}
          <Card className="mt-6 p-4 bg-archon-card border-archon-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-archon-primary">Integration Status</h4>
                <p className="text-sm text-muted-foreground">
                  Connected to Motia workflows, MCP tools, and ops portal
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