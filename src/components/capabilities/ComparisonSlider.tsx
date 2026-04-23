'use client'

import { motion } from 'framer-motion'

/**
 * ComparisonSlider — Before/After or X vs Y comparison.
 * Used for "What most apps do" vs "What TransformFit does".
 *
 * Cialdini: Contrast principle makes the difference vivid.
 */

export function ComparisonSlider() {
  const comparisons = [
    {
      most: 'Every app says "great job" on day one. You did one push-up.',
      ours: 'We say nothing on day one. The coach note arrives Sunday, with specifics. Day one is for starting. The mirror comes later.',
    },
    {
      most: 'Yellow streak. Red missed-day. Guilt copy on Wednesday.',
      ours: 'Three days of inactivity and we leave you alone. No re-engagement cascade. The plan waits for you, not the other way around.',
    },
    {
      most: 'Personalization = "what are your goals?" on onboarding screen one.',
      ours: 'Personalization = the plan reading your HRV on Tuesday morning and softening Wednesday without asking.',
    },
    {
      most: 'Coaches that text you daily on a platform you didn\'t sign up to chat on.',
      ours: 'One named coach who writes you a Sunday note. No midday nudges. No in-app chat that feels like a DM from a bot.',
    },
  ]

  return (
    <div className="space-y-6">
      {comparisons.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div
            className="p-5 md:p-6"
            style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--card-border)',
              borderRadius: 2,
            }}
          >
            <p className="label-caps mb-2" style={{ color: 'var(--paper-faint)', fontSize: 10 }}>
              Most fitness apps
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--paper-faint)' }}>
              {c.most}
            </p>
          </div>
          <div
            className="p-5 md:p-6"
            style={{
              background: 'var(--card-surface)',
              borderLeft: '2px solid var(--orange)',
              borderTop: '1px solid var(--card-border)',
              borderRight: '1px solid var(--card-border)',
              borderBottom: '1px solid var(--card-border)',
              borderRadius: 2,
            }}
          >
            <p className="label-caps mb-2" style={{ color: 'var(--orange)', fontSize: 10 }}>
              TransformFit
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--paper-muted)' }}>
              {c.ours}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}