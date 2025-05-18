
import { StatusCard } from '@/components/dashboard/StatusCard';
import { AgentStatus } from '@/components/dashboard/AgentStatus';
import { MCPStatus } from '@/components/dashboard/MCPStatus';
import { QuickAccess } from '@/components/dashboard/QuickAccess';
import { MetaAgentSystem } from '@/components/modules/MetaAgentSystem';
import { ResearchAssistant } from '@/components/modules/ResearchAssistant';
import { VideoStudio } from '@/components/modules/VideoStudio';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const agents = [
    { name: "Codex", type: "Development", status: "online", usagePercent: 25 },
    { name: "Venice", type: "Creative", status: "online", usagePercent: 10 },
    { name: "Gemini", type: "Multimodal", status: "standby", usagePercent: 0 },
    { name: "Researcher", type: "Knowledge", status: "online", usagePercent: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button>Deploy Stack</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          title="System Status" 
          value="Operational" 
          icon="⚙️" 
        />
        <StatusCard 
          title="Active Agents" 
          value="3/4" 
          icon="🤖" 
          trend="up" 
          trendValue="+1 from yesterday" 
        />
        <StatusCard 
          title="Memory Usage" 
          value="2.4 GB" 
          icon="💾" 
          trend="neutral" 
          trendValue="0% change" 
        />
        <StatusCard 
          title="Docker Containers" 
          value="6 Running" 
          icon="🐳" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MCPStatus />
        </div>
        <div className="space-y-6">
          <AgentStatus agents={agents} />
          <QuickAccess />
        </div>
      </div>
      
      <div className="pt-6">
        <h3 className="text-xl font-bold mb-4">Modules</h3>
        <Tabs defaultValue="agents">
          <TabsList className="mb-4">
            <TabsTrigger value="agents">Meta-Agent System</TabsTrigger>
            <TabsTrigger value="research">Research Assistant</TabsTrigger>
            <TabsTrigger value="video">Video Studio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents">
            <MetaAgentSystem />
          </TabsContent>
          
          <TabsContent value="research">
            <ResearchAssistant />
          </TabsContent>
          
          <TabsContent value="video">
            <VideoStudio />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
