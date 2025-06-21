
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VisualConsistencyAgent, { VisualAgentStatus, VisualLogEntry } from '@/agents/VisualConsistencyAgent';

export function VisualAgentCard() {
  const [status, setStatus] = useState<VisualAgentStatus>(VisualConsistencyAgent.status);
  const [logs, setLogs] = useState<VisualLogEntry[]>(VisualConsistencyAgent.logs);
  const [lastResponse, setLastResponse] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const getStatusColor = (status: VisualAgentStatus) => {
    switch (status) {
      case 'active': return 'bg-archon-success';
      case 'scanning': return 'bg-archon-warning';
      case 'error': return 'bg-archon-danger';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: VisualAgentStatus) => {
    switch (status) {
      case 'active': return 'Monitoring';
      case 'scanning': return 'Scanning';
      case 'error': return 'Error';
      default: return 'Idle';
    }
  };

  const getLevelColor = (level: VisualLogEntry['level']) => {
    switch (level) {
      case 'info': return 'text-archon-primary';
      case 'warning': return 'text-archon-warning';
      case 'error': return 'text-archon-danger';
      default: return 'text-muted-foreground';
    }
  };

  const handleRunAgent = async () => {
    setIsRunning(true);
    setStatus('scanning');
    
    try {
      const response = await VisualConsistencyAgent.run();
      setLastResponse(response);
      setStatus(VisualConsistencyAgent.status);
      setLogs([...VisualConsistencyAgent.logs]);
    } catch (error) {
      VisualConsistencyAgent.status = 'error';
      VisualConsistencyAgent.addLog('error', 'Failed to initialize visual agent');
      setStatus('error');
      setLogs([...VisualConsistencyAgent.logs]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStopAgent = () => {
    VisualConsistencyAgent.stop();
    setStatus(VisualConsistencyAgent.status);
    setLogs([...VisualConsistencyAgent.logs]);
  };

  useEffect(() => {
    setStatus(VisualConsistencyAgent.status);
    setLogs([...VisualConsistencyAgent.logs]);
  }, []);

  return (
    <Card className="glass-card border-archon-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👁️</span>
            Visual Agent
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
            {VisualConsistencyAgent.id}
          </code>
        </div>

        {logs.length > 0 && (
          <div className="p-3 bg-archon-bg/30 rounded border border-archon-border">
            <div className="text-xs text-muted-foreground mb-2">Agent Logs:</div>
            <div className="max-h-32 overflow-y-auto space-y-1 font-mono text-xs">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-muted-foreground">[{log.timestamp}]</span>
                  <span className={`font-medium ${getLevelColor(log.level)}`}>
                    {log.level.toUpperCase()}:
                  </span>
                  <span>{log.message}</span>
                  {log.element && (
                    <span className="text-archon-accent">{log.element}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {lastResponse && (
          <div className="p-3 bg-archon-bg/30 rounded border border-archon-border">
            <div className="text-xs text-muted-foreground mb-1">Last Response:</div>
            <div className="text-sm">{lastResponse}</div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleRunAgent} 
            disabled={isRunning || status === 'scanning' || status === 'active'}
            className="flex-1 glass-btn-primary"
          >
            {isRunning ? 'Starting...' : 'Start Monitor'}
          </Button>
          
          {status === 'active' && (
            <Button 
              onClick={handleStopAgent}
              variant="outline"
              className="flex-1 glass-btn-danger"
            >
              Stop
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
