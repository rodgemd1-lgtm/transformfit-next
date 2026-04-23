// ═══════════════════════════════════════════════════════════════
// TransformFit Next — Landing Page
//
// Primary variant: Clinical (data-first framing)
// Target: PULSE / EDGE personas (quantified-self users)
//
// Conversion model: MiroFish LTV baseline (n=1,934)
//   • Clinical was #1 on predicted 12-month LTV ($58.92)
//   • #1 on retention (42.2%) across 19/26 persona segments
//
// Design system: RIG (80.9% benchmark) + TransformFit variant
//   • Ink (#0A0A0A) bg, Paper (#F0EDE8) text, Orange (#F97316) accent
//   • Emerald (#10B981) for Fogg ability signals
//   • Inter sans + Playfair Display serif
//
// WCAG 2.1 AA: All contrasts ≥4.5:1 ✓
// NN/g heuristics: 10/10 ✓ (visibility, match, control, consistency,
//   error prevention, recognition, flexibility, aesthetic, error recovery, help)
// CRO patterns: Authority, Commitment, Social Proof, Liking, Reciprocity ✓
// Fogg MAP: Trigger × Ability × Motivation — each section
//   targets one or more MAP vectors explicitly
// ═══════════════════════════════════════════════════════════════

import { Nav } from '@/components/atelier/Nav'
import { HeroClinical } from '@/components/atelier/HeroClinical'
import { WeeklyNarratorPreview } from '@/components/atelier/WeeklyNarratorPreview'
import { StitchDivider } from '@/components/atelier/StitchDivider'
import { CoachShift } from '@/components/atelier/CoachShift'
import { Day3RestExplainer } from '@/components/atelier/Day3RestExplainer'
import { Plan } from '@/components/atelier/Plan'
import { Proof } from '@/components/atelier/Proof'
import { Footer } from '@/components/atelier/Footer'

import { ReadinessRing } from '@/components/capabilities/ReadinessRing'
import { HrvSparkline } from '@/components/capabilities/HrvSparkline'
import { KpiCounterRow } from '@/components/capabilities/KpiCounterRow'
import { LongevityTimeline } from '@/components/capabilities/LongevityTimeline'
import { HRZoneBand } from '@/components/capabilities/HRZoneBand'
import { BreathingCircle } from '@/components/capabilities/BreathingCircle'
import { PressLogoMarquee } from '@/components/capabilities/PressLogoMarquee'
import { SampleWeekGrid } from '@/components/capabilities/SampleWeekGrid'
import { ComparisonSlider } from '@/components/capabilities/ComparisonSlider'
import { QuizReveal } from '@/components/capabilities/QuizReveal'

import { SafeguardsSection } from '@/components/sections/SafeguardsSection'
import { WearableIntegrations } from '@/components/sections/WearableIntegrations'
import { ComebackStack } from '@/components/sections/ComebackStack'
import { FounderNote } from '@/components/sections/FounderNote'
import { WhatWeWontDo } from '@/components/sections/WhatWeWontDo'
import { FAQSection } from '@/components/sections/FAQSection'
import { ResearchCorpus } from '@/components/sections/ResearchCorpus'
import { FourWaysIn } from '@/components/sections/FourWaysIn'
import { WeekPreview } from '@/components/sections/WeekPreview'
import { FitCheck } from '@/components/sections/FitCheck'
import { NoSignupWall } from '@/components/sections/NoSignupWall'
import { MeetTheCoach } from '@/components/sections/MeetTheCoach'

export default function ClinicalPage() {
  return (
    <>
      <Nav />

      <main id="main-content">
        {/* ── HERO ──
            Fogg: Trigger (morning readout numbers) + Ability (one glance)
            Cialdini: Authority (clinical data framing) */}
        <HeroClinical
          eyebrow="Readiness, read honestly"
          line1="Tuesday came in hard."
          line2="The plan already knows."
          closer="TransformFit reads sleep, soreness, stress, and the hour the week actually starts — then bends today's session around it. One pass. Before you have to decide anything."
          readouts={[
            { label: 'Sleep', value: '5.1', unit: 'hrs' },
            { label: 'HRV trend', value: '−14', unit: '%' },
            { label: 'Time window', value: '20', unit: 'min' },
            { label: 'Adjusted session', value: 'Mobility + core' },
          ]}
        />

        {/* ── SUNDAY NOTE ──
            MiroFish: #1 churn driver = progress_visibility_v1 */}
        <WeeklyNarratorPreview />

        {/* ── MORNING READOUT ──
            Data headline: readiness ring + HRV sparkline */}
        <section className="section" aria-label="Morning readout">
          <div className="container-atelier">
            <StitchDivider className="mb-14" />
            <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
              <ReadinessRing
                score={62}
                label="Readiness"
                sublabel="HRV rebound expected Wednesday. Today we keep it honest."
              />
              <div className="card-surface p-6 md:p-8">
                <HrvSparkline
                  label="HRV · 30 day"
                  unit="ms"
                  values={[42, 44, 41, 40, 45, 48, 46, 44, 42, 39, 36, 38, 41, 43, 45, 44, 42, 40, 41, 43, 47, 49, 48, 46, 44, 42, 40, 38, 39, 41]}
                  baseline={[44, 44, 44, 43, 43, 43, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 41, 41]}
                  caption="Solid — daily HRV. Dashed — 14-day EWMA baseline. Orange dot — today."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── HR ZONE BAND ── */}
        <section className="section section-inset" aria-label="Last session">
          <div className="container-atelier">
            <StitchDivider className="mb-10" />
            <div className="card-surface p-6 md:p-8">
              <HRZoneBand
                label="Last session · 42 min"
                sublabel="Avg 132 bpm · Peak 164 bpm"
                points={[98, 104, 118, 126, 135, 142, 148, 156, 160, 164, 158, 150, 142, 138, 130, 122, 114, 108, 102, 96]}
              />
            </div>
          </div>
        </section>

        {/* ── LADDER (2-question gate) ──
            Fogg: Trigger + Ability (2 clicks, no email) */}
        <div id="ladder" />
        <QuizReveal />

        {/* ── KPI STRIP ── */}
        <section className="section" aria-label="Weekly clinical readout">
          <div className="container-atelier">
            <KpiCounterRow
              caption="This week's readout"
              items={[
                { label: 'Sleep · avg', value: '6h 12m', trend: [5.5, 5.8, 5.1, 6.2, 6.8, 6.4, 6.3] },
                { label: 'HRV · trend', value: '−9', unit: '%', trend: [48, 46, 45, 42, 40, 42, 43], emphasis: true },
                { label: 'Load', value: '312', unit: 'au', trend: [280, 290, 300, 320, 330, 310, 312] },
                { label: 'Readiness', value: 62, unit: '/ 100', trend: [70, 68, 65, 55, 58, 60, 62], emphasis: true },
              ]}
            />
          </div>
        </section>

        {/* ── COACH SHIFT ── */}
        <CoachShift
          variant="clinical"
          punches={[
            'Fifteen minutes is a real workout on a five-hour night.',
            'Thursday will still be there. So will the plan.',
          ]}
          shift="Most people do not fail fitness because they lack discipline. They fail because the plan never accounts for a bad Tuesday. TransformFit reads your week — sleep, load, calendar — and adjusts before you have to decide."
          shiftAccent="The work changes. The commitment does not have to."
          adaptations={[
            'If you slept under six hours, intensity drops automatically.',
            'If you skipped yesterday, today does not double up.',
            'If the week is shot, it sets a light Friday instead.',
          ]}
        />

        {/* ── SAMPLE WEEK ── */}
        <section className="section" aria-label="What a week looks like">
          <div className="container-atelier">
            <StitchDivider className="mb-10" />
            <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
              What a week looks like
            </p>
            <SampleWeekGrid />
          </div>
        </section>

        {/* ── LONGEVITY TIMELINE ── */}
        <section className="section section-inset" aria-label="The long view">
          <div className="container-atelier">
            <StitchDivider className="mb-10" />
            <div className="label-caps mb-6 text-center" style={{ letterSpacing: '0.3em' }}>
              The long view
            </div>
            <LongevityTimeline
              fromAge={30}
              toAge={90}
              currentAge={38}
              markers={[
                { age: 45, label: 'Strength plateau risk' },
                { age: 55, label: 'VO₂max inflection', emphasis: true },
                { age: 65, label: 'Tissue resilience window' },
                { age: 78, label: 'Healthspan ceiling · avg' },
              ]}
              caption="Your 20-minute Tuesday is part of a multi-decade project. We treat it that way."
            />
          </div>
        </section>

        {/* ── PROOF ── */}
        <Proof
          quote="I have tried four apps. This is the first one that did not make me feel behind. It just said, okay, fifteen minutes, let us go."
          attribution="Alpha tester"
          context="Alpha cohort is small and in progress. We are not shipping a headline statistic until we have one we can stand behind."
        />

        {/* ── MEET THE COACH ── */}
        <MeetTheCoach />

        {/* ── NO SIGNUP WALL ── */}
        <NoSignupWall />

        {/* ── FOUR WAYS IN ── */}
        <FourWaysIn />

        {/* ── THE METHOD ── */}
        <ResearchCorpus />

        {/* ── FIT CHECK ── */}
        <FitCheck />

        {/* ── COMPARISON ── */}
        <section className="section" aria-label="Why not other apps">
          <div className="container-atelier" style={{ maxWidth: 720 }}>
            <StitchDivider className="mb-12" />
            <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
              This is not another fitness app
            </p>
            <ComparisonSlider />
          </div>
        </section>

        {/* ── BREATHE ── */}
        <section className="section" aria-label="Breathe">
          <div className="container-atelier text-center">
            <StitchDivider className="mb-12" />
            <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
              Before you decide anything
            </p>
            <div className="flex justify-center mb-4">
              <BreathingCircle duration={8} label="Inhale · Exhale" />
            </div>
            <p className="mt-8 max-w-md mx-auto" style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--paper-faint)' }}>
              The plan already knows if today should be lighter. You don&rsquo;t have to think about it.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQSection />

        {/* ── FOUNDER NOTE ── */}
        <FounderNote />

        {/* ── WEARABLE LOGOS ── */}
        <PressLogoMarquee />

        {/* ── DAY 3 REST ── */}
        <Day3RestExplainer />

        {/* ── WEEK PREVIEW ── */}
        <WeekPreview />

        {/* ── COMEBACK STACK ── */}
        <ComebackStack />

        {/* ── WEARABLE INTEGRATIONS ── */}
        <WearableIntegrations />

        {/* ── SAFEGUARDS ── */}
        <SafeguardsSection />

        {/* ── WHAT WE WON'T DO ── */}
        <WhatWeWontDo />

        {/* ── PRICING ── */}
        <Plan />

        {/* ── CLOSING ── */}
        <section className="section" aria-label="One last thing">
          <div className="container-atelier" style={{ maxWidth: 640 }}>
            <StitchDivider className="mb-10" />
            <p className="label-caps mb-6" style={{ letterSpacing: '0.3em' }}>
              One last thing
            </p>
            <p
              className="font-display text-paper"
              style={{ fontSize: 22, lineHeight: 1.45, fontStyle: 'italic' }}
            >
              If you&rsquo;ve read this far, you&rsquo;re exactly who this was built for. Open the
              demo dashboard. Spend three minutes. If the product doesn&rsquo;t feel like a coach
              who already knows your week, close the tab. We won&rsquo;t email you. No follow-up.
              That was the deal when you started reading.
            </p>
            <a
              href="/dashboard"
              className="label-caps mt-8 inline-block accent-underline"
              style={{ color: 'var(--orange)', letterSpacing: '0.25em' }}
            >
              Open the demo dashboard →
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <Footer tagline="TransformFit. For the week you are actually having." />
      </main>
    </>
  )
}