# AgentTrust Policy Gate

Experimental, dependency-free policy decision library for proposed agent actions. MIT; Node.js 24+.

```sh
npm test
npm run demo
# Default is DENY without trusted approval:
node src/cli.mjs examples/request.json examples/policy.json
```

`npm run demo` passes `--demo-approved` to demonstrate an allowed request. This flag is NOT authentication or artifact verification. Never give an untrusted agent authority to assert it.

## Implemented

`gate(request, policy, artifactValid)` returns ALLOW or DENY. Requires literal boolean `true` from a trusted verifier, allowed principal and tool, nonnegative integer declared cents within a per-request cap, exact HTTPS hostname, no URL userinfo, and standard HTTPS port. Invalid policy throws; callers must treat errors as denial.

Request fields: `principal`, `tool`, `destination`, `amountCents`. Policy fields: `principals`, `tools`, `hosts`, `maxCents`. Examples are in `examples/`. CLI exit 0 allows, 2 denies, 1 means error. The CLI executes no action and makes no network calls.

## Integration contract and limitations

A trusted mediator must authenticate the principal, verify the exact artifact against a protected approval record, load protected policy, call `gate`, and enforce the result at the execution boundary. Never take `artifactValid`, identity, amounts or policy from the agent as trusted facts. The function checks declarations only. It does not enforce cumulative budgets, authenticate reviewers, resolve DNS, handle redirects, block egress, prevent races, sandbox code or sign audit logs. It is NOT a completed agent firewall. A bypassable caller provides no containment.

The sibling artifact-check project's `verifyArtifact(root, record).valid` can supply the boolean only within that trusted mediator. Both tools assume protected host code and records; neither authenticates the other. Production mediation is future work.

## Project status

Initial experimental prototype extracted from [AgentTrust Spend Demo](https://github.com/TheDivine/agenttrust-spend-demo), commit `920142ad4be65a37e4e9c35fa1a50e44f9feff2e`. Next: an enforced executor boundary, authenticated identities, replay protection, protected audit logs and budget reservations. Real payments and hosted monetization are outside this release.
