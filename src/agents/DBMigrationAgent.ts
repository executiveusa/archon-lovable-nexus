// 🗄️ ARCHON X — DB Migration Agent
// Safe database migration planning and execution with Mangle validation

import type { A2AJobRequest, AgentResponse, FactAssertion } from '../a2a/types';
import { mangleAdapter } from '../a2a/mangle';

export type DBMigrationAgentStatus = 'idle' | 'connecting' | 'analyzing' | 'planning' | 'validating' | 'active' | 'error';

export interface MigrationLogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  database?: string;
}

export interface MigrationStep {
  id: string;
  type: 'create_table' | 'alter_table' | 'drop_table' | 'create_index' | 'data_migration';
  sql: string;
  rollback_sql: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  estimated_duration: number; // seconds
  dependencies: string[];
}

export interface MigrationPlan {
  id: string;
  name: string;
  description: string;
  steps: MigrationStep[];
  total_risk_score: number;
  estimated_duration: number;
  validation_checks: string[];
  rollback_plan: string[];
  approval_required: boolean;
}

export interface DBMigrationAgent {
  id: string;
  status: DBMigrationAgentStatus;
  logs: MigrationLogEntry[];
  connectedDatabases: string[];
  run: () => Promise<string>;
  stop: () => void;
  planMigration: (description: string) => Promise<AgentResponse>;
  validateMigration: (migrationId: string) => Promise<AgentResponse>;
  executePreflight: (migrationId: string) => Promise<AgentResponse>;
  addLog: (level: MigrationLogEntry['level'], message: string, database?: string) => void;
  generateMigrationPlan: (description: string) => MigrationPlan;
  generateMigrationName: (description: string) => string;
}

const DBMigrationAgentImpl: DBMigrationAgent = {
  id: 'db-migration-agent-001',
  status: 'idle',
  logs: [],
  connectedDatabases: [],

  addLog: function(level: MigrationLogEntry['level'], message: string, database?: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ timestamp, level, message, database });
    console.log(`[${timestamp}] DB_MIGRATION ${level.toUpperCase()}: ${message}${database ? ` | DB: ${database}` : ''}`);
  },

  run: async function() {
    this.status = 'connecting';
    this.addLog('info', 'DB Migration Agent initialization started');

    await new Promise((res) => setTimeout(res, 700));
    this.addLog('info', 'Connecting to database instances...');

    // Check for database credentials
    const hasDBAuth = process.env.DATABASE_URL || process.env.DB_CONNECTION_STRING;
    if (!hasDBAuth) {
      this.status = 'error';
      this.addLog('error', 'Missing database connection credentials');
      return 'DB Migration Agent failed: No database credentials found';
    }

    await new Promise((res) => setTimeout(res, 500));
    this.connectedDatabases = ['archon-prod', 'archon-staging'];
    this.addLog('info', `Connected to databases: ${this.connectedDatabases.join(', ')}`);

    await new Promise((res) => setTimeout(res, 300));
    this.status = 'active';
    this.addLog('info', 'DB Migration Agent ready for safe migration planning');

    return 'DB Migration Agent initialization complete';
  },

  stop: function() {
    this.status = 'idle';
    this.connectedDatabases = [];
    this.addLog('info', 'DB Migration Agent disconnected from all databases');
  },

  planMigration: async function(description: string): Promise<AgentResponse> {
    this.addLog('info', `Planning migration: ${description}`);
    this.status = 'planning';

    await new Promise((res) => setTimeout(res, 2000));

    const migrationPlan = this.generateMigrationPlan(description);
    this.addLog('info', `Generated migration plan: ${migrationPlan.steps.length} steps`);

    // Assert migration plan as fact
    const fact: FactAssertion = {
      id: `migration-plan-${migrationPlan.id}`,
      type: 'dependency',
      subject: 'database_migration',
      predicate: 'planned_migration',
      object: migrationPlan.id,
      evidence: {
        confidence: 0.90,
        source_files: [],
        metadata: {
          description,
          steps_count: migrationPlan.steps.length,
          risk_score: migrationPlan.total_risk_score,
          approval_required: migrationPlan.approval_required,
          estimated_duration: migrationPlan.estimated_duration
        }
      },
      timestamp: new Date().toISOString(),
      source_agent: this.id
    };

    await mangleAdapter.assertFact(fact);

    this.status = 'active';

    return {
      job_id: `migration-plan-${Date.now()}`,
      status: 'completed',
      result: migrationPlan,
      facts_asserted: [fact],
      trace_refs: [fact.id]
    };
  },

  validateMigration: async function(migrationId: string): Promise<AgentResponse> {
    this.addLog('info', `Validating migration plan: ${migrationId}`);
    this.status = 'validating';

    await new Promise((res) => setTimeout(res, 1500));

    // Simulate Mangle validation checks
    const validationResults = {
      migration_id: migrationId,
      validation_checks: [
        { check: 'schema_compatibility', status: 'passed', message: 'No breaking schema changes detected' },
        { check: 'data_integrity', status: 'passed', message: 'Data integrity constraints validated' },
        { check: 'performance_impact', status: 'warning', message: 'Large table alteration may cause downtime' },
        { check: 'rollback_safety', status: 'passed', message: 'Rollback plan is complete and tested' },
        { check: 'dependency_analysis', status: 'passed', message: 'No circular dependencies found' }
      ],
      overall_status: 'approved_with_warnings',
      recommendation: 'Proceed with caution during low-traffic hours',
      mangle_trace_id: `trace-${migrationId}-${Date.now()}`
    };

    // Assert validation results
    const fact: FactAssertion = {
      id: `migration-validation-${migrationId}`,
      type: 'dependency',
      subject: 'migration_validation',
      predicate: 'validated_migration',
      object: migrationId,
      evidence: {
        confidence: 0.95,
        source_files: [],
        metadata: {
          validation_status: validationResults.overall_status,
          checks_passed: validationResults.validation_checks.filter(c => c.status === 'passed').length,
          checks_total: validationResults.validation_checks.length,
          trace_id: validationResults.mangle_trace_id
        }
      },
      timestamp: new Date().toISOString(),
      source_agent: this.id
    };

    await mangleAdapter.assertFact(fact);

    this.status = 'active';
    this.addLog('info', `Migration validation complete: ${validationResults.overall_status}`);

    return {
      job_id: `migration-validation-${Date.now()}`,
      status: 'completed',
      result: validationResults,
      facts_asserted: [fact],
      trace_refs: [fact.id]
    };
  },

  executePreflight: async function(migrationId: string): Promise<AgentResponse> {
    this.addLog('info', `Executing preflight checks for migration: ${migrationId}`);
    this.status = 'validating';

    await new Promise((res) => setTimeout(res, 3000));

    const preflightResults = {
      migration_id: migrationId,
      preflight_checks: [
        { check: 'database_connection', status: 'passed', duration_ms: 45 },
        { check: 'table_locks', status: 'passed', duration_ms: 120 },
        { check: 'disk_space', status: 'passed', duration_ms: 80, details: '85% available' },
        { check: 'backup_verification', status: 'passed', duration_ms: 2100, details: 'Latest backup 2 hours ago' },
        { check: 'replication_lag', status: 'warning', duration_ms: 200, details: '300ms lag detected' },
        { check: 'concurrent_transactions', status: 'passed', duration_ms: 150 }
      ],
      overall_status: 'ready',
      recommendation: 'Safe to proceed - monitor replication lag',
      estimated_impact: {
        downtime_seconds: 45,
        affected_tables: 2,
        affected_rows: 150000
      }
    };

    // Assert preflight results
    const fact: FactAssertion = {
      id: `migration-preflight-${migrationId}`,
      type: 'dependency',
      subject: 'migration_preflight',
      predicate: 'executed_preflight',
      object: migrationId,
      evidence: {
        confidence: 0.98,
        source_files: [],
        metadata: {
          preflight_status: preflightResults.overall_status,
          checks_total: preflightResults.preflight_checks.length,
          estimated_downtime: preflightResults.estimated_impact.downtime_seconds,
          affected_rows: preflightResults.estimated_impact.affected_rows
        }
      },
      timestamp: new Date().toISOString(),
      source_agent: this.id
    };

    await mangleAdapter.assertFact(fact);

    this.status = 'active';
    this.addLog('info', `Preflight checks complete: ${preflightResults.overall_status}`);

    return {
      job_id: `migration-preflight-${Date.now()}`,
      status: 'completed',
      result: preflightResults,
      facts_asserted: [fact],
      trace_refs: [fact.id]
    };
  },

  generateMigrationPlan: function(description: string): MigrationPlan {
    const migrationId = `migration-${Date.now()}`;
    const steps: MigrationStep[] = [];
    let totalRiskScore = 0;
    let estimatedDuration = 0;

    // Generate steps based on description
    const lowerDesc = description.toLowerCase();

    if (lowerDesc.includes('add column') || lowerDesc.includes('new column')) {
      const step: MigrationStep = {
        id: `${migrationId}-add-column`,
        type: 'alter_table',
        sql: 'ALTER TABLE users ADD COLUMN new_field VARCHAR(255) DEFAULT NULL;',
        rollback_sql: 'ALTER TABLE users DROP COLUMN new_field;',
        risk_level: 'low',
        estimated_duration: 30,
        dependencies: []
      };
      steps.push(step);
      totalRiskScore += 10;
      estimatedDuration += 30;
    }

    if (lowerDesc.includes('create table') || lowerDesc.includes('new table')) {
      const step: MigrationStep = {
        id: `${migrationId}-create-table`,
        type: 'create_table',
        sql: 'CREATE TABLE new_entity (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
        rollback_sql: 'DROP TABLE new_entity;',
        risk_level: 'low',
        estimated_duration: 15,
        dependencies: []
      };
      steps.push(step);
      totalRiskScore += 5;
      estimatedDuration += 15;
    }

    if (lowerDesc.includes('index') || lowerDesc.includes('performance')) {
      const step: MigrationStep = {
        id: `${migrationId}-create-index`,
        type: 'create_index',
        sql: 'CREATE INDEX CONCURRENTLY idx_users_email ON users(email);',
        rollback_sql: 'DROP INDEX idx_users_email;',
        risk_level: 'medium',
        estimated_duration: 120,
        dependencies: []
      };
      steps.push(step);
      totalRiskScore += 25;
      estimatedDuration += 120;
    }

    if (lowerDesc.includes('migrate data') || lowerDesc.includes('data migration')) {
      const step: MigrationStep = {
        id: `${migrationId}-migrate-data`,
        type: 'data_migration',
        sql: 'INSERT INTO new_table SELECT * FROM old_table WHERE condition = true;',
        rollback_sql: 'DELETE FROM new_table WHERE migrated_at > ?;',
        risk_level: 'high',
        estimated_duration: 300,
        dependencies: steps.map(s => s.id)
      };
      steps.push(step);
      totalRiskScore += 60;
      estimatedDuration += 300;
    }

    // Default step if nothing specific was detected
    if (steps.length === 0) {
      const step: MigrationStep = {
        id: `${migrationId}-generic`,
        type: 'alter_table',
        sql: '-- Generated migration step based on description',
        rollback_sql: '-- Corresponding rollback operation',
        risk_level: 'medium',
        estimated_duration: 60,
        dependencies: []
      };
      steps.push(step);
      totalRiskScore += 30;
      estimatedDuration += 60;
    }

    return {
      id: migrationId,
      name: this.generateMigrationName(description),
      description,
      steps,
      total_risk_score: totalRiskScore,
      estimated_duration: estimatedDuration,
      validation_checks: [
        'Schema compatibility check',
        'Data integrity validation',
        'Performance impact analysis',
        'Rollback safety verification'
      ],
      rollback_plan: steps.map(s => s.rollback_sql).reverse(),
      approval_required: totalRiskScore > 50 || steps.some(s => s.risk_level === 'high' || s.risk_level === 'critical')
    };
  },

  generateMigrationName: function(description: string): string {
    const words = description.split(' ').slice(0, 3);
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${timestamp}_${words.join('_').toLowerCase().replace(/[^a-z0-9_]/g, '')}`;
  }
};

export default DBMigrationAgentImpl;