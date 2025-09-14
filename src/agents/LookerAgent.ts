// 📊 ARCHON X — Looker Agent
// Conversational analytics and dashboard generation

import type { A2AJobRequest, AgentResponse, FactAssertion } from '../a2a/types';
import { mangleAdapter } from '../a2a/mangle';

export type LookerAgentStatus = 'idle' | 'connecting' | 'querying' | 'generating' | 'active' | 'error';

export interface LookerLogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  dashboard?: string;
}

export interface LookerAgent {
  id: string;
  status: LookerAgentStatus;
  logs: LookerLogEntry[];
  connectedInstance?: string;
  run: () => Promise<string>;
  stop: () => void;
  generateDashboard: (prompt: string) => Promise<AgentResponse>;
  executeConversationalQuery: (query: string) => Promise<AgentResponse>;
  addLog: (level: LookerLogEntry['level'], message: string, dashboard?: string) => void;
}

const LookerAgentImpl: LookerAgent = {
  id: 'looker-agent-001',
  status: 'idle',
  logs: [],
  connectedInstance: undefined,

  addLog: function(level: LookerLogEntry['level'], message: string, dashboard?: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ timestamp, level, message, dashboard });
    console.log(`[${timestamp}] LOOKER ${level.toUpperCase()}: ${message}${dashboard ? ` | Dashboard: ${dashboard}` : ''}`);
  },

  run: async function() {
    this.status = 'connecting';
    this.addLog('info', 'Looker Agent initialization started');

    await new Promise((res) => setTimeout(res, 600));
    this.addLog('info', 'Connecting to Looker instance...');

    // Check for Looker credentials
    const hasLookerAuth = process.env.LOOKER_CLIENT_ID && process.env.LOOKER_CLIENT_SECRET;
    if (!hasLookerAuth) {
      this.status = 'error';
      this.addLog('error', 'Missing Looker API credentials');
      return 'Looker Agent failed: No Looker credentials found';
    }

    await new Promise((res) => setTimeout(res, 400));
    this.connectedInstance = process.env.LOOKER_BASE_URL || 'https://archonx.looker.com';
    this.addLog('info', `Connected to Looker instance: ${this.connectedInstance}`);

    await new Promise((res) => setTimeout(res, 300));
    this.status = 'active';
    this.addLog('info', 'Looker Agent ready for conversational analytics');

    return 'Looker Agent initialization complete';
  },

  stop: function() {
    this.status = 'idle';
    this.connectedInstance = undefined;
    this.addLog('info', 'Looker Agent disconnected');
  },

  generateDashboard: async function(prompt: string): Promise<AgentResponse> {
    this.addLog('info', 'Generating dashboard from prompt', prompt);
    this.status = 'generating';

    await new Promise((res) => setTimeout(res, 1500));

    const dashboardId = `dashboard-${Date.now()}`;
    const dashboard = this.createDashboard(prompt);

    this.addLog('info', `Generated dashboard: ${dashboardId}`);

    // Assert fact about dashboard creation
    const fact: FactAssertion = {
      id: `looker-dashboard-${Date.now()}`,
      type: 'dependency',
      subject: 'looker_dashboard',
      predicate: 'created_dashboard',
      object: dashboardId,
      evidence: {
        confidence: 0.88,
        source_files: [],
        metadata: {
          prompt,
          chart_count: dashboard.charts.length,
          instance: this.connectedInstance
        }
      },
      timestamp: new Date().toISOString(),
      source_agent: this.id
    };

    await mangleAdapter.assertFact(fact);

    this.status = 'active';

    return {
      job_id: `looker-dashboard-${Date.now()}`,
      status: 'completed',
      result: {
        dashboard_id: dashboardId,
        dashboard,
        share_url: `${this.connectedInstance}/dashboards/${dashboardId}`,
        embed_url: `${this.connectedInstance}/embed/dashboards/${dashboardId}`
      },
      facts_asserted: [fact],
      trace_refs: [fact.id]
    };
  },

  executeConversationalQuery: async function(query: string): Promise<AgentResponse> {
    this.addLog('info', `Executing conversational query: ${query}`);
    this.status = 'querying';

    await new Promise((res) => setTimeout(res, 1000));

    // Convert natural language to Looker query
    const lookerQuery = this.translateToLookerQL(query);
    const results = await this.executeLookerQuery(lookerQuery);

    // Generate visualization recommendation
    const vizType = this.recommendVisualization(query, results);

    this.addLog('info', `Query executed: ${results.rows.length} rows returned`);

    // Assert query execution fact
    const fact: FactAssertion = {
      id: `looker-query-${Date.now()}`,
      type: 'dependency',
      subject: 'looker_query',
      predicate: 'executed_query',
      object: lookerQuery,
      evidence: {
        confidence: 0.92,
        source_files: [],
        metadata: {
          natural_query: query,
          result_count: results.rows.length,
          viz_type: vizType,
          instance: this.connectedInstance
        }
      },
      timestamp: new Date().toISOString(),
      source_agent: this.id
    };

    await mangleAdapter.assertFact(fact);

    this.status = 'active';

    return {
      job_id: `looker-query-${Date.now()}`,
      status: 'completed',
      result: {
        query: lookerQuery,
        data: results,
        recommended_visualization: vizType,
        chart_config: this.generateChartConfig(vizType, results)
      },
      facts_asserted: [fact],
      trace_refs: [fact.id]
    };
  },

  createDashboard: function(prompt: string) {
    const charts = [];
    const lowerPrompt = prompt.toLowerCase();

    // Generate charts based on prompt content
    if (lowerPrompt.includes('revenue') || lowerPrompt.includes('sales')) {
      charts.push({
        id: 'revenue_chart',
        type: 'line',
        title: 'Revenue Trend',
        query: 'SELECT DATE(created_at) as date, SUM(amount) as revenue FROM orders GROUP BY date ORDER BY date'
      });
    }

    if (lowerPrompt.includes('user') || lowerPrompt.includes('customer')) {
      charts.push({
        id: 'users_chart',
        type: 'bar',
        title: 'User Growth',
        query: 'SELECT DATE_TRUNC("month", created_at) as month, COUNT(*) as users FROM users GROUP BY month'
      });
    }

    if (lowerPrompt.includes('performance') || lowerPrompt.includes('metric')) {
      charts.push({
        id: 'kpi_chart',
        type: 'single_value',
        title: 'Key Metrics',
        query: 'SELECT COUNT(*) as total_users, AVG(session_duration) as avg_session FROM user_sessions'
      });
    }

    // Default chart if no specific content detected
    if (charts.length === 0) {
      charts.push({
        id: 'overview_chart',
        type: 'table',
        title: 'Data Overview',
        query: 'SELECT * FROM summary_stats LIMIT 100'
      });
    }

    return {
      title: this.generateDashboardTitle(prompt),
      description: `Auto-generated dashboard: ${prompt}`,
      charts,
      filters: [
        { name: 'date_range', type: 'date_range', default: 'last_30_days' }
      ],
      created_at: new Date().toISOString()
    };
  },

  translateToLookerQL: function(naturalQuery: string): string {
    const lowerQuery = naturalQuery.toLowerCase();

    if (lowerQuery.includes('top') && lowerQuery.includes('product')) {
      return 'SELECT products.name, SUM(order_items.quantity) as total_sold FROM products JOIN order_items ON products.id = order_items.product_id GROUP BY products.name ORDER BY total_sold DESC LIMIT 10';
    }

    if (lowerQuery.includes('revenue') && lowerQuery.includes('month')) {
      return 'SELECT DATE_TRUNC("month", orders.created_at) as month, SUM(orders.total_amount) as revenue FROM orders GROUP BY month ORDER BY month';
    }

    if (lowerQuery.includes('customer') && lowerQuery.includes('segment')) {
      return 'SELECT customer_segment, COUNT(*) as customer_count, AVG(lifetime_value) as avg_ltv FROM customers GROUP BY customer_segment';
    }

    return `-- Generated from: "${naturalQuery}"\nSELECT * FROM fact_table LIMIT 100`;
  },

  executeLookerQuery: async function(query: string) {
    // Simulate Looker query execution
    await new Promise((res) => setTimeout(res, 500));

    return {
      rows: [
        { column1: 'Value A', column2: 125, column3: '2024-01' },
        { column1: 'Value B', column2: 89, column3: '2024-02' },
        { column1: 'Value C', column2: 234, column3: '2024-03' }
      ],
      columns: [
        { name: 'column1', type: 'string' },
        { name: 'column2', type: 'number' },
        { name: 'column3', type: 'date' }
      ]
    };
  },

  recommendVisualization: function(query: string, results: any): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('trend') || lowerQuery.includes('over time')) return 'line';
    if (lowerQuery.includes('compare') || lowerQuery.includes('by category')) return 'bar';
    if (lowerQuery.includes('distribution')) return 'histogram';
    if (lowerQuery.includes('relationship') || lowerQuery.includes('correlation')) return 'scatter';
    if (results.rows.length === 1) return 'single_value';

    return 'table';
  },

  generateChartConfig: function(vizType: string, results: any) {
    return {
      type: vizType,
      x_axis: results.columns[0]?.name || 'x',
      y_axis: results.columns[1]?.name || 'y',
      color_by: results.columns.length > 2 ? results.columns[2].name : null,
      aggregation: 'sum'
    };
  },

  generateDashboardTitle: function(prompt: string): string {
    const words = prompt.split(' ').slice(0, 4);
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') + ' Dashboard';
  }
};

export default LookerAgentImpl;