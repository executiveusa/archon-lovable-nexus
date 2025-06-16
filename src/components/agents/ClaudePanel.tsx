
import React, { useState } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export function ClaudePanel() {
  const [status, setStatus] = useState<'online' | 'processing' | 'idle'>('online');
  const [prompt, setPrompt] = useState('');
  const [lastResponse, setLastResponse] = useState('Ready for design and copy assistance...');

  const handleRewrite = () => {
    setStatus('processing');
    setTimeout(() => {
      setLastResponse('Generated optimized copy and design suggestions.');
      setStatus('online');
    }, 2000);
  };

  return (
    <GlassContainer variant="panel" className="p-6">
      <CardHeader className="p-0 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            Claude (Anthropic)
            <Badge variant="outline" className={`
              ${status === 'online' ? 'border-archon-success text-archon-success' : ''}
              ${status === 'processing' ? 'border-archon-warning text-archon-warning animate-pulse' : ''}
              ${status === 'idle' ? 'border-muted text-muted-foreground' : ''}
            `}>
              {status.toUpperCase()}
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-primary">Capabilities</div>
            <div className="flex flex-wrap gap-1">
              {['Design Review', 'Copy Writing', 'UX Optimization', 'Code Review'].map((capability) => (
                <Badge key={capability} variant="secondary" className="text-xs bg-archon-primary/10">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-secondary">Last Activity</div>
            <div className="text-xs text-muted-foreground">{lastResponse}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Quick Actions</div>
          <div className="flex gap-2">
            <GlassButton 
              size="sm" 
              glassVariant="primary"
              onClick={handleRewrite}
              disabled={status === 'processing'}
            >
              Rewrite Section
            </GlassButton>
            <GlassButton size="sm" glassVariant="secondary">
              Design Review
            </GlassButton>
            <GlassButton size="sm" glassVariant="accent">
              UX Audit
            </GlassButton>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Custom Prompt</div>
          <Textarea
            placeholder="Enter custom instructions for Claude..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-archon-bg/50 border-archon-border"
          />
          <GlassButton 
            size="sm" 
            glassVariant="primary" 
            className="w-full"
            disabled={!prompt.trim()}
          >
            Execute Prompt
          </GlassButton>
        </div>
      </CardContent>
    </GlassContainer>
  );
}
