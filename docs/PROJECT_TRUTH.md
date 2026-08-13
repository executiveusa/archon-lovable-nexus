# Project Truth — Yappyverse Frontend

Status: **KEEPER**

## Canonical role

This repository is a public-facing frontend for **Yappyverse**. It is not the canonical home of the Yappyverse character/media factory and it is not a standalone Archon/SkipAgentX product.

The canonical Yappyverse character/media factory is:

- `executiveusa/YAPPYVERSE-FACTORY`
- Production target: `https://yappyverse-factory.vercel.app`

This repository is the visual/public experience layer that should present the Yappyverse world, characters, stories, systems, and selected proof from that factory.

## Current truth discovered during recon

- The Lovable project ID is `d5591e0c-9985-43b7-8269-a0cf380d7941`.
- Lovable published URL: `https://archon-lovable-nexus.lovable.app`.
- GitHub repository: `executiveusa/archon-lovable-nexus`.
- The latest Lovable-origin commit in GitHub contains an `X-Lovable-Edit-ID`, proving the Lovable ↔ GitHub linkage.
- The current app is Vite + React + TypeScript + Tailwind/shadcn, not Next.js.
- The current public `/` route is a visual landing page; `/console` and `/agents` are internal-style dashboard routes.
- Current brand copy still includes stale `SkipAgentX` / Archon Nexus material and must not be treated as product truth.

## Product classification

Destination: **Website**

Reason: public discovery, visual world-building, character/story presentation, brand trust, portfolio proof, publishing and conversion are core to the value. Agent/tool capabilities may be exposed where useful, but this frontend should not become a generic SaaS dashboard.

## Design direction

Public presentation must follow the COLLINS-Level Website Design Protocol:

- strategy before styling;
- proof before claims;
- content before containers;
- distinction before decoration;
- editorial/case-study presentation over generic SaaS patterns;
- one governing creative idea;
- real Yappyverse assets and characters over generic AI imagery;
- usability, responsive behavior, accessibility and independent verification are release gates.

The UI is part of the product and part of the proof.

## Relationship to YAPPYVERSE-FACTORY

`YAPPYVERSE-FACTORY` owns the character/media production pipeline and canonical character registry. This frontend should consume or present verified outputs from that system without duplicating the factory's canonical operational state.

Current registry includes characters such as Pauli, The Chief, Uncle Reginald, Viral Vikki, Vuk, Frankenstack, Darya the Punisher, Hexona, Jezz, Mustang Maxx, Bambú Baggins, Vontai Banks, Zorito, Cosmos, Malecon, Senior Rudy, Jorge, The Man in the Red Hat, Fredo, La Silueta, Louis P, Poo-Racho, Wall-E, VOA and The Key.

## Phase plan

1. Truth / baseline — establish this document, prove mappings, preserve rollback.
2. Strategy / content architecture — define audience, purpose, narrative, conversion and case-study structure.
3. Creative territories / wireframe — produce materially different design directions and select one.
4. Verified slice — rebuild the public landing journey first and verify responsive/accessibility behavior.
5. Yappyverse integration — connect real character/world content and verified factory outputs without duplicating canonical state.
6. Full frontend / editorial system — complete public pages and reusable visual language.
7. Verification / deployment — build, lint, browser QA, accessibility, deployment and rollback evidence.
8. Portfolio / monetization — turn the finished work into a studio case study and faceless content source.

## Guardrails

- Do not restore stale Archon/SkipAgentX positioning as current product truth.
- Do not copy COLLINS' visual style; use the protocol's strategic and craft standards.
- Do not invent character facts or project metrics.
- Do not make Yappyverse Factory operational state canonical in this frontend.
- Do not delete legacy routes/assets until their value and replacement path are verified.
- GitHub is canonical source code.
- `YAPPYVERSE-FACTORY` remains canonical for the factory pipeline and character registry.
