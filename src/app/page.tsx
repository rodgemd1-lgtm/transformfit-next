// ═══════════════════════════════════════════════════════════════
// TransformFit Next — Landing Page (Story-Driven Redesign)
//
// PROBLEM: Previous version was a data dump. Mike's feedback:
//   "There's a lot of stuff that does not mean anything to me.
//    It's hard to understand and follow. It looks exactly the same."
//
// FIX: Strip it down. Story first, data second. CoachHero IS the
// experience, not one of 15 sections. The alpha site works because
// it's a coach talking to you — not a dashboard with HRV numbers.
//
// New flow (inspired by alpha + our spec):
//   1. Coach speaks first — "Tuesday came in hard" (emotion)
//   2. CoachHero — progressive questioning (you talk back)
//   3. Your first week — what it actually looks like (story)
//   4. What we won't do — trust section (authenticity)
//   5. Start — 3-day trial CTA (conversion)
//
// ═══════════════════════════════════════════════════════════════

import { Nav } from '@/components/atelier/Nav'
import { HeroClinical } from '@/components/atelier/HeroClinical'
import { StitchDivider } from '@/components/atelier/StitchDivider'
import { CoachHero } from '@/components/atelier/CoachHero'
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
            1. COACH SPEAKS FIRST
            The hero is a coach note. Not a dashboard. Not data.
            Just a coach who already knows your Tuesday was hard.
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
            2. COACH HERO — YOU TALK BACK
            The coach asked. Now you answer. Two taps, zero
            friction. The coach EMERGES from your response.
            
            This is the moment. Not a card selector. Not a form.
            A conversation with a coach who already knows your week.
            ═════════════════════════════════════════════════════ */}
        <CoachHero />

        {/* ═════════════════════════════════════════════════════
            3. YOUR FIRST WEEK
            Not a feature list. A story. What Tuesday through Sunday
            actually looks like when the plan reads your body.
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
            4. WHAT WE WON'T DO — Trust through authenticity
            No dark patterns. No guilt. No BS. This is the
            trust section — values alignment creates commitment.
            ═════════════════════════════════════════════════════ */}
        <WhatWeWontDo />

        {/* ═════════════════════════════════════════════════════
            5. START — 3-day trial CTA
            Loss aversion + transparency. No credit card. No
            email wall. Just start.
            ═════════════════════════════════════════════════════ */}
        <StitchDivider />
        <Plan />
        <NoSignupWall />
        <Footer tagline="TransformFit. For the week you are actually having." />
      </main>
    </>
  )
}