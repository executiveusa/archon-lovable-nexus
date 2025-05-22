
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface Agent {
  name: string;
  type: string;
  status: 'online' | 'offline' | 'standby';
  usagePercent: number;
}

interface AgentStatusProps {
  agents: Agent[];
}

export function AgentStatus({ agents }: AgentStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-archon-success';
      case 'offline': return 'bg-muted';
      case 'standby': return 'bg-archon-warning';
      default: return 'bg-muted';
    }
  };
  
  const getUsageColor = (percent: number) => {
    if (percent < 50) return 'bg-archon-success';
    if (percent < 80) return 'bg-archon-warning';
    return 'bg-archon-danger';
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-xl">🤖</span>
          Agent Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.name} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">{agent.name}</div>
                  <Badge variant="outline" className="text-xs border-archon-border">{agent.type}</Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={agent.usagePercent} className={`h-1 ${getUsageColor(agent.usagePercent)}`} />
                  <span className="text-xs text-muted-foreground">{agent.usagePercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
