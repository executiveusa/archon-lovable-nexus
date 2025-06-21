
import React from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';
import { CrewAICard } from '@/components/agents/CrewAICard';

const Agents = () => {
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
          </div>
        </GlassContainer>
      </div>
    </>
  );
};

export default Agents;
