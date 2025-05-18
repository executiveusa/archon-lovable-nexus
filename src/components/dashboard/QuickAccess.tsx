
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActionButton {
  label: string;
  icon: string;
  action: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function QuickAccess() {
  const actions: ActionButton[] = [
    {
      label: "Deploy Stack",
      icon: "🚀",
      action: () => console.log("Deploy stack"),
      variant: "default"
    },
    {
      label: "Toggle Offline",
      icon: "🔌",
      action: () => console.log("Toggle offline mode"),
      variant: "outline" 
    },
    {
      label: "Agents Config",
      icon: "⚙️",
      action: () => console.log("Configure agents"),
      variant: "outline"
    },
    {
      label: "XR Connect",
      icon: "👓",
      action: () => console.log("Connect XR device"),
      variant: "secondary"
    },
  ];
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-xl">⚡</span>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => (
            <Button 
              key={index} 
              variant={action.variant} 
              onClick={action.action}
              className="justify-start text-left"
            >
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
