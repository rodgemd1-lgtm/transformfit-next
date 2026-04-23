'use client'

import { motion } from 'framer-motion'

/**
 * NoSignupWall — "See everything before signing up."
 *
 * MiroShark: V01 signup-abandon is #1 churn driver, 100% of personas flagged it.
 * Cialdini: Reciprocity — give value before asking.
 * Fogg: Ability — removing the signup wall removes the biggest friction point.
 */

export function NoSignupWall() {
  const canSee = [
    'Today\'s session, rendered against a sample readiness score.',
    'The dashboard, with six days of demo-state history.',
    'A check-in screen with the adaptive-programming logic visible.',
    'A weekly Sunday note — a real one, from a real alpha user, names redacted.',
    'Pricing, including the 90-day guarantee.',
  ]

  return (
    <section className="section section-inset" aria-label="No signup wall">
      <div className="container-atelier" style={{ maxWidth: 820 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-8 text-center" style={{ letterSpacing: '0.3em' }}>
          No account required. Seriously.
        </p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* What you can see */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3
              className="font-display text-paper mb-5"
              style={{ fontSize: 24, lineHeight: 1.25, fontStyle: 'italic' }}
            >
              What you can see without an email
            </h3>
            <ul className="space-y-3">
              {canSee.map((item) => (
                <li key={item} style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--paper-muted)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Why we show you */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3
              className="font-display text-paper mb-5"
              style={{ fontSize: 24, lineHeight: 1.25, fontStyle: 'italic' }}
            >
              Why we show you first
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
              Every fitness app asks for your email before you&rsquo;ve seen anything. Most cite
              &ldquo;personalization.&rdquo; What they mean is &ldquo;retargeting.&rdquo; We built
              the whole preview state because we&rsquo;re betting the product is the pitch.
            </p>
            <p className="mt-5" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
              If the demo state doesn&rsquo;t land, leave. We won&rsquo;t email you. We won&rsquo;t
              chase. No dark pattern here — we removed the ones we hated in other apps first, then
              shipped the rest.
            </p>
            <a
              href="/dashboard"
              className="label-caps mt-8 inline-block accent-underline"
              style={{ color: 'var(--orange)', letterSpacing: '0.25em' }}
            >
              Open the demo dashboard →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}