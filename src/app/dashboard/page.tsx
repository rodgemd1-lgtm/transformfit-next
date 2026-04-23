// ═══════════════════════════════════════════════════════════════
// TransformFit — Demo Dashboard
//
// The "no signup wall" dashboard. Anyone can see this.
// Shows 6 days of demo-state history.
// Cialdini: Reciprocity — give before asking.
// Fogg: Ability — seeing = understanding = lower friction.
// MiroShark: V01 signup-abandon killer.
// ═══════════════════════════════════════════════════════════════

'use client'

import { motion } from 'framer-motion'
import { Nav } from '@/components/atelier/Nav'
import { ReadinessRing } from '@/components/capabilities/ReadinessRing'
import { HrvSparkline } from '@/components/capabilities/HrvSparkline'
import { HRZoneBand } from '@/components/capabilities/HRZoneBand'
import { KpiCounterRow } from '@/components/capabilities/KpiCounterRow'
import { SampleWeekGrid } from '@/components/capabilities/SampleWeekGrid'
import { BreathingCircle } from '@/components/capabilities/BreathingCircle'

// Demo session data
const SESSIONS = [
  { day: 'Monday', type: 'Upper push + core', duration: '38 min', completed: true, hrZone: [98, 104, 118, 126, 135, 142, 148, 156, 160, 164, 158, 150, 142, 138, 130, 122, 114, 108, 102, 96] },
  { day: 'Tuesday', type: 'Zone 2 walk + mobility', duration: '25 min', completed: true, hrZone: [88, 92, 96, 100, 104, 108, 112, 110, 106, 102, 98, 94, 90, 88, 86, 84, 82, 80, 78, 76] },
  { day: 'Wednesday', type: 'Softened — HRV −12%', duration: '—', completed: false, adjusted: true, hrZone: [] },
  { day: 'Thursday', type: 'Lower body + carries', duration: '42 min', completed: true, hrZone: [92, 98, 110, 124, 138, 148, 156, 162, 166, 164, 158, 150, 142, 136, 128, 122, 116, 108, 100, 94] },
  { day: 'Friday', type: 'Easy run + stretch', duration: '30 min', completed: true, hrZone: [86, 90, 98, 106, 114, 120, 124, 126, 128, 126, 122, 118, 112, 106, 100, 94, 90, 86, 82, 78] },
  { day: 'Saturday', type: 'Bodyweight finisher', duration: '18 min', completed: false, hrZone: [] },
]

export default function DashboardPage() {
  return (
    <>
      <Nav />

      <main id="main-content" className="pt-20 pb-16">
        <div className="container-atelier">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <p className="label-caps mb-2" style={{ letterSpacing: '0.3em' }}>
              Demo dashboard
            </p>
            <h1
              className="font-display text-paper"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, fontStyle: 'italic' }}
            >
              Your week, already read.
            </h1>
            <p className="mt-3" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--paper-muted)' }}>
              This is a demo. No real data. No real account. Scroll through a sample week and see how
              the plan adjusts. If this doesn&rsquo;t feel like a coach who already knows your week, close
              the tab.
            </p>
          </motion.div>

          {/* Demo badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10 inline-flex items-center gap-2 card-surface px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="label-caps" style={{ fontSize: 10, color: 'var(--emerald)', letterSpacing: '0.15em' }}>
              Demo mode · No real data
            </span>
          </motion.div>

          {/* Top row: Readiness + HRV */}
          <section className="mb-10" aria-label="Today's readout">
            <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
              <ReadinessRing
                score={62}
                label="Today's readiness"
                sublabel="HRV is below baseline. Intensity ceiling is lowered. The plan already adjusted."
                size={160}
              />
              <div className="card-surface p-6">
                <HrvSparkline
                  label="HRV · 30 day"
                  unit="ms"
                  values={[42, 44, 41, 40, 45, 48, 46, 44, 42, 39, 36, 38, 41, 43, 45, 44, 42, 40, 41, 43, 47, 49, 48, 46, 44, 42, 40, 38, 39, 41]}
                  baseline={[44, 44, 44, 43, 43, 43, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 41, 41]}
                  caption="Solid = daily HRV. Dashed = 14-day baseline. Orange dot = today."
                  width={360}
                  height={140}
                />
              </div>
            </div>
          </section>

          {/* KPI strip */}
          <section className="mb-10" aria-label="Weekly summary">
            <KpiCounterRow
              caption="Week summary"
              items={[
                { label: 'Sleep · avg', value: '6h 12m', trend: [5.5, 5.8, 5.1, 6.2, 6.8, 6.4, 6.3] },
                { label: 'HRV · trend', value: '−9', unit: '%', trend: [48, 46, 45, 42, 40, 42, 43], emphasis: true },
                { label: 'Sessions', value: '4/5', trend: [3, 4, 3, 5, 4, 3, 4] },
                { label: 'Readiness', value: 62, unit: '/ 100', trend: [70, 68, 65, 55, 58, 60, 62], emphasis: true },
              ]}
            />
          </section>

          {/* Sample week grid */}
          <section className="mb-10" aria-label="This week">
            <p className="label-caps mb-6" style={{ letterSpacing: '0.25em' }}>
              This week
            </p>
            <SampleWeekGrid />
          </section>

          {/* Session detail cards */}
          <section aria-label="Session details">
            <p className="label-caps mb-6" style={{ letterSpacing: '0.25em' }}>
              Session details
            </p>
            <div className="space-y-4">
              {SESSIONS.filter(s => s.hrZone.length > 0).map((session, i) => (
                <motion.div
                  key={session.day}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card-surface p-6"
                  style={{
                    borderLeft: session.adjusted
                      ? '2px solid #D97706'
                      : session.completed
                        ? '2px solid var(--emerald)'
                        : '1px solid var(--card-border)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="label-caps mb-1" style={{ letterSpacing: '0.15em' }}>
                        {session.day}
                      </p>
                      <p
                        className="font-display text-paper"
                        style={{ fontSize: 18, fontStyle: 'italic' }}
                      >
                        {session.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: 14, color: 'var(--paper-muted)' }}>{session.duration}</p>
                      <p className="label-caps mt-1" style={{ fontSize: 9 }}>
                        <span
                          className="inline-block px-1.5 py-0.5 rounded-full"
                          style={{
                            background: session.completed ? 'var(--emerald-muted)' : 'rgba(217,119,6,0.12)',
                            color: session.completed ? 'var(--emerald)' : '#D97706',
                          }}
                        >
                          {session.completed ? 'Done' : 'Adjusted'}
                        </span>
                      </p>
                    </div>
                  </div>
                  {session.hrZone.length > 0 && (
                    <HRZoneBand
                      label={`${session.day} · ${session.duration}`}
                      sublabel={`Avg ${Math.round(session.hrZone.reduce((a, b) => a + b, 0) / session.hrZone.length)} bpm`}
                      points={session.hrZone}
                      height={60}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Breathe moment */}
          <section className="mt-12 text-center" aria-label="Breathe">
            <p className="label-caps mb-6" style={{ letterSpacing: '0.25em' }}>
              Between sets
            </p>
            <BreathingCircle duration={8} label="Inhale · Exhale" />
          </section>

          {/* Sunday note preview */}
          <section className="mt-12" aria-label="Sunday note">
            <p className="label-caps mb-6" style={{ letterSpacing: '0.25em' }}>
              This week's Sunday note
            </p>
            <div
              className="card-surface p-6"
              style={{ borderLeft: '2px solid var(--orange)' }}
            >
              <p className="label-caps mb-4" style={{ color: 'var(--orange)', letterSpacing: '0.2em' }}>
                Week ending Nov 17
              </p>
              <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--paper-muted)' }}>
                <p className="mb-3">
                  You trained four days this week. Monday heavy was the right call — your HRV was above
                  baseline and the sleep data backed it up. Wednesday got softened because Tuesday ran
                  you 11% below your 30-day trend.
                </p>
                <p>
                  Next week starts heavier. Your baseline is trending flat-to-up. If Monday&rsquo;s HRV
                  confirms, we open with compound volume. The commitment stays. The sessions bend.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--orange)', color: 'var(--ink)' }}
                >
                  <span className="font-display text-[8px] italic font-semibold">AP</span>
                </div>
                <span className="font-display text-paper italic" style={{ fontSize: 13 }}>
                  Aisha Park
                </span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 text-center" aria-label="Get started">
            <p
              className="font-display text-paper mb-4"
              style={{ fontSize: 24, lineHeight: 1.3, fontStyle: 'italic' }}
            >
              This is the demo. The real thing reads your data.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
            >
              Start the 90 days
            </a>
            <p className="mt-4" style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
              $299 for 3 months. 90-day guarantee. Cancel in one tap.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}