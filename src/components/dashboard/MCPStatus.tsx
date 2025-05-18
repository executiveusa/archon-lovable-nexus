
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface LogEntry {
  timestamp: string;
  level: "info" | "warning" | "error";
  message: string;
}

export function MCPStatus() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Simulating logs in a real application, these would come from an API
  useEffect(() => {
    const sampleLogs: LogEntry[] = [
      { timestamp: "10:42:15", level: "info", message: "MCP Server initialized" },
      { timestamp: "10:42:16", level: "info", message: "Agent router connected" },
      { timestamp: "10:42:18", level: "info", message: "Gemini API authenticated" },
      { timestamp: "10:43:01", level: "warning", message: "XR Bridge waiting for connection" },
      { timestamp: "10:43:22", level: "info", message: "Video Studio pipeline ready" },
      { timestamp: "10:44:05", level: "error", message: "ComfyUI node validation failed" },
      { timestamp: "10:44:30", level: "info", message: "Research Assistant indexing complete" },
      { timestamp: "10:45:11", level: "info", message: "Lead service initialized" },
    ];
    
    setLogs(sampleLogs);
  }, []);
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case "info": return "text-archon-primary";
      case "warning": return "text-archon-warning";
      case "error": return "text-archon-danger";
      default: return "text-muted-foreground";
    }
  };
  
  return (
    <Card className="glass-card h-[400px] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-xl">🧠</span>
          MCP Server Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)] overflow-y-auto scrollbar-hide">
        <div className="space-y-2 font-mono text-xs">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-muted-foreground">[{log.timestamp}]</span>
              <span className={`font-medium ${getLevelColor(log.level)}`}>
                {log.level.toUpperCase()}:
              </span>
              <span>{log.message}</span>
            </div>
          ))}
          <div className="text-archon-primary animate-pulse">▌</div>
        </div>
      </CardContent>
    </Card>
  );
}
