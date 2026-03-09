# Grammar by ACHEEVY — Commercial System Spec (v0.3)

## End-to-end lifecycle
1. Landing and discovery
2. Needs analysis (layman language intake)
3. Technical language conversion via Knowledge Index
4. Offer generation and checkout (Stripe)
5. Account provisioning (Supabase Auth + RBAC)
6. Circuit Box connector setup
7. Operations runtime with boomerang traces

## Core centerpieces
- **Technical Knowledge Index**: natural-language-to-technical converter.
- **Boomerang Bullpen**: named agents with mission/objective logging.
- **Vision-first iteration**: agent collaboration with observable activity traces.

## Cloud sandbox strategy
- Run each session inside isolated containers (Alibaba OpenSandbox target integration).
- Add virtual computer workers for browser/vision tasks.
- Apply short-lived credentials and network policies per session.
- Persist only sanitized artifacts and signed event traces.

## Integration baseline
- Stripe, OpenRouter, OpenAI, Claude
- LangGraph + NVIDIA PersonaPlex adapter
- STT/TTS provider pair
- Vision inference endpoint
- Supabase + vault-backed secrets

## Security baseline
- Tenant isolation and row-level security
- Webhook signing and replay protection
- Audit logs for key rotations and circuit toggles
- MFA and operator session controls
