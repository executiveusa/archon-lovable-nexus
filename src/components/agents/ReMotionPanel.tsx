
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export function ReMotionPanel() {
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const videoTemplates = [
    { id: 'intro-scene', name: 'Intro Scene', duration: '5s' },
    { id: 'glass-hero', name: 'Glass Hero Intro', duration: '10s' },
    { id: 'agent-showcase', name: 'Agent Showcase', duration: '15s' },
    { id: 'dashboard-demo', name: 'Dashboard Demo', duration: '30s' },
    { id: 'feature-explainer', name: 'Feature Explainer', duration: '45s' }
  ];

  const handleRenderVideo = () => {
    if (!selectedTemplate) return;
    
    setIsRendering(true);
    setRenderProgress(0);
    
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <GlassContainer variant="panel" className="p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">🎬</span>
          ReMotion Studio
          <Badge variant="outline" className="border-archon-accent text-archon-accent">
            {isRendering ? 'RENDERING' : 'READY'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-accent">Templates</div>
            <div className="text-xs text-muted-foreground">
              {videoTemplates.length} compositions available
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-primary">Output</div>
            <div className="text-xs text-muted-foreground">MP4, 1080p, 60fps</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Video Template</div>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="bg-archon-bg/50 border-archon-border">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {videoTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{template.name}</span>
                    <Badge variant="outline" className="ml-2">{template.duration}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isRendering && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-warning">Rendering Progress</div>
            <Progress value={renderProgress} className="h-2" />
            <div className="text-xs text-muted-foreground">{renderProgress}% complete</div>
          </div>
        )}

        <div className="flex gap-2">
          <GlassButton 
            glassVariant="accent"
            onClick={handleRenderVideo}
            disabled={!selectedTemplate || isRendering}
            className="flex-1"
          >
            {isRendering ? 'Rendering...' : 'Render Video'}
          </GlassButton>
          <Link to="/timeline">
            <GlassButton variant="outline" size="sm">
              Timeline
            </GlassButton>
          </Link>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-archon-accent/5 border border-archon-accent/20">
          <div className="text-xs font-medium text-archon-accent mb-1">Recent Renders</div>
          <div className="text-xs text-muted-foreground">
            intro-scene.mp4 • 1.2MB • 1 min ago
          </div>
        </div>
      </CardContent>
    </GlassContainer>
  );
}
