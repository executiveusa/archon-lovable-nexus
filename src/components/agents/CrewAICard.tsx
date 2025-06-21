
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CrewAI, { AgentStatus } from '@/agents/CrewAI';

export function CrewAICard() {
  const [status, setStatus] = useState<AgentStatus>(CrewAI.status);
  const [lastResponse, setLastResponse] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'active': return 'bg-archon-success';
      case 'booting': return 'bg-archon-warning';
      case 'error': return 'bg-archon-danger';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: AgentStatus) => {
    switch (status) {
      case 'active': return 'Online';
      case 'booting': return 'Booting';
      case 'error': return 'Error';
      default: return 'Idle';
    }
  };

  const handleRunAgent = async () => {
    setIsRunning(true);
    setStatus('booting');
    try {
      const response = await CrewAI.run();
      setLastResponse(response);
      setStatus('active');
    } catch (error) {
      setStatus('error');
      setLastResponse('Failed to initialize');
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    setStatus(CrewAI.status);
  }, []);

  return (
    <Card className="glass-card border-archon-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            CrewAI Agent
          </div>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant="outline" className="border-archon-border">
            {getStatusText(status)}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">ID:</span>
          <code className="text-xs bg-archon-bg/50 px-2 py-1 rounded">
            {CrewAI.id}
          </code>
        </div>

        {lastResponse && (
          <div className="p-3 bg-archon-bg/30 rounded border border-archon-border">
            <div className="text-xs text-muted-foreground mb-1">Last Response:</div>
            <div className="text-sm">{lastResponse}</div>
          </div>
        )}

        <Button 
          onClick={handleRunAgent} 
          disabled={isRunning || status === 'booting'}
          className="w-full glass-btn-primary"
        >
          {isRunning ? 'Running...' : 'Run Agent'}
        </Button>
      </CardContent>
    </Card>
  );
}
