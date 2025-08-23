import React, { useState } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';
import { CrewAICard } from '@/components/agents/CrewAICard';
import { VisualAgentCard } from '@/components/agents/VisualAgentCard';
import { VoiceAgentCard } from '@/components/agents/VoiceAgentCard';
import { SiteGhostUI } from '@/components/siteghost/SiteGhostUI';
import { MirrorFrameEditor } from '@/components/siteghost/MirrorFrameEditor';
import { MetaAgentSystem } from '@/components/modules/MetaAgentSystem';
import { GoogleOAuthIntegration } from '@/components/auth/GoogleOAuthIntegration';
import { MangleTraceVisualization } from '@/components/mangle/MangleTraceVisualization';
import { usePatchExporter } from '@/hooks/usePatchExporter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Eye, Download, Palette, Database, Shield, GitBranch } from 'lucide-react';

const Agents = () => {
  const [showSiteGhost, setShowSiteGhost] = useState(false);
  const [showMirrorFrame, setShowMirrorFrame] = useState(false);
  const { exportCurrentProject, isExporting, exportProgress } = usePatchExporter();

  const handleExportPatch = async () => {
    const result = await exportCurrentProject('Archon X SiteGhost Patch');
    if (result.success && result.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = 'archon-x-siteghost-patch.json';
      link.click();
    }
  };

  return (
    <>
      <GlassCursorTrail />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-shadow">
            🤖 <span className="text-archon-accent">Agent Dashboard</span>
          </h1>
        </div>

        {/* Archon X Integration Tabs */}
        <GlassContainer variant="hero" className="p-8">
          <Tabs defaultValue="agents" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="agents" className="flex items-center gap-2">
                🤖 Agents
              </TabsTrigger>
              <TabsTrigger value="mangle" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Mangle
              </TabsTrigger>
              <TabsTrigger value="auth" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Auth
              </TabsTrigger>
              <TabsTrigger value="traces" className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Traces
              </TabsTrigger>
            </TabsList>

            <TabsContent value="agents" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-archon-primary mb-2">
                  Archon X Agent System
                </h2>
                <p className="text-muted-foreground">
                  Integrated A2A core with Google Cloud agents and Mangle logic layer
                </p>
              </div>
              
              {/* Google Agents Meta System */}
              <MetaAgentSystem />

              {/* Legacy Agent Cards */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-archon-primary mb-4">Legacy Agents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CrewAICard />
                  <VisualAgentCard />
                  <VoiceAgentCard />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mangle" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-archon-primary mb-2">
                  Mangle Logic Layer
                </h2>
                <p className="text-muted-foreground">
                  Structured fact assertion and transitive dependency analysis
                </p>
              </div>
              <MangleTraceVisualization />
            </TabsContent>

            <TabsContent value="auth" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-archon-primary mb-2">
                  Google Cloud Authentication
                </h2>
                <p className="text-muted-foreground">
                  OAuth integration and service account management with automatic key rotation
                </p>
              </div>
              <GoogleOAuthIntegration />
            </TabsContent>

            <TabsContent value="traces" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-archon-primary mb-2">
                  Agent Workflow Traces
                </h2>
                <p className="text-muted-foreground">
                  Real-time monitoring of agent executions and fact assertions
                </p>
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <GlassContainer className="p-4 text-center">
                  <div className="text-2xl font-bold text-archon-success">&lt; 350ms</div>
                  <div className="text-sm text-muted-foreground">Avg Trace Latency</div>
                </GlassContainer>
                <GlassContainer className="p-4 text-center">
                  <div className="text-2xl font-bold text-archon-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Cache Hit Rate</div>
                </GlassContainer>
                <GlassContainer className="p-4 text-center">
                  <div className="text-2xl font-bold text-archon-accent">1,247</div>
                  <div className="text-sm text-muted-foreground">Facts Asserted</div>
                </GlassContainer>
              </div>

              <MangleTraceVisualization />
            </TabsContent>
          </Tabs>
        </GlassContainer>

        {/* SiteGhost UI Controls */}
        <GlassContainer className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-archon-primary mb-2">SiteGhost UI & MirrorFrame Editor</h2>
              <p className="text-muted-foreground">Visual design tools with AI-assisted template generation and live editing</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <GlassButton
                onClick={() => setShowSiteGhost(!showSiteGhost)}
                variant={showSiteGhost ? "default" : "outline"}
              >
                <Palette className="w-4 h-4 mr-2" />
                Templates
              </GlassButton>
              <GlassButton
                onClick={() => setShowMirrorFrame(!showMirrorFrame)}
                variant={showMirrorFrame ? "default" : "outline"}
              >
                <Eye className="w-4 h-4 mr-2" />
                Editor
              </GlassButton>
              <GlassButton
                onClick={handleExportPatch}
                disabled={isExporting}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? `${exportProgress.toFixed(0)}%` : 'Export'}
              </GlassButton>
            </div>
          </div>
        </GlassContainer>
      </div>

      {/* SiteGhost UI Overlay */}
      <SiteGhostUI 
        isVisible={showSiteGhost} 
        onClose={() => setShowSiteGhost(false)} 
      />

      {/* MirrorFrame Editor Overlay */}
      <MirrorFrameEditor 
        isVisible={showMirrorFrame} 
        onClose={() => setShowMirrorFrame(false)} 
      />
    </>
  );
};

export default Agents;