// 🔬 ARCHON X — A2A → Mangle Adapter
// Communication layer between A2A Core and Mangle service

import type { 
  FactAssertion, 
  MangleQuery, 
  MangleTrace, 
  A2AJobRequest, 
  AgentResponse 
} from './types';

export class MangleAdapter {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = 'http://localhost:8080', timeout: number = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Assert a structured fact into Mangle knowledge base
   */
  async assertFact(fact: FactAssertion): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.request('POST', '/v1/facts', fact);
      return { success: response.ok };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Query facts and generate traces with explanations
   */
  async queryFacts(query: MangleQuery): Promise<MangleTrace | null> {
    try {
      const startTime = Date.now();
      const response = await this.request('POST', '/v1/query', query);
      
      if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      const latency_ms = Date.now() - startTime;
      
      return {
        ...result,
        latency_ms,
        cached: response.headers.get('X-Cache-Status') === 'HIT'
      };
    } catch (error) {
      console.error('Mangle query failed:', error);
      return null;
    }
  }

  /**
   * Execute A2A job through appropriate agent
   */
  async executeA2AJob(job: A2AJobRequest): Promise<AgentResponse> {
    const response = await this.request('POST', '/v1/agents/execute', job);
    
    if (!response.ok) {
      throw new Error(`A2A job execution failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Get trace explanation for audit purposes
   */
  async explainTrace(traceId: string): Promise<string[]> {
    try {
      const response = await this.request('GET', `/v1/traces/${traceId}/explain`);
      const result = await response.json();
      return result.explanation || [];
    } catch (error) {
      console.error('Failed to get trace explanation:', error);
      return ['Explanation unavailable'];
    }
  }

  /**
   * Health check for Mangle service
   */
  async healthCheck(): Promise<{ healthy: boolean; latency_ms: number }> {
    const startTime = Date.now();
    try {
      const response = await this.request('GET', '/health');
      const latency_ms = Date.now() - startTime;
      return { healthy: response.ok, latency_ms };
    } catch {
      return { healthy: false, latency_ms: Date.now() - startTime };
    }
  }

  private async request(method: string, path: string, body?: unknown): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Archon-X-A2A/1.0'
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

// Singleton instance
export const mangleAdapter = new MangleAdapter();