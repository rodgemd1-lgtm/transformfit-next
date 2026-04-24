// ═══════════════════════════════════════════════════════════════
// TransformFit Next — CINEMATIC Landing Page (2026 Standard)
//
// Whoop/Superhuman-level visual quality:
//   - Gradient mesh backgrounds (not flat black)
//   - Scroll-triggered progressive reveals
//   - Orange pulse/glow on key data
//   - Micro-interactions on hover/tap
//   - Data as visual hero (not stock photos)
//
// Flow (5 story-driven sections + 2 cinematic features):
//   1. HeroClinical — "Tuesday came in hard" (parallax, mesh bg)
//   2. LiveSimulation — Cold Data: readiness slider → generated plan
//   3. CoachHero — progressive questioning → AI plan generation
//   4. DawnPrime — The Preview: Was → Now comparison
//   5. Your First Week — 3-day story with coach quotes
//   6. What we won't do — trust section
//   7. Plan + NoSignupWall — email capture CTA
//
// ═══════════════════════════════════════════════════════════════

import { Nav } from '@/components/atelier/Nav'
import { HeroClinical } from '@/components/atelier/HeroClinical'
import { StitchDivider } from '@/components/atelier/StitchDivider'
import { CoachHero } from '@/components/atelier/CoachHero'
import { LiveSimulation } from '@/components/atelier/LiveSimulation'
import { DawnPrime } from '@/components/atelier/DawnPrime'
import { Plan } from '@/components/atelier/Plan'
import { Footer } from '@/components/atelier/Footer'
import { NoSignupWall } from '@/components/sections/NoSignupWall'
import { WhatWeWontDo } from '@/components/sections/WhatWeWontDo'

export default function WarmProofLadder() {
  return (
    <>
      <Nav />

      <main id="main-content">
        {/* ═════════════════════════════════════════════════════
            1. COACH SPEAKS FIRST (CINEMATIC HERO)
            Gradient mesh bg, parallax scroll, glow data cards.
            ═════════════════════════════════════════════════════ */}
        <HeroClinical
          eyebrow="Readiness, read honestly"
          line1="Tuesday came in hard."
          line2="The plan already knows."
          closer="Your HRV dropped. Your sleep was short. The plan already adjusted — you just show up. That's the whole thing."
          readouts={[
            { label: 'Sleep', value: '5.1', unit: 'hrs' },
            { label: 'HRV trend', value: '−14', unit: '%' },
            { label: 'Time window', value: '20', unit: 'min' },
            { label: 'Adjusted session', value: 'Mobility + core' },
          ]}
        />

        {/* ═════════════════════════════════════════════════════
            2. LIVE SIMULATION — Cold Data Pattern
            Interactive readiness slider that generates a 3-day
            plan in real-time. Data IS the visual hero.
            ═════════════════════════════════════════════════════ */}
        <LiveSimulation />

        <StitchDivider />

        {/* ═════════════════════════════════════════════════════
            3. COACH HERO — YOU TALK BACK
            Progressive questioning → AI-generated plan.
            ═════════════════════════════════════════════════════ */}
        <CoachHero />

        {/* ═════════════════════════════════════════════════════
            4. DAWN PRIME — THE PREVIEW
            Was → Now comparison. Proactive coaching that
            already adjusted your plan before you woke up.
            ═════════════════════════════════════════════════════ */}
        <DawnPrime />

        {/* ═════════════════════════════════════════════════════
            5. YOUR FIRST WEEK
            3-day story with coach quotes.
            ═════════════════════════════════════════════════════ */}
        <section className="section" aria-label="Your first week">
          <div className="container-atelier" style={{ maxWidth: 640 }}>
            <StitchDivider className="mb-12" />
            <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
              Your first week
            </p>
            <p
              className="font-display text-paper mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 36px)', lineHeight: 1.15, fontStyle: 'italic' }}
            >
              Three days in, the coaching already feels personal.
            </p>

            {/* Day 1 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    background: 'var(--orange)',
                    color: 'var(--ink)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sharp)',
                  }}
                >
                  DAY 1
                </span>
                <span style={{ fontSize: 13, color: 'var(--paper-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Your context
                </span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
                You tell me your goal, your equipment, and how training has been feeling.
                I build today around your actual context — not a default split, not a program
                someone else started. Then your first session, designed for exactly where you are right now.
              </p>
              <p className="font-display mt-3" style={{ fontSize: 17, fontStyle: 'italic', color: 'var(--orange)' }}>
                "Rough night? I scaled your workout down. You showed up anyway. That counts."
              </p>
            </div>

            {/* Day 2 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    background: 'var(--card-surface)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--paper-muted)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sharp)',
                  }}
                >
                  DAY 2
                </span>
                <span style={{ fontSize: 13, color: 'var(--paper-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Adaptation
                </span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
                Sleep dipped. Soreness stayed high. Instead of forcing the plan,
                I reduce load by 20% and swap squats for a knee-friendly pattern.
                This isn't weakness — it's precision.
              </p>
              <p className="font-display mt-3" style={{ fontSize: 17, fontStyle: 'italic', color: 'var(--orange)' }}>
                "HRV is down. I've softened today — strength moves to Thursday when your body is ready."
              </p>
            </div>

            {/* Day 3 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    background: 'var(--card-surface)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--paper-muted)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sharp)',
                  }}
                >
                  DAY 3
                </span>
                <span style={{ fontSize: 13, color: 'var(--paper-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Pattern recognition
                </span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
                Two sessions in and the patterns are forming. You perform better when volume
                shifts slightly later in the week. Your warm-up needs an extra 3 minutes.
                Your grip gives out before your back does. I see it. I fix it.
              </p>
              <p className="font-display mt-3" style={{ fontSize: 17, fontStyle: 'italic', color: 'var(--orange)' }}>
                "Pattern detected. Your top sets improve 8% when we extend the warm-up. I've built that in."
              </p>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--paper-faint)' }}>
              By Day 7, it feels less like an app and more like someone who's been watching.
            </p>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════
            6. WHAT WE WON'T DO — Trust through authenticity
            ═════════════════════════════════════════════════════ */}
        <WhatWeWontDo />

        {/* ═════════════════════════════════════════════════════
            7. START — 3-day trial CTA
            ═════════════════════════════════════════════════════ */}
        <StitchDivider />
        <Plan />
        <NoSignupWall />
        <Footer tagline="TransformFit. For the week you are actually having." />
      </main>
    </>
  )
}