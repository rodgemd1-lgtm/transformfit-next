'use client'

import { motion } from 'framer-motion'

/**
 * WhatWeWontDo — Anti-features section.
 *
 * Cialdini: Contrast principle — by showing what we WON'T do,
 *   we make what we DO do more distinct and valued.
 * Fogg: Reduces anxiety about dark patterns — increases trust/ability.
 */

const WONT_ITEMS = [
  {
    label: 'Streak shame.',
    body: 'No red broken-chain graphics. No "you\'ve lost your streak" emails. Streaks rot the weeks they exist and poison the weeks they don\'t.',
  },
  {
    label: 'Notification spam.',
    body: 'Default is 2 pushes a week — the Sunday note and a mid-week plan-shifted-for-you nudge. You can turn both off. The product still works.',
  },
  {
    label: 'Retargeting without consent.',
    body: 'We don\'t buy your email address on the quiz-reveal. We don\'t pixel you after you leave. If you want us to follow up, you\'ll have to ask.',
  },
  {
    label: 'Human-impersonating AI.',
    body: 'The coach voice is labeled. Aisha is a real person and writes the voice template. The AI fills in your specifics. We say this out loud.',
  },
  {
    label: 'Cancellation friction.',
    body: 'One tap. No "are you sure" gauntlet. Your data exports in JSON on the way out. You came in with it; you leave with it.',
  },
  {
    label: 'Instagram-grade motivational theatre.',
    body: 'No countdowns. No hype videos. No drill sergeant voice-over. If you want that, Peloton has it. We built the other thing.',
  },
]

export function WhatWeWontDo() {
  return (
    <section className="section section-inset" aria-label="What we won't do">
      <div className="container-atelier" style={{ maxWidth: 780 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          What we won&rsquo;t do
        </p>

        <ul className="space-y-6">
          {WONT_ITEMS.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}
            >
              <span style={{ color: 'var(--paper-faint)', fontStyle: 'italic' }}>{item.label}</span>{' '}
              {item.body}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}