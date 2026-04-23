'use client'

import { motion } from 'framer-motion'

/**
 * FAQSection — Objections addressed directly.
 *
 * Cialdini: Addressing objections head-on increases trust.
 * NN/g: Error prevention — FAQ prevents support friction.
 */

const FAQ_ITEMS = [
  {
    q: 'What if my HRV data is noisy or missing?',
    a: 'Three-day rolling median smooths the noise. Miss a night entirely and the plan falls back to RPE + sleep duration for the day — not a guess. We only hard-gate on HRV when we have seven consecutive clean reads. Until then you\'re on the conservative ceiling.',
  },
  {
    q: 'How is this different from Future or Whoop?',
    a: 'Future sells you a human coach over text. Whoop sells you a score and leaves programming to you. TransformFit is the layer between — your wearable\'s data actually writing tomorrow\'s session, with a named head coach reviewing the week. One app, both jobs.',
  },
  {
    q: 'What if I miss a week?',
    a: 'Nothing cascades. Miss Monday, Tuesday re-plans around the gap. Miss seven days, we don\'t dump a back-log — we reset to a re-entry block calibrated to detraining curves. The plan assumes life happens. No guilt copy, no streak graveyard.',
  },
  {
    q: 'How do you measure progress if I\'m not weighing myself?',
    a: 'Four axes, visible Sunday: zone-2 duration trending up, strength logs moving, HRV baseline stabilizing, session-completion rate. Weight is optional and de-emphasized. The Weekly Narrator reads your week back as a paragraph, not a bathroom number.',
  },
  {
    q: 'Who is Aisha Park — real coach or persona?',
    a: 'Aisha is real. Head coach, 14 years programming, S&C background, names attached to published methodology once we pass n=5,000. Every coach note you see is her voice or one of two named colleagues. No AI ghostwriting of human signatures.',
  },
  {
    q: 'Can I cancel?',
    a: 'One tap in settings. No retention dark-patterns, no chat-only cancel, no pause-instead-please modal. Export your full data on the way out — zone history, HRV, session logs — as JSON. Your data followed you in, it leaves with you.',
  },
]

export function FAQSection() {
  return (
    <section className="section" aria-label="Questions we actually get">
      <div className="container-atelier" style={{ maxWidth: 780 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-10" style={{ letterSpacing: '0.3em' }}>
          Questions we actually get
        </p>

        <div className="space-y-3">
          {FAQ_ITEMS.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group card-surface"
            >
              <summary
                className="cursor-pointer list-none p-5 md:p-6 font-display text-paper flex items-start justify-between gap-6"
                style={{ fontSize: 17, lineHeight: 1.35, fontStyle: 'italic' }}
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="label-caps shrink-0 mt-1 transition-transform duration-200 group-open:rotate-45"
                  style={{ color: 'var(--paper-faint)', fontSize: 18 }}
                >
                  +
                </span>
              </summary>
              <div
                className="px-5 md:px-6 pb-5 md:pb-6"
                style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}
              >
                {f.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}