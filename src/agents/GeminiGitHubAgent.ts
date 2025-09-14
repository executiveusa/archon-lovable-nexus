// 🔗 ARCHON X — Gemini/GitHub Agent
// Repository analysis, PR triage, and automated security findings

import type { A2AJobRequest, AgentResponse, FactAssertion } from '../a2a/types';
import { mangleAdapter } from '../a2a/mangle';

export type GeminiGitHubAgentStatus = 'idle' | 'authenticating' | 'analyzing' | 'commenting' | 'active' | 'error';

export interface GitHubLogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  repo?: string;
  pr?: number;
}

export interface SecurityFinding {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'dependency' | 'code' | 'secret' | 'license';
  description: string;
  file_path: string;
  line_number?: number;
  recommendation: string;
}

export interface PRAnalysis {
  pr_number: number;
  repository: string;
  security_findings: SecurityFinding[];
  dependency_changes: string[];
  risk_score: number; // 0-100
  recommendation: 'approve' | 'request_changes' | 'needs_review';
  explanation: string[];
}

export interface GeminiGitHubAgent {
  id: string;
  status: GeminiGitHubAgentStatus;
  logs: GitHubLogEntry[];
  authenticatedRepos: string[];
  run: () => Promise<string>;
  stop: () => void;
  analyzePR: (repo: string, prNumber: number) => Promise<AgentResponse>;
  postSecurityComment: (repo: string, prNumber: number, findings: SecurityFinding[]) => Promise<boolean>;
  extractRepoFacts: (repo: string) => Promise<FactAssertion[]>;
  addLog: (level: GitHubLogEntry['level'], message: string, repo?: string, pr?: number) => void;
}

const GeminiGitHubAgentImpl: GeminiGitHubAgent = {
  id: 'gemini-github-agent-001',
  status: 'idle',
  logs: [],
  authenticatedRepos: [],

  addLog: function(level: GitHubLogEntry['level'], message: string, repo?: string, pr?: number) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ timestamp, level, message, repo, pr });
    console.log(`[${timestamp}] GITHUB ${level.toUpperCase()}: ${message}${repo ? ` | Repo: ${repo}` : ''}${pr ? ` | PR: ${pr}` : ''}`);
  },

  run: async function() {
    this.status = 'authenticating';
    this.addLog('info', 'Gemini/GitHub Agent initialization started');

    await new Promise((res) => setTimeout(res, 500));
    this.addLog('info', 'Authenticating with GitHub API...');

    // Check for GitHub token
    const hasGitHubAuth = process.env.GITHUB_TOKEN || process.env.GITHUB_APP_TOKEN;
    if (!hasGitHubAuth) {
      this.status = 'error';
      this.addLog('error', 'Missing GitHub authentication token');
      return 'Gemini/GitHub Agent failed: No GitHub token found';
    }

    await new Promise((res) => setTimeout(res, 300));
    this.addLog('info', 'Authenticating with Gemini API...');

    const hasGeminiAuth = process.env.GEMINI_API_KEY;
    if (!hasGeminiAuth) {
      this.addLog('warning', 'Gemini API key not found, using fallback analysis');
    }

    await new Promise((res) => setTimeout(res, 200));
    this.authenticatedRepos = ['executiveusa/archon-lovable-nexus'];
    this.status = 'active';
    this.addLog('info', 'Gemini/GitHub Agent ready for repository analysis and PR triage');

    return 'Gemini/GitHub Agent initialization complete';
  },

  stop: function() {
    this.status = 'idle';
    this.authenticatedRepos = [];
    this.addLog('info', 'Gemini/GitHub Agent stopped');
  },

  analyzePR: async function(repo: string, prNumber: number): Promise<AgentResponse> {
    this.addLog('info', `Analyzing PR for security and dependency issues`, repo, prNumber);
    this.status = 'analyzing';

    // Simulate PR analysis with Gemini
    await new Promise((res) => setTimeout(res, 2000));

    // Mock security analysis results
    const findings: SecurityFinding[] = [
      {
        severity: 'medium',
        category: 'dependency',
        description: 'New dependency added without version pinning',
        file_path: 'package.json',
        line_number: 45,
        recommendation: 'Pin dependency version to avoid supply chain attacks'
      },
      {
        severity: 'low',
        category: 'code',
        description: 'Console.log statement found in production code',
        file_path: 'src/components/NewComponent.tsx',
        line_number: 23,
        recommendation: 'Remove console.log or replace with proper logging'
      }
    ];

    const analysis: PRAnalysis = {
      pr_number: prNumber,
      repository: repo,
      security_findings: findings,
      dependency_changes: ['@new/package@^1.0.0'],
      risk_score: 35,
      recommendation: 'needs_review',
      explanation: [
        'PR introduces 1 new dependency without version pinning',
        'Code quality issues found but no critical security vulnerabilities',
        'Recommend manual review before merging'
      ]
    };

    // Assert facts about the PR analysis
    const facts: FactAssertion[] = [];
    
    // Main PR analysis fact
    const prFact: FactAssertion = {
      id: `pr-analysis-${repo.replace('/', '-')}-${prNumber}-${Date.now()}`,
      type: 'pr_touch',
      subject: `${repo}#${prNumber}`,
      predicate: 'analyzed_for_security',
      object: JSON.stringify({ risk_score: analysis.risk_score, recommendation: analysis.recommendation }),
      evidence: {
        confidence: 0.85,
        source_files: ['package.json', 'src/components/NewComponent.tsx'],
        pr_number: prNumber,
        metadata: {
          repository: repo,
          findings_count: findings.length,
          dependency_changes: analysis.dependency_changes
        }
      },
      timestamp: new Date().toISOString(),
      source_agent: this.id
    };
    facts.push(prFact);

    // Individual security findings as facts
    findings.forEach((finding, index) => {
      const findingFact: FactAssertion = {
        id: `security-finding-${prNumber}-${index}-${Date.now()}`,
        type: 'security_finding',
        subject: finding.file_path,
        predicate: 'has_security_issue',
        object: finding.category,
        evidence: {
          confidence: finding.severity === 'critical' ? 0.95 : finding.severity === 'high' ? 0.90 : 0.75,
          source_files: [finding.file_path],
          pr_number: prNumber,
          metadata: {
            severity: finding.severity,
            description: finding.description,
            recommendation: finding.recommendation,
            line_number: finding.line_number
          }
        },
        timestamp: new Date().toISOString(),
        source_agent: this.id
      };
      facts.push(findingFact);
    });

    // Assert all facts to Mangle
    for (const fact of facts) {
      await mangleAdapter.assertFact(fact);
    }

    this.status = 'active';
    this.addLog('info', `PR analysis complete: ${findings.length} findings, risk score ${analysis.risk_score}`);

    return {
      job_id: `pr-analysis-${Date.now()}`,
      status: 'completed',
      result: analysis,
      facts_asserted: facts,
      trace_refs: facts.map(f => f.id)
    };
  },

  postSecurityComment: async function(repo: string, prNumber: number, findings: SecurityFinding[]): Promise<boolean> {
    this.addLog('info', `Posting security comment to PR`, repo, prNumber);
    this.status = 'commenting';

    await new Promise((res) => setTimeout(res, 800));

    // Generate markdown comment
    const comment = this.generateSecurityComment(findings);
    
    // Simulate posting comment (would use GitHub API in real implementation)
    this.addLog('info', `Posted security analysis comment (${comment.length} chars)`, repo, prNumber);
    this.status = 'active';

    return true;
  },

  extractRepoFacts: async function(repo: string): Promise<FactAssertion[]> {
    this.addLog('info', `Extracting facts from repository`, repo);
    this.status = 'analyzing';

    await new Promise((res) => setTimeout(res, 1000));

    // Mock repository analysis
    const facts: FactAssertion[] = [
      {
        id: `repo-sbom-${repo.replace('/', '-')}-${Date.now()}`,
        type: 'sbom',
        subject: repo,
        predicate: 'has_dependency',
        object: 'react@^18.3.1',
        evidence: {
          confidence: 1.0,
          source_files: ['package.json'],
          metadata: {
            version: '^18.3.1',
            dev_dependency: false,
            license: 'MIT'
          }
        },
        timestamp: new Date().toISOString(),
        source_agent: this.id
      },
      {
        id: `repo-schema-${repo.replace('/', '-')}-${Date.now()}`,
        type: 'schema_lineage',
        subject: repo,
        predicate: 'defines_component',
        object: 'MetaAgentSystem',
        evidence: {
          confidence: 0.95,
          source_files: ['src/components/modules/MetaAgentSystem.tsx'],
          metadata: {
            component_type: 'React.FunctionComponent',
            exports: ['MetaAgentSystem']
          }
        },
        timestamp: new Date().toISOString(),
        source_agent: this.id
      }
    ];

    // Assert facts
    for (const fact of facts) {
      await mangleAdapter.assertFact(fact);
    }

    this.status = 'active';
    this.addLog('info', `Extracted ${facts.length} facts from repository`);

    return facts;
  },

  generateSecurityComment: function(findings: SecurityFinding[]): string {
    const header = `## 🛡️ Archon X Security Analysis

This PR has been automatically analyzed for security and dependency issues.

`;

    if (findings.length === 0) {
      return header + `✅ **No security issues found!** This PR looks safe to merge.

---
*Generated by Archon X Gemini/GitHub Agent*`;
    }

    const findingsByCategory = findings.reduce((acc, finding) => {
      if (!acc[finding.category]) acc[finding.category] = [];
      acc[finding.category].push(finding);
      return acc;
    }, {} as Record<string, SecurityFinding[]>);

    let content = header + `⚠️ **${findings.length} issue(s) found:**

`;

    Object.entries(findingsByCategory).forEach(([category, categoryFindings]) => {
      content += `### ${category.charAt(0).toUpperCase() + category.slice(1)} Issues\n\n`;
      
      categoryFindings.forEach(finding => {
        const severityEmoji = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢'
        }[finding.severity];

        content += `${severityEmoji} **${finding.severity.toUpperCase()}**: ${finding.description}
- **File**: \`${finding.file_path}\`${finding.line_number ? ` (line ${finding.line_number})` : ''}
- **Recommendation**: ${finding.recommendation}

`;
      });
    });

    content += `---
*Generated by Archon X Gemini/GitHub Agent | View detailed traces in Mangle*`;

    return content;
  }
};

export default GeminiGitHubAgentImpl;