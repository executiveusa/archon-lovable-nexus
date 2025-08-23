// 🔬 ARCHON X — A2A Core Types for Mangle Integration
// Structured facts, traces, and agent communication interfaces

export interface FactAssertion {
  id: string;
  type: 'sbom' | 'schema_lineage' | 'pr_touch' | 'dependency' | 'security_finding';
  subject: string;
  predicate: string;
  object: string;
  evidence: FactEvidence;
  timestamp: string;
  source_agent: string;
}

export interface FactEvidence {
  confidence: number; // 0-1
  source_files: string[];
  commit_sha?: string;
  pr_number?: number;
  metadata: Record<string, unknown>;
}

export interface MangleTrace {
  query_id: string;
  root_fact: string;
  transitive_deps: FactAssertion[];
  explanation: string[];
  latency_ms: number;
  cached: boolean;
}

export interface MangleQuery {
  fact_pattern: string;
  max_depth: number;
  include_transitive: boolean;
  explain: boolean;
}

export interface A2AJobRequest {
  id: string;
  agent_type: 'bigquery' | 'notebook' | 'looker' | 'db_migration' | 'gemini_github';
  intent: string;
  parameters: Record<string, unknown>;
  user_context: UserContext;
}

export interface UserContext {
  user_id: string;
  oauth_token?: string;
  service_account?: string;
  permissions: string[];
}

export interface AgentResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  facts_asserted: FactAssertion[];
  trace_refs: string[];
}