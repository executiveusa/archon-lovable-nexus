
import React from 'react';
import { Composition } from 'remotion';

export const IntroScene: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-archon-primary to-archon-accent text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animate-pulse">
          Welcome to Archon Nexus
        </h1>
        <p className="text-2xl opacity-80">🎬 Glass Mode Activated</p>
      </div>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="IntroScene"
      component={IntroScene}
      durationInFrames={150}
      fps={30}
      width={800}
      height={450}
    />
  );
};
