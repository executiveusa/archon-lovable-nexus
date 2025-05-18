
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VideoStudio() {
  return (
    <Card className="glass-card border-archon-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          Video Studio
        </CardTitle>
        <CardDescription>
          ComfyUI enhanced video generation pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meme">
          <TabsList className="mb-4">
            <TabsTrigger value="meme">Meme Maker</TabsTrigger>
            <TabsTrigger value="explainer">Explainer</TabsTrigger>
            <TabsTrigger value="music">Music Visualizer</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="meme" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 text-sm font-medium">Template</div>
                <Select>
                  <SelectTrigger className="border-archon-border bg-archon-bg">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drake">Drake Hotline Bling</SelectItem>
                    <SelectItem value="distracted">Distracted Boyfriend</SelectItem>
                    <SelectItem value="butterfly">Is This a Pigeon</SelectItem>
                    <SelectItem value="twobuttons">Two Buttons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Style</div>
                <Select>
                  <SelectTrigger className="border-archon-border bg-archon-bg">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="vaporwave">Vaporwave</SelectItem>
                    <SelectItem value="pixel">Pixel Art</SelectItem>
                    <SelectItem value="neon">Neon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">🖼️</div>
                <div>Select a template to preview</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="explainer">
            <div className="space-y-4">
              <div>
                <div className="mb-2 text-sm font-medium">Topic</div>
                <input 
                  className="w-full p-2 border border-archon-border rounded bg-archon-bg"
                  placeholder="Enter topic for explanation"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 text-sm font-medium">Visual Style</div>
                  <Select>
                    <SelectTrigger className="border-archon-border bg-archon-bg">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="animation">2D Animation</SelectItem>
                      <SelectItem value="infographic">Infographic</SelectItem>
                      <SelectItem value="whiteboard">Whiteboard</SelectItem>
                      <SelectItem value="futuristic">Futuristic UI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium">Duration</div>
                  <Select>
                    <SelectTrigger className="border-archon-border bg-archon-bg">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (30s)</SelectItem>
                      <SelectItem value="medium">Medium (1min)</SelectItem>
                      <SelectItem value="long">Long (2min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[240px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-2xl mb-2">🎞️</div>
                  <div>Enter a topic to generate explainer</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="music">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex flex-col items-center justify-center">
              <div className="text-center text-muted-foreground mb-4">
                <div className="text-2xl mb-2">🎵</div>
                <div>Drop audio file or click to upload</div>
                <div className="text-xs mt-2">Supports MP3, WAV</div>
              </div>
              <Button variant="outline">Upload Audio</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="p-4 border border-archon-border rounded-md bg-archon-card min-h-[300px] flex flex-col items-center justify-center">
              <div className="text-center text-muted-foreground mb-4">
                <div className="text-2xl mb-2">🎨</div>
                <div>Custom node editor</div>
                <div className="text-xs mt-2">ComfyUI interface</div>
              </div>
              <Button>Open Node Editor</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-archon-border bg-archon-card flex justify-between p-4">
        <div className="flex items-center">
          <span className="text-xs text-archon-secondary">Help Mode:</span>
          <Button variant="ghost" size="sm" className="text-xs">
            <span className="mr-1">ON</span> 👶
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Preview</Button>
          <Button size="sm">Generate</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
