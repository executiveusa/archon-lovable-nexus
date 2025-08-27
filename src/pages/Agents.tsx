
import React, { useState } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';
import { CrewAICard } from '@/components/agents/CrewAICard';
import { VisualAgentCard } from '@/components/agents/VisualAgentCard';
import { VoiceAgentCard } from '@/components/agents/VoiceAgentCard';
import { SiteGhostUI } from '@/components/siteghost/SiteGhostUI';
import { MirrorFrameEditor } from '@/components/siteghost/MirrorFrameEditor';
import { BasedashAnalytics } from '@/components/analytics/BasedashAnalytics';
import { FitnessSignalsKit } from '@/components/fitness/FitnessSignalsKit';
import { UniversalRAGPipeline } from '@/components/rag/UniversalRAGPipeline';
import { usePatchExporter } from '@/hooks/usePatchExporter';
import { 
  Code, 
  Eye, 
  Download, 
  Palette, 
  BarChart3, 
  Activity, 
  Database,
  Zap,
  Brain
} from 'lucide-react';

const Agents = () => {
  const [showSiteGhost, setShowSiteGhost] = useState(false);
  const [showMirrorFrame, setShowMirrorFrame] = useState(false);
  const [showBasedash, setShowBasedash] = useState(false);
  const [showFitnessKit, setShowFitnessKit] = useState(false);
  const [showRAGPipeline, setShowRAGPipeline] = useState(false);
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

        <GlassContainer variant="hero" className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-archon-primary mb-2">
              Active AI Agents
            </h2>
            <p className="text-muted-foreground">
              Real-time status monitoring for all registered agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CrewAICard />
            <VisualAgentCard />
            <VoiceAgentCard />
          </div>
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

        {/* Universal Agentic Platform Tools */}
        <GlassContainer className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-archon-primary mb-2">
              Universal Agentic Platform
            </h2>
            <p className="text-muted-foreground">
              LlamaIndex AI integration with Basedash analytics, Universal RAG, and monetized Fitness Signals Kit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <GlassButton
              onClick={() => setShowBasedash(!showBasedash)}
              variant={showBasedash ? "default" : "outline"}
              className="h-20 flex flex-col items-center justify-center gap-2"
            >
              <BarChart3 className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Basedash Analytics</div>
                <div className="text-xs opacity-70">Natural language queries</div>
              </div>
            </GlassButton>

            <GlassButton
              onClick={() => setShowRAGPipeline(!showRAGPipeline)}
              variant={showRAGPipeline ? "default" : "outline"}
              className="h-20 flex flex-col items-center justify-center gap-2"
            >
              <Database className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Universal RAG</div>
                <div className="text-xs opacity-70">95+ file types supported</div>
              </div>
            </GlassButton>

            <GlassButton
              onClick={() => setShowFitnessKit(!showFitnessKit)}
              variant={showFitnessKit ? "default" : "outline"}
              className="h-20 flex flex-col items-center justify-center gap-2"
            >
              <Activity className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Fitness Signals Kit</div>
                <div className="text-xs opacity-70">Bangle.js 2 integration</div>
              </div>
            </GlassButton>
          </div>

          {/* LlamaIndex Integration Status */}
          <div className="mt-6 p-4 rounded-lg bg-archon-card border border-archon-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-archon-primary" />
                <div>
                  <h4 className="font-medium text-archon-primary">LlamaIndex AI</h4>
                  <p className="text-sm text-muted-foreground">
                    Project: a5de2515-4769-4b0d-b319-7cc4addb5f01
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Connected</span>
              </div>
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

      {/* Basedash Analytics Overlay */}
      <BasedashAnalytics 
        isVisible={showBasedash} 
        onClose={() => setShowBasedash(false)} 
      />

      {/* Fitness Signals Kit Overlay */}
      <FitnessSignalsKit 
        isVisible={showFitnessKit} 
        onClose={() => setShowFitnessKit(false)} 
      />

      {/* Universal RAG Pipeline Overlay */}
      <UniversalRAGPipeline 
        isVisible={showRAGPipeline} 
        onClose={() => setShowRAGPipeline(false)} 
      />
    </>
  );
};

export default Agents;
