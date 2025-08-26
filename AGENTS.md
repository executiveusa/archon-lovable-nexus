---
schema: "archonx/agent-spec.v1"
patch: "005_MOTIA_WORKFLOWS"
updated: "2025-08-26"
project: "Archon X — 10-Repo Integration"
services_index:
  plutoprint:
    kind: "pdf.render"
    stack: ["python","fastapi","fastapi-mcp"]
    endpoints: ["/print","/healthz"]
    mcp_tool: "reports.print"
  parlant:
    kind: "policy.layer"
    stack: ["python"]
    guidelines: "services/parlant/parlant/guidelines.yaml"
    journeys: "services/parlant/parlant/journeys.yaml"
  ops:
    kind: "ops.portal"
    stack: ["nginx","reverse-proxy","budibase"]
    mount_path: "/ops"
    upstream_env: "BUDIBASE_UPSTREAM"
    sso_placeholders:
      oidc: ["OIDC_CLIENT_ID","OIDC_CLIENT_SECRET","OIDC_ISSUER","OIDC_REDIRECT_URI"]
  motia:
    kind: "workflow.engine"
    stack: ["python","fastapi"]
    endpoints: ["/workflows/run","/workflows/{id}","/healthz"]
    workflow_dir: "services/motia/workflows"
    mcp_tool: "workflows.run"
mcp_tools:
  - id: "reports.print"
    service: "plutoprint"
    schema:
      input:
        type: "object"
        required: ["html"]
        properties:
          html: {type: "string", description: "Raw HTML content to render"}
          filename: {type: "string"}
          meta: {type: "object"}
      output:
        type: "object"
        properties:
          jobId: {type: "string"}
          pdfUrl: {type: "string"}
          sha256: {type: "string"}
  - id: "policy.evaluate"
    service: "parlant"
    schema:
      input:
        type: "object"
        required: ["messages"]
        properties:
          messages:
            type: "array"
            items: {type: "object"}
          journeyContext:
            type: "object"
      output:
        type: "object"
        properties:
          triggers: {type: "array", items: {type: "string"}}
          journey_state: {type: "string"}
  - id: "workflows.run"
    service: "motia"
    schema:
      input:
        type: "object"
        required: ["workflow_id"]
        properties:
          workflow_id: {type: "string"}
          params:
            type: "object"
            additionalProperties: true
      output:
        type: "object"
        properties:
          workflow_id: {type: "string"}
          run_id: {type: "string"}
          status: {type: "string"}
          outputs: {type: "object"}
rituals:
  development:
    - "Run scripts/validate_agents.py before commit."
    - "Each new MCP tool appended to mcp/registry.json AND mirrored here."
  testing:
    - "pytest -q"
    - "pnpm playwright test"
  accessibility:
    - "Respect prefers-reduced-motion; add aria-labels for voice actions."
test_matrix:
  unit:
    - "PDF hash presence"
    - "Policy rule triggers"
    - "Workflow loads & steps ordered"
  e2e:
    - "voice-to-pdf smoke (Playwright)"
    - "ops portal proxy health"
    - "html_to_pdf workflow run"
  security:
    - "Bearer token required on /print (future patch)"
ci_gates:
  - "schema-validate-agents"
  - "pytest"
  - "playwright-smoke"
  - "policy-audit-no-sev1"
versioning:
  rockabye:
    reversible: true
    strategy: "Additive patches; no edits to existing core until stable."
---
# Archon-X Agent & Tool Specification

(Updated by patch 005 to include motia workflow engine & workflows.run MCP tool.)

## New Service: Motia Workflow Engine
Loads declarative YAML workflows and executes steps (stub execution). Sample `html_to_pdf` pipeline calls PlutoPrint.

## MCP Tools
Added `workflows.run` for orchestrating a named workflow.

(Other sections unchanged; see previous patch notes.)