---
schema: "archonx/agent-spec.v1"
patch: "006_UNIVERSAL_AGENTIC_TOOLBOXX"
updated: "2025-08-27"
project: "Archon X — Universal Agentic Platform Integration"
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
  basedash:
    kind: "analytics.natural_language"
    stack: ["react","typescript","chart.js"]
    endpoints: ["/dashboards","/query","/embed","/healthz"]
    features: ["natural_language_queries","auto_chart_generation","real_time_updates"]
    integration: ["motia_workflows","mcp_tools","ops_portal"]
    mcp_tool: "analytics.query"
  rag_universal:
    kind: "ingestion.universal"
    stack: ["python","llamaparse","docling","mistral_ocr"]
    endpoints: ["/ingest","/search","/status","/healthz"]
    file_types: ["pdf","docx","pptx","xlsx","png","jpg","md","txt","csv","json"]
    pipeline: ["parse","chunk","embed","store"]
    vector_db: "pinecone"
    chunk_strategy: "heading_table_aware"
    mcp_tool: "rag.ingest"
  fitness_signals:
    kind: "monetization.beachhead"
    stack: ["javascript","bangle.js","bluetooth_api"]
    endpoints: ["/track","/reports","/insights","/healthz"]
    hardware: ["bangle.js_2","gps","heart_rate","accelerometer"]
    features: ["step_tracking","hr_monitoring","weekly_reports","gamification"]
    integration: ["plutoprint","basedash","stripe"]
    pricing_tier: "premium"
    mcp_tool: "fitness.track"
  llamaindex_ai:
    kind: "ai.orchestration"
    stack: ["python","llamaindex","openai"]
    api_key_env: "LLAMAINDEX_API_KEY"
    project_id: "a5de2515-4769-4b0d-b319-7cc4addb5f01"
    endpoints: ["/query","/embed","/index","/healthz"]
    capabilities: ["document_qa","semantic_search","knowledge_synthesis"]
    mcp_tool: "ai.query"
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
  - id: "analytics.query"
    service: "basedash"
    schema:
      input:
        type: "object"
        required: ["query"]
        properties:
          query: {type: "string", description: "Natural language analytics query"}
          chart_type: {type: "string", enum: ["line","bar","pie","scatter","area"]}
          time_range: {type: "string"}
          filters: {type: "object"}
      output:
        type: "object"
        properties:
          chart_config: {type: "object"}
          data: {type: "array"}
          insights: {type: "array", items: {type: "string"}}
          embed_url: {type: "string"}
  - id: "rag.ingest"
    service: "rag_universal"
    schema:
      input:
        type: "object"
        required: ["content"]
        properties:
          content: {type: "string", description: "File content or URL to ingest"}
          file_type: {type: "string"}
          metadata: {type: "object"}
          chunk_strategy: {type: "string", enum: ["heading","table","semantic"]}
      output:
        type: "object"
        properties:
          document_id: {type: "string"}
          chunks_created: {type: "integer"}
          embedding_model: {type: "string"}
          vector_ids: {type: "array", items: {type: "string"}}
  - id: "fitness.track"
    service: "fitness_signals"
    schema:
      input:
        type: "object"
        required: ["device_data"]
        properties:
          device_data: {type: "object", description: "Bangle.js sensor data"}
          user_id: {type: "string"}
          tracking_type: {type: "string", enum: ["steps","heart_rate","sleep","activity"]}
          duration: {type: "string"}
      output:
        type: "object"
        properties:
          tracking_id: {type: "string"}
          metrics: {type: "object"}
          coaching_insights: {type: "array", items: {type: "string"}}
          report_url: {type: "string"}
  - id: "ai.query"
    service: "llamaindex_ai"
    schema:
      input:
        type: "object"
        required: ["query"]
        properties:
          query: {type: "string", description: "Natural language query"}
          context_docs: {type: "array", items: {type: "string"}}
          response_mode: {type: "string", enum: ["compact","tree_summarize","accumulate"]}
          similarity_top_k: {type: "integer", default: 5}
      output:
        type: "object"
        properties:
          response: {type: "string"}
          source_nodes: {type: "array"}
          confidence_score: {type: "number"}
          tokens_used: {type: "integer"}
rituals:
  development:
    - "Run scripts/validate_agents.py before commit."
    - "Each new MCP tool appended to mcp/registry.json AND mirrored here."
    - "Test LlamaIndex API connectivity with valid key."
    - "Validate Basedash chart generation with sample queries."
  testing:
    - "pytest -q"
    - "pnpm playwright test"
    - "npm run test:fitness-signals"
    - "python scripts/test_rag_pipeline.py"
  accessibility:
    - "Respect prefers-reduced-motion; add aria-labels for voice actions."
    - "Ensure fitness tracking UI supports screen readers."
    - "Voice command integration for analytics queries."
test_matrix:
  unit:
    - "PDF hash presence"
    - "Policy rule triggers"
    - "Workflow loads & steps ordered"
    - "LlamaIndex API key validation"
    - "Basedash query parsing"
    - "RAG chunking strategy accuracy"
    - "Fitness device data validation"
  e2e:
    - "voice-to-pdf smoke (Playwright)"
    - "ops portal proxy health"
    - "html_to_pdf workflow run"
    - "natural-language-to-chart generation"
    - "file-upload-to-vector-db pipeline"
    - "bangle.js-to-weekly-report flow"
    - "agent-to-agent handoff protocol"
  security:
    - "Bearer token required on /print (future patch)"
    - "LlamaIndex API key rotation"
    - "Stripe webhook signature validation"
    - "SSO token validation for ops portal"
  monetization:
    - "Stripe subscription tier enforcement"
    - "Fitness Signals Kit premium features"
    - "Usage tracking per service"
    - "Revenue attribution per agent"
ci_gates:
  - "schema-validate-agents"
  - "pytest"
  - "playwright-smoke"
  - "policy-audit-no-sev1"
  - "llamaindex-connectivity-check"
  - "monetization-tier-validation"
  - "agent-protocol-compatibility"
versioning:
  rockabye:
    reversible: true
    strategy: "Additive patches; no edits to existing core until stable."
  pricing:
    basic: "Core agent functionality, limited analytics queries"
    premium: "Fitness Signals Kit, unlimited queries, advanced RAG"
    enterprise: "Custom models, priority support, dedicated instances"
  regions:
    us_east: "Primary deployment region"
    eu_west: "GDPR-compliant instance"
    nonprofit: "Reduced pricing tier for mission-aligned organizations"
---
# Archon-X Universal Agentic Platform

(Updated by patch 006 to include LlamaIndex AI, Basedash analytics, Universal RAG, Fitness Signals Kit, and agent-to-agent protocol enhancements.)

## New Services Overview

### Basedash Analytics Module
Natural-language analytics engine that translates plain English queries into interactive dashboards. Users can ask "show me monthly revenue growth" and automatically get the appropriate charts with real-time data.

### Universal RAG Ingestion Pipeline
Handles 95+ file types via LlamaParse, IBM's Docling, and Mistral OCR. Converts any document (PDFs, slides, spreadsheets, images) to searchable Markdown chunks with heading/table-aware segmentation.

### Fitness Signals Kit (Monetization Beachhead)
Productized offering using Bangle.js 2 smartwatches with Bluetooth, GPS, heart-rate sensors, and accelerometers. Generates weekly coaching reports via PlutoPrint and gamified dashboards through Basedash.

### Enhanced Agent-to-Agent Protocol
Standardized communication protocol for Abacus AI, Agent Zero, and Crew AI with clear task handoffs, policy checks, and fallback mechanisms.

### LlamaIndex AI Integration
Orchestrates document Q&A, semantic search, and knowledge synthesis using the configured API key and project endpoints.

## MCP Tools Extensions
Added `analytics.query`, `rag.ingest`, `fitness.track`, and `ai.query` for comprehensive multi-modal agent capabilities.

## Monetization Strategy
- **Basic Tier**: Core functionality with limited queries
- **Premium Tier**: Full Fitness Signals Kit, unlimited analytics
- **Enterprise Tier**: Custom models and dedicated instances
- **Nonprofit Tier**: Mission-aligned reduced pricing

## Region-Aware Deployment
- US East (primary), EU West (GDPR), dedicated nonprofit infrastructure

(Previous patch notes: motia workflow engine & workflows.run MCP tool integration.)