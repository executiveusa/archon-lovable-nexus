
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";

interface NavItem {
  name: string;
  path: string;
  icon: string;
  status?: 'active' | 'inactive' | 'warning';
}

const coreModules: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: '📊', status: 'active' },
  { name: 'Meta-Agent System', path: '/agents', icon: '🤖', status: 'active' },
  { name: 'Research Assistant', path: '/research', icon: '🔍', status: 'active' },
  { name: 'Video Studio', path: '/video', icon: '🎬', status: 'inactive' },
  { name: 'Lead Generation', path: '/leads', icon: '📈', status: 'inactive' },
  { name: 'XR Bridge', path: '/xr', icon: '👓', status: 'warning' },
];

const systemModules: NavItem[] = [
  { name: 'MCP Server', path: '/mcp', icon: '🧠', status: 'active' },
  { name: 'Docker Stack', path: '/docker', icon: '🐳', status: 'inactive' },
  { name: 'Security', path: '/security', icon: '🔒', status: 'active' },
];

export function MainSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex justify-center p-4">
          <div className="font-mono text-xl font-bold text-archon-primary tracking-wider">
            SkipAgentX<span className="text-archon-accent">_</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {coreModules.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                      <StatusDot status={item.status} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemModules.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                      <StatusDot status={item.status} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">v1.0.0</span>
          <span className="text-xs text-muted-foreground">Offline Mode</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function StatusDot({ status }: { status?: 'active' | 'inactive' | 'warning' }) {
  if (!status) return null;
  
  const colors = {
    active: 'bg-archon-success',
    inactive: 'bg-muted',
    warning: 'bg-archon-warning'
  };
  
  return (
    <div className="ml-auto">
      <div className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
    </div>
  );
}
