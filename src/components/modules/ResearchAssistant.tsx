
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ResearchAssistant() {
  return (
    <Card className="glass-card border-archon-primary/20 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          Research Assistant
        </CardTitle>
        <CardDescription>
          Ingest and analyze content across multiple modalities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text">
          <TabsList className="mb-4">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <div>
              <div className="mb-2 text-sm font-medium">Research Query</div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your research query..." 
                  className="border-archon-border bg-archon-bg" 
                />
                <Button>Search</Button>
              </div>
            </div>
            
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[200px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">📝</div>
                <div>Enter a query to begin research</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="image">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">🖼️</div>
                <div>Drop image here or click to upload</div>
                <div className="text-xs mt-2">Supports JPG, PNG, WebP</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pdf">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">📄</div>
                <div>Drop PDF here or click to upload</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="voice">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Button variant="outline" size="lg" className="rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">🎤</span>
                </Button>
                <div className="text-xs mt-4 text-muted-foreground">Press to record voice input</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">🎬</div>
                <div>Drop video here or click to upload</div>
                <div className="text-xs mt-2">Supports MP4, WebM</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-archon-border bg-archon-card flex justify-between p-4">
        <div className="text-xs text-muted-foreground">Agent: Gemini 2.5 Pro</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Help</Button>
          <Button size="sm">Analyze</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
