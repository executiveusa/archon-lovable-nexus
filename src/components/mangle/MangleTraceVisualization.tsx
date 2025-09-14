// 🔬 ARCHON X — Mangle Trace Visualization
// Interactive trace exploration with fact lineage and explanations

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, GitBranch, Clock, Database, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import type { MangleTrace, FactAssertion, MangleQuery } from '../../a2a/types';
import { mangleAdapter } from '../../a2a/mangle';

interface TraceNode {
  id: string;
  fact: FactAssertion;
  children: TraceNode[];
  depth: number;
}

export function MangleTraceVisualization() {
  const [query, setQuery] = useState('');
  const [currentTrace, setCurrentTrace] = useState<MangleTrace | null>(null);
  const [traceNodes, setTraceNodes] = useState<TraceNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFact, setSelectedFact] = useState<FactAssertion | null>(null);
  const [healthStatus, setHealthStatus] = useState<{ healthy: boolean; latency_ms: number } | null>(null);

  useEffect(() => {
    checkMangleHealth();
  }, []);

  const checkMangleHealth = async () => {
    const health = await mangleAdapter.healthCheck();
    setHealthStatus(health);
  };

  const executeQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const mangleQuery: MangleQuery = {
        fact_pattern: query,
        max_depth: 5,
        include_transitive: true,
        explain: true
      };

      const trace = await mangleAdapter.queryFacts(mangleQuery);
      if (trace) {
        setCurrentTrace(trace);
        buildTraceTree(trace);
      }
    } catch (error) {
      console.error('Query failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildTraceTree = (trace: MangleTrace) => {
    // Build hierarchical structure from transitive dependencies
    const nodeMap = new Map<string, TraceNode>();
    
    trace.transitive_deps.forEach(fact => {
      nodeMap.set(fact.id, {
        id: fact.id,
        fact,
        children: [],
        depth: 0
      });
    });

    // Build tree structure (simplified - in real implementation would analyze fact relationships)
    const roots: TraceNode[] = [];
    Array.from(nodeMap.values()).forEach((node, index) => {
      node.depth = Math.floor(index / 3); // Mock depth assignment
      if (node.depth === 0) {
        roots.push(node);
      } else {
        const parent = Array.from(nodeMap.values())[index - 1];
        if (parent && parent.depth < node.depth) {
          parent.children.push(node);
        }
      }
    });

    setTraceNodes(roots);
  };

  const renderTraceNode = (node: TraceNode, index: number) => {
    const indentLevel = node.depth * 20;
    const confidence = Math.round(node.fact.evidence.confidence * 100);
    
    return (
      <div 
        key={node.id}
        className="mb-2"
        style={{ marginLeft: `${indentLevel}px` }}
      >
        <div 
          className="p-3 border border-archon-border rounded-lg bg-archon-card hover:bg-archon-card/80 cursor-pointer transition-colors"
          onClick={() => setSelectedFact(node.fact)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {node.depth > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              <GitBranch className="w-4 h-4 text-archon-primary" />
              <span className="font-mono text-sm">{node.fact.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={node.fact.type === 'security_finding' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {node.fact.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {confidence}%
              </Badge>
            </div>
          </div>
          
          <div className="mt-2 text-sm">
            <span className="font-medium">{node.fact.subject}</span>
            <span className="mx-2 text-muted-foreground">→</span>
            <span className="text-archon-primary">{node.fact.predicate}</span>
            <span className="mx-2 text-muted-foreground">→</span>
            <span>{node.fact.object}</span>
          </div>
          
          <div className="mt-1 text-xs text-muted-foreground">
            {node.fact.source_agent} • {new Date(node.fact.timestamp).toLocaleString()}
          </div>
        </div>
        
        {node.children.map((child, childIndex) => renderTraceNode(child, childIndex))}
      </div>
    );
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return 'text-green-500';
    if (latency < 350) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Health Status */}
      {healthStatus && (
        <Alert className={healthStatus.healthy ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}>
          <Database className="h-4 w-4" />
          <AlertDescription>
            <strong>Mangle Service:</strong> {healthStatus.healthy ? 'Healthy' : 'Unavailable'} | 
            Latency: <span className={getLatencyColor(healthStatus.latency_ms)}>{healthStatus.latency_ms}ms</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Query Interface */}
      <Card className="glass-card border-archon-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Mangle Fact Query
          </CardTitle>
          <CardDescription>
            Query structured facts with transitive dependency resolution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter fact pattern (e.g., 'pr_touch:executiveusa/archon-lovable-nexus')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeQuery()}
              className="flex-1"
            />
            <Button onClick={executeQuery} disabled={isLoading || !healthStatus?.healthy}>
              {isLoading ? 'Querying...' : 'Query'}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Example Patterns:</strong>
              <ul className="mt-1 text-muted-foreground">
                <li>• <code>type:security_finding</code></li>
                <li>• <code>subject:package.json</code></li>
                <li>• <code>agent:gemini-github-agent-001</code></li>
              </ul>
            </div>
            <div>
              <strong>Query Features:</strong>
              <ul className="mt-1 text-muted-foreground">
                <li>• Transitive dependencies</li>
                <li>• Confidence scoring</li>
                <li>• Explanation generation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trace Results */}
      {currentTrace && (
        <Card className="glass-card border-archon-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Trace Results
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={getLatencyColor(currentTrace.latency_ms)}>
                  {currentTrace.latency_ms}ms
                </span>
                {currentTrace.cached && (
                  <Badge variant="outline" className="text-xs">
                    CACHED
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trace" className="w-full">
              <TabsList>
                <TabsTrigger value="trace">Dependency Trace</TabsTrigger>
                <TabsTrigger value="explanation">Explanation</TabsTrigger>
                <TabsTrigger value="facts">Raw Facts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trace" className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  Found {currentTrace.transitive_deps.length} facts in dependency chain
                </div>
                
                {traceNodes.length > 0 ? (
                  <div className="space-y-2">
                    {traceNodes.map((node, index) => renderTraceNode(node, index))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No facts found matching the query pattern
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="explanation" className="space-y-4">
                <div className="space-y-2">
                  {currentTrace.explanation.map((step, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-archon-card border border-archon-border rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-archon-primary/20 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-sm">{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="facts" className="space-y-4">
                <div className="space-y-3">
                  {currentTrace.transitive_deps.map((fact) => (
                    <div 
                      key={fact.id}
                      className="p-4 border border-archon-border rounded-lg bg-archon-card font-mono text-xs"
                    >
                      <pre className="whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(fact, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Selected Fact Details */}
      {selectedFact && (
        <Card className="glass-card border-archon-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Fact Details
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedFact(null)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>ID:</strong> {selectedFact.id}
              </div>
              <div>
                <strong>Type:</strong> {selectedFact.type}
              </div>
              <div>
                <strong>Subject:</strong> {selectedFact.subject}
              </div>
              <div>
                <strong>Predicate:</strong> {selectedFact.predicate}
              </div>
              <div>
                <strong>Object:</strong> {selectedFact.object}
              </div>
              <div>
                <strong>Source Agent:</strong> {selectedFact.source_agent}
              </div>
              <div>
                <strong>Confidence:</strong> {Math.round(selectedFact.evidence.confidence * 100)}%
              </div>
              <div>
                <strong>Timestamp:</strong> {new Date(selectedFact.timestamp).toLocaleString()}
              </div>
            </div>

            {selectedFact.evidence.source_files.length > 0 && (
              <div>
                <strong>Source Files:</strong>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedFact.evidence.source_files.map((file, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {file}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(selectedFact.evidence.metadata).length > 0 && (
              <div>
                <strong>Metadata:</strong>
                <pre className="mt-1 p-2 bg-archon-card border border-archon-border rounded text-xs overflow-x-auto">
                  {JSON.stringify(selectedFact.evidence.metadata, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}