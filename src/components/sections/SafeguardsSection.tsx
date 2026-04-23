'use client'

import { motion } from 'framer-motion'

/**
 * SafeguardsSection — The churn-prevention system made visible.
 *
 * MiroFish: Modeled 11 drop-off moments in first 30 days.
 * Each named, each prevented, each transparent.
 * Cialdini: Authority (we studied this specifically) + Consistency (we built against each).
 */

const SAFEGUARDS = [
  { day: 'Day 0', risk: 'Signup friction shock', fix: 'Anonymous preview — see everything first.' },
  { day: 'Day 1-2', risk: 'First session too hard or too long', fix: 'Bodyweight fallback auto-swaps. 10-min floor.' },
  { day: 'Day 3', risk: 'Recovery-day confusion', fix: 'Inline paragraph + math log one tap deep.' },
  { day: 'Day 5-7', risk: '"Nothing\'s changing"', fix: 'Non-scale proof cards surface by day 5.' },
  { day: 'Day 7-14', risk: 'Wearable sync breaks', fix: 'Proactive sync-health banner + plain-English HRV.' },
  { day: 'Week 2-3', risk: 'Travel, illness, week blown', fix: 'Travel-mode toggle. 10-min emergency. Plan holds.' },
  { day: 'Week 2-3', risk: 'Coach feels generic', fix: 'Coach memory across sessions. References your words.' },
  { day: 'Day 14-28', risk: 'Pre-paywall "no wow"', fix: 'Guaranteed non-scale win surfaced week 3.' },
  { day: 'Day 21-30', risk: 'Invisible transformation', fix: 'Sunday narrator writes the story the scale won\'t.' },
  { day: 'Month 2+', risk: 'Life derailment', fix: 'Auto-pause on sudden zero-activity + coach handoff.' },
  { day: 'Month 2-3', risk: 'Habit fragility cascade', fix: '66-day badge + forgiveness curve. Missed ≠ broken.' },
]

export function SafeguardsSection() {
  return (
    <section className="section" aria-label="Adaptive safeguards">
      <div className="container-atelier" style={{ maxWidth: 820 }}>
        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          The safeguards, spelled out
        </p>
        <p className="mb-10" style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
          We modeled the eleven ways a person drops off a fitness app in the first 30 days.
          Each one has a prevention built into the product. Not hidden. Named.
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {SAFEGUARDS.map((s, i) => (
            <motion.div
              key={s.risk}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="card-surface p-5"
            >
              <p className="label-caps mb-2" style={{ letterSpacing: '0.25em', color: 'var(--orange)', fontSize: 10 }}>
                {s.day}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--paper-muted)' }}>
                <span style={{ color: 'var(--paper-faint)' }}>Risk:</span> {s.risk}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--paper-muted)' }}>
                <span style={{ color: 'var(--emerald)' }}>Fix:</span> {s.fix}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center label-caps" style={{ color: 'var(--paper-faint)', letterSpacing: '0.2em' }}>
          Modeled via MiroShark retention graph · 1,000 personas · 7,000 scenario steps
        </p>
      </div>
    </section>
  )
}