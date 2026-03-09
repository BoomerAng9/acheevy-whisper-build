# Chicken Hawk Blueprint (OpenClaw-class secure replica)

## Goal
Build a complete operator platform (dashboard + command center + workflow studio + run monitor) with stronger security and governance.

## Architecture
- Frontend: React command center with real-time event streams.
- Backend API: typed orchestration API + policy engine + billing + account services.
- Runtime: LangGraph/PersonaPlex orchestration workers.
- Event bus: queue for agent tasks, retries, dead-letter handling.
- Data plane: relational DB for tenants/tasks/runs + object store for artifacts.
- Observability: run timeline, trace spans, token/cost metrics, SLA alerts.

## Required surfaces
1. Command center (Circuit Box): connectors, keys, breakers, health checks.
2. Agent workspace: roles, state transitions, collaboration map.
3. Workflow studio: create/edit agent flows and routing rules.
4. Customer funnel: landing, needs analysis, checkout, onboarding.
5. Security console: policies, incidents, audits, key rotation, access reviews.

## Security hardening vs baseline replicas
- Backend-only secret handling with vault and KMS wrapping.
- Signed internal events and tamper-evident audit chains.
- Provider allow-lists and egress policy controls.
- Tenant-scoped prompt storage and PII redaction pipeline.
- Break-glass admin workflows with approvals.

## Build sequence
- Milestone 1: UX shell + mock services + local storage state.
- Milestone 2: Supabase auth/tenancy + Stripe checkout + webhooks.
- Milestone 3: provider adapters (OpenRouter/OpenAI/Claude/voice/vision).
- Milestone 4: production observability + security controls.
- Milestone 5: load/perf tests + compliance readiness.
