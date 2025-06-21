
import React from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';
import RemotionPlayer from '@/components/RemotionPlayer';

const Timeline = () => {
  return (
    <>
      <GlassCursorTrail />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-shadow">
            🗓 <span className="text-archon-accent">Timeline</span>
          </h1>
        </div>

        <GlassContainer variant="hero" className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-archon-primary mb-2">
              Video Timeline & Scene Management
            </h2>
            <p className="text-muted-foreground">
              Preview and manage Remotion compositions for the Archon Nexus
            </p>
          </div>
          
          <RemotionPlayer />
        </GlassContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassContainer variant="panel" className="p-6">
            <h3 className="text-lg font-semibold text-archon-accent mb-4">Scene Library</h3>
            <div className="space-y-2">
              <div className="p-3 rounded bg-archon-bg/30 border border-archon-border">
                <div className="font-medium">IntroScene</div>
                <div className="text-sm text-muted-foreground">5s • 800x450</div>
              </div>
            </div>
          </GlassContainer>

          <GlassContainer variant="panel" className="p-6">
            <h3 className="text-lg font-semibold text-archon-primary mb-4">Render Queue</h3>
            <div className="text-center text-muted-foreground">
              <p>No renders in progress</p>
            </div>
          </GlassContainer>

          <GlassContainer variant="panel" className="p-6">
            <h3 className="text-lg font-semibold text-archon-secondary mb-4">Export Settings</h3>
            <div className="space-y-2 text-sm">
              <div>Format: MP4</div>
              <div>Quality: 1080p</div>
              <div>Framerate: 30fps</div>
            </div>
          </GlassContainer>
        </div>
      </div>
    </>
  );
};

export default Timeline;
