
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VoiceAgent, { VoiceAgentStatus, VoiceLogEntry } from '@/agents/VoiceAgent';

export function VoiceAgentCard() {
  const [status, setStatus] = useState<VoiceAgentStatus>(VoiceAgent.status);
  const [logs, setLogs] = useState<VoiceLogEntry[]>(VoiceAgent.logs);
  const [isRecording, setIsRecording] = useState(false);

  const getStatusColor = (status: VoiceAgentStatus) => {
    switch (status) {
      case 'listening': return 'bg-archon-success';
      case 'processing': return 'bg-archon-warning';
      case 'speaking': return 'bg-archon-primary';
      case 'error': return 'bg-archon-danger';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: VoiceAgentStatus) => {
    switch (status) {
      case 'listening': return 'Listening';
      case 'processing': return 'Processing';
      case 'speaking': return 'Speaking';
      case 'error': return 'Error';
      default: return 'Idle';
    }
  };

  const getLevelColor = (level: VoiceLogEntry['level']) => {
    switch (level) {
      case 'info': return 'text-archon-primary';
      case 'warning': return 'text-archon-warning';
      case 'error': return 'text-archon-danger';
      default: return 'text-muted-foreground';
    }
  };

  const handleStartListening = async () => {
    setIsRecording(true);
    setStatus('processing');
    
    try {
      await VoiceAgent.startListening();
      setStatus(VoiceAgent.status);
      setLogs([...VoiceAgent.logs]);
    } catch (error) {
      VoiceAgent.status = 'error';
      VoiceAgent.addLog('error', 'Failed to start voice recording');
      setStatus('error');
      setLogs([...VoiceAgent.logs]);
    } finally {
      setIsRecording(false);
    }
  };

  const handleStopListening = () => {
    VoiceAgent.stopListening();
    setStatus(VoiceAgent.status);
    setLogs([...VoiceAgent.logs]);
    setIsRecording(false);
  };

  useEffect(() => {
    setStatus(VoiceAgent.status);
    setLogs([...VoiceAgent.logs]);
  }, []);

  return (
    <Card className="glass-card border-archon-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎤</span>
            Voice Agent
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
            {VoiceAgent.id}
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
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleStartListening} 
            disabled={isRecording || status === 'listening' || status === 'processing'}
            className="flex-1 glass-btn-primary"
          >
            {isRecording ? 'Recording...' : 'Start Listening'}
          </Button>
          
          {status === 'listening' && (
            <Button 
              onClick={handleStopListening}
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
