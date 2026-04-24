# Onboarding Days 0-7 — Deployment Ready

## Overview

The onboarding bridge code at `src/lib/onboarding-bridge.ts` connects CoachHero progressive questioning on the landing page to the AEP (Adapt Evolve Progress) onboarding system.

## Architecture

```
Landing Page (CoachHero)
  → User selects energy state + obstacle
  → onboarding-bridge.ts: LandingPageProfile created
  → Maps to Day 0-7 message sequence
  → Dispatches to AEP coaching council
  → Each message triggers via SPARK/PULSE/IRON/EDGE/FUEL/GHOST/AMBER
```

## Deploy Status

| Component | Location | Status |
|-----------|----------|--------|
| CoachHero | `src/components/atelier/CoachHero.tsx` | ✅ Built (3-step progressive questioning) |
| Onboarding Bridge | `src/lib/onboarding-bridge.ts` | ✅ Built (369 LOC, segment mapping) |
| Coach Voices | `src/data/coach-voices.ts` | ✅ Built (16 response combinations) |
| Days 0-7 Messages | `studio/orchestrator/sessions/transformfit-redo_onboarding_messages.md` | ✅ Written |
| Inflection Point Engine | `studio/database/algorithms/inflection-point-engine.md` | ✅ Synthesized |
| AEP Coaching Council | `adapt-evolve-progress/src/lib/ai/coaching-council.ts` | ✅ Built (7 agents) |

## How to Deploy

1. **Validate landing page conversion**: Mike reviews the live page at `transformfit-next.vercel.app`
2. **Wire CoachHero to onboarding bridge**: When user completes energy+obstacle selection, call `createOnboardingProfile()`
3. **Dispatch Day 0 message**: Use the onboarding profile to determine which coach voice and message
4. **Set up CRON for Days 1-7**: Each day dispatches the appropriate message from `transformfit-redo_onboarding_messages.md`

## Message Schedule

| Day | Timing | Agent | Mode | Jake (Anxious Achiever) | Aisha (Data-Driven) |
|-----|--------|-------|------|--------------------------|---------------------|
| 0 | Dawn 5:45-6:30 AM | SPARK | Identity Reinforcement | "The plan already knows..." | "Baseline metrics..." |
| 0 | Post-session | SPARK | Winning Moment | "First session done..." | "Session complete..." |
| 1 | Dawn | PULSE | Competence Proof | "Check this..." | "Your recovery score..." |
| 1 | Pre-sleep | AMBER | Normative Relief | "Tomorrow's plan loaded..." | "I've marked tomorrow..." |
| 2 | Dawn | IRON | Identity Reinforcement | "Look at that..." | "Progress indicators..." |
| 2 | Afternoon | GHOST | Normative Relief | "Rest day. Deload..." | "Active recovery..." |
| 3 | Dawn (Trial End) | SPARK | Loss Aversion | "Trial ends tonight..." | "3 days of data..." |
| 3 | Pre-sleep | SPARK | Loss Aversion | "The plan remembers..." | "Your baseline is set..." |
| 5 | Dawn | PULSE | Narrative Anchor | "Day 5. Different person..." | "5 data points..." |
| 7 | Dawn | SPARK | Identity Close | "One week..." | "Full weekly report..." |

## Deployment Prerequisites

- [x] Landing page live at `transformfit-next.vercel.app`
- [x] CoachHero interactive component built
- [x] Onboarding bridge code written
- [x] Coach voices data (16 combinations)
- [x] Days 0-7 messages written
- [ ] **Mike validates landing page** (blocking)
- [ ] Wire CoachHero selection to `createOnboardingProfile()`
- [ ] Set up Vercel CRON for message dispatch
- [ ] Connect to AEP coaching council API
- [ ] Deploy Days 0-7 to Vercel