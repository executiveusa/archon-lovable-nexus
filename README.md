# SkipAgentX

**Purpose**: Automate grant discovery and submission for nonprofits using a modular AI agent stack.

## Tech Stack
- **Frontend**: React + Tailwind (deployed to Vercel)
- **Backend**: Node.js + Puppeteer + OpenHands (deployed to Railway)
- **Database**: MongoDB (Railway)
- **Orchestration**: n8n webhook controller

## Agent Modules
- **MetaAgentSystem** – unified agent interface
- **ResearchAssistant** – gathers and analyzes grant data
- **VideoStudio** – generates outreach videos

```text
Frontend (Vercel) -> n8n webhook -> Backend (Railway) -> MongoDB

           +------------+
           |  Mobile UI |
           +-----+------+
                 |
                 v
           +------------+
           |   Vercel   |
           +-----+------+
                 |
                 v
           +------------+      +-----------+
           |  n8n SOP   |----->|  Railway  |
           +------------+      +-----------+
                                     |
                                     v
                                 MongoDB
```

## MCP
This project operates under MCP ID `SKIPAGENTX_VAPS_001`.

See `PATCHES.md` for a history of architectural changes.
