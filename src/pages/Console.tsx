
import { StatusCard } from '@/components/dashboard/StatusCard';
import { AgentStatus, Agent } from '@/components/dashboard/AgentStatus';
import { MCPStatus } from '@/components/dashboard/MCPStatus';
import { QuickAccess } from '@/components/dashboard/QuickAccess';
import { MetaAgentSystem } from '@/components/modules/MetaAgentSystem';
import { ResearchAssistant } from '@/components/modules/ResearchAssistant';
import { VideoStudio } from '@/components/modules/VideoStudio';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaudePanel } from '@/components/agents/ClaudePanel';
import { ReMotionPanel } from '@/components/agents/ReMotionPanel';
import { FirecrawlPanel } from '@/components/agents/FirecrawlPanel';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';

const Console = () => {
  const agents: Agent[] = [
    { name: "Codex", type: "Development", status: "online", usagePercent: 25 },
    { name: "Venice", type: "Creative", status: "online", usagePercent: 10 },
    { name: "Gemini", type: "Multimodal", status: "standby", usagePercent: 0 },
    { name: "Researcher", type: "Knowledge", status: "online", usagePercent: 45 },
  ];

  return (
    <>
      <GlassCursorTrail />
      
      {/* Dashboard Content */}
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-shadow">
            ARCHON <span className="text-archon-accent">NEXUS</span>
          </h2>
          <Button className="glass-btn-primary backdrop-blur-md border border-archon-primary/30">
            Deploy Stack
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassContainer variant="panel">
            <StatusCard 
              title="System Status" 
              value="Operational" 
              icon="⚙️" 
            />
          </GlassContainer>
          <GlassContainer variant="panel">
            <StatusCard 
              title="Active Agents" 
              value="6/6" 
              icon="🤖" 
              trend="up" 
              trendValue="+3 from yesterday" 
            />
          </GlassContainer>
          <GlassContainer variant="panel">
            <StatusCard 
              title="Memory Usage" 
              value="2.4 GB" 
              icon="💾" 
              trend="neutral" 
              trendValue="0% change" 
            />
          </GlassContainer>
          <GlassContainer variant="panel">
            <StatusCard 
              title="Glass Mode" 
              value="Active" 
              icon="✨" 
            />
          </GlassContainer>
        </div>

        {/* AI Agent Control Panels */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-archon-primary">AI Agent Console</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <ClaudePanel />
            <ReMotionPanel />
            <FirecrawlPanel />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2">
            <GlassContainer variant="panel">
              <MCPStatus />
            </GlassContainer>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <GlassContainer variant="panel">
              <AgentStatus agents={agents} />
            </GlassContainer>
            <GlassContainer variant="panel">
              <QuickAccess />
            </GlassContainer>
          </div>
        </div>
        
        <div className="pt-4 sm:pt-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Modules</h3>
          <GlassContainer variant="hero">
            <Tabs defaultValue="agents">
              <TabsList className="mb-4 bg-archon-bg/50 backdrop-blur-md flex-wrap">
                <TabsTrigger value="agents" className="text-xs sm:text-sm">Meta-Agent System</TabsTrigger>
                <TabsTrigger value="research" className="text-xs sm:text-sm">Research Assistant</TabsTrigger>
                <TabsTrigger value="video" className="text-xs sm:text-sm">Video Studio</TabsTrigger>
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
          </GlassContainer>
        </div>
      </div>
    </>
  );
};

export default Console;
