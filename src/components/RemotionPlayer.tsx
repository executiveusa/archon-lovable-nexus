
import React from 'react';
import { Player } from '@remotion/player';
import { IntroScene } from '@/scenes/IntroScene';
import { GlassContainer } from '@/components/glass/GlassContainer';

export default function RemotionPlayer() {
  return (
    <GlassContainer variant="panel" className="p-6">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-archon-accent flex items-center gap-2">
          🎬 Remotion Scene Preview
        </h2>
        <div className="rounded-lg overflow-hidden shadow-glass border border-archon-border">
          <Player
            component={IntroScene}
            durationInFrames={150}
            compositionWidth={800}
            compositionHeight={450}
            fps={30}
            controls
            style={{
              width: '100%',
              maxWidth: '800px',
              height: '450px',
            }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Archon Nexus Intro Scene • 5 seconds • 30fps
        </p>
      </div>
    </GlassContainer>
  );
}
