
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: boolean;
  backend: string;
  description: string;
  features: string[];
}

export function MetaAgentSystem() {
  const agents: Agent[] = [
    {
      id: "codex",
      name: "Codex",
      type: "Development",
      status: true,
      backend: "Ollama (Local)",
      description: "Code generation and analysis agent",
      features: ["Code completion", "Refactoring", "Documentation", "Debugging"]
    },
    {
      id: "venice",
      name: "Venice",
      type: "Creative",
      status: true,
      backend: "Ollama (Local)",
      description: "Creative content generation agent",
      features: ["Copywriting", "Storytelling", "Marketing", "Content strategy"]
    },
    {
      id: "gemini",
      name: "Gemini",
      type: "Multimodal",
      status: false,
      backend: "Google (Cloud)",
      description: "Advanced multimodal understanding agent",
      features: ["Image analysis", "Video understanding", "Voice transcription", "XR integration"]
    },
    {
      id: "researcher",
      name: "Researcher",
      type: "Knowledge",
      status: true,
      backend: "Ollama (Local)",
      description: "Research and knowledge synthesis agent",
      features: ["Academic search", "Paper analysis", "Knowledge synthesis", "Citation management"]
    },
    {
      id: "bigquery",
      name: "BigQuery",
      type: "Analytics",
      status: true,
      backend: "Google Cloud",
      description: "Natural language to BigQuery translation and execution",
      features: ["SQL generation", "Data analysis", "Natural language queries", "Fact assertion"]
    },
    {
      id: "notebook",
      name: "Notebook",
      type: "Analytics",
      status: true,
      backend: "Google Cloud",
      description: "AI-assisted Jupyter notebook generation and execution",
      features: ["Code generation", "Data analysis", "Visualization", "ML workflows"]
    },
    {
      id: "looker",
      name: "Looker",
      type: "Analytics",
      status: true,
      backend: "Google Cloud",
      description: "Conversational analytics and dashboard generation",
      features: ["Dashboard creation", "Natural language queries", "Visualization", "Business intelligence"]
    },
    {
      id: "db-migration",
      name: "DB Migration",
      type: "Infrastructure",
      status: true,
      backend: "Google Cloud",
      description: "Safe database migration planning and execution",
      features: ["Migration planning", "Risk assessment", "Rollback safety", "Mangle validation"]
    },
    {
      id: "gemini-github",
      name: "Gemini GitHub",
      type: "Security",
      status: true,
      backend: "Google Cloud",
      description: "Repository analysis and automated PR security triage",
      features: ["PR analysis", "Security scanning", "SBOM generation", "Automated comments"]
    }
  ];

  return (
    <Card className="glass-card border-archon-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          Meta-Agent System
        </CardTitle>
        <CardDescription>
          Unified agent interface with sandboxed runtimes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agents">
          <TabsList className="mb-4">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents">
            <div className="space-y-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-archon-card border-archon-border">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {agent.name}
                          <Badge variant="outline" className="ml-2">
                            {agent.type}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {agent.backend}
                        </CardDescription>
                      </div>
                      <Switch checked={agent.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 pb-2">
                    <p className="text-sm">{agent.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {agent.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-archon-primary/10">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-2 flex justify-end gap-2">
                    <Button variant="ghost" size="sm">Config</Button>
                    <Button variant="outline" size="sm">Test</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sandbox">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">🔒</div>
                <div>Sandboxed runtime environment</div>
                <div className="text-xs mt-2">All agents are containerized and isolated</div>
                <Button className="mt-4" variant="outline" size="sm">
                  View Sandbox Config
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card h-[300px] overflow-y-auto font-mono text-xs">
              <div className="text-muted-foreground">[10:42:15] Agent router initialized</div>
              <div className="text-archon-primary">[10:42:16] Codex agent loaded</div>
              <div className="text-archon-primary">[10:42:17] Venice agent loaded</div>
              <div className="text-archon-warning">[10:42:18] Gemini agent waiting for credentials</div>
              <div className="text-archon-primary">[10:42:19] Researcher agent loaded</div>
              <div className="text-muted-foreground">[10:42:20] Sandbox environment initialized</div>
              <div className="text-archon-success">[10:42:21] System ready</div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-4 p-4 border border-archon-border rounded-md bg-archon-card">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Agent Fallback Logic</div>
                  <div className="text-sm text-muted-foreground">Enable automatic fallback between agents</div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Cloud Sync</div>
                  <div className="text-sm text-muted-foreground">Allow cloud connection when local fails</div>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Memory Optimization</div>
                  <div className="text-sm text-muted-foreground">Optimize memory usage for local agents</div>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
