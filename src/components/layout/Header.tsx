
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export function Header() {
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-archon-border">
      <div className="flex items-center gap-4">
        <ArchonLogo />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-archon-primary">
            ARCHON<span className="text-xs ml-1 text-archon-secondary">v1.0</span>
          </h1>
          <p className="text-xs text-muted-foreground">Sovereign AI Control System</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <StatusIndicator status={systemStatus} />
        <Button size="sm" variant="outline" className="border-archon-primary text-archon-primary hover:bg-archon-primary/20">
          Settings
        </Button>
      </div>
    </header>
  );
}

function ArchonLogo() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-archon-primary/20 text-archon-primary border border-archon-primary/50 animate-glow">
      <span className="font-bold text-lg">A</span>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const getStatusColor = () => {
    switch(status) {
      case 'OPERATIONAL': return 'bg-archon-success';
      case 'WARNING': return 'bg-archon-warning';
      case 'CRITICAL': return 'bg-archon-danger';
      default: return 'bg-muted';
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor()}`} />
      <span className="text-xs text-muted-foreground">{status}</span>
    </div>
  );
}
