
import React, { useState } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';
import { CrewAICard } from '@/components/agents/CrewAICard';
import { VisualAgentCard } from '@/components/agents/VisualAgentCard';
import { VoiceAgentCard } from '@/components/agents/VoiceAgentCard';
import { SiteGhostUI } from '@/components/siteghost/SiteGhostUI';
import { MirrorFrameEditor } from '@/components/siteghost/MirrorFrameEditor';
import { usePatchExporter } from '@/hooks/usePatchExporter';
import { Code, Eye, Download, Palette } from 'lucide-react';

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
