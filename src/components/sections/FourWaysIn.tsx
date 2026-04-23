'use client'

import { motion } from 'framer-motion'

/**
 * FourWaysIn — Persona-psychographic entry paths.
 *
 * MiroShark churn distribution: each quadrant needs a matched opener.
 * Fogg: Motivation matching — different people are motivated by different things.
 * Cialdini: Liking — "this was built for someone like me."
 */

const PATHS = [
  {
    tag: 'Autonomy-driven',
    heading: 'You want control, not a nagging app.',
    body: 'No streak shame. No push notifications unless you opt in. Three days of inactivity and we leave you alone — no re-engagement cascade, no guilt copy. The plan waits for you, not the other way around.',
    proof: 'Default notification volume: 2/week. Maximum configurable: 6/week.',
  },
  {
    tag: 'Data-driven',
    heading: 'You want the math visible, not black-boxed.',
    body: 'Every adjustment is explained: which signal triggered it, how much the intensity shifted, what the rolling baseline was. Click the adjustment indicator and see the math. No "trust us" — show the log.',
    proof: 'Published methodology doc at transformfit.app/method (post n=5000 cohort).',
  },
  {
    tag: 'Accountability-driven',
    heading: 'You show up for people, not apps.',
    body: 'Opt-in coach pairing with a real human head coach who reads your week and replies by Sunday evening. Not a bot. Not a text farm. One coach, real voice, week-in-review.',
    proof: 'Current head coach: Aisha Park. 14 years S&C. Responds within 24h, written.',
  },
  {
    tag: 'Identity-driven',
    heading: 'You want to become someone, not track something.',
    body: 'The Sunday note is written in second-person narrative. It doesn\'t read like an app-generated summary — it reads like a letter that names the thing you overcame this week. That voice is the product.',
    proof: 'Weekly Narrator preview is above. Real alpha sample, names redacted.',
  },
]

export function FourWaysIn() {
  return (
    <section className="section" aria-label="Four ways in">
      <div className="container-atelier">
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-10 text-center" style={{ letterSpacing: '0.3em' }}>
          Four ways into this
        </p>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          {PATHS.map((entry, i) => (
            <motion.div
              key={entry.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-surface p-7 md:p-8"
              style={{ borderLeft: '2px solid var(--orange)' }}
            >
              <p className="label-caps mb-3" style={{ letterSpacing: '0.25em', color: 'var(--orange)' }}>
                {entry.tag}
              </p>
              <h3
                className="font-display text-paper mb-4"
                style={{ fontSize: 20, lineHeight: 1.25, fontStyle: 'italic' }}
              >
                {entry.heading}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--paper-muted)' }}>
                {entry.body}
              </p>
              <p className="mt-4" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--paper-faint)', fontStyle: 'italic' }}>
                {entry.proof}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}