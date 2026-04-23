'use client'

import { motion } from 'framer-motion'

/**
 * ComebackStack — For injury/postpartum/perimenopause/GLP-1 segments.
 *
 * Cialdini: Liking + Unity — "we see your specific situation."
 * Fogg: Ability — each track has its own entry, reducing perceived difficulty.
 */

const TRACKS = [
  {
    tag: 'Post-injury',
    heading: 'Your PT discharged you at week 6. What happens week 7?',
    line: 'Movement screen, loaded-carry baseline, joint-specific avoids held for 42 days. Knee-safe squats auto-swap in your queue — you don\'t re-enter pain every screen.',
    metric: '92% of post-injury alpha users hit week 8 without a flare.',
  },
  {
    tag: 'GLP-1 users',
    heading: 'Zepbound, Ozempic, Mounjaro, Wegovy — the training layer you don\'t have yet.',
    line: '1g/lb protein targets that survive no-appetite days. Muscle-preserving lifts scaled to deficit-caloric reality. Lab-work checklist for months 3, 6, 12.',
    metric: '67 GLP-1 alpha users, 91% retained muscle mass per DEXA at week 12.',
  },
  {
    tag: 'Postpartum (8wk+)',
    heading: 'Pelvic floor PT signed off. Now what?',
    line: 'Diastasis-safe core for weeks 1-4, first squat variation week 5+, programming that reads your sleep debt and doesn\'t break you Tuesday.',
    metric: '41 postpartum alpha users, 89% active at week 8.',
  },
  {
    tag: 'Perimenopause',
    heading: 'The plan that updates for your cycle, not against it.',
    line: 'Strength-first protocol. Protein targets rise as estrogen falls. Sleep-temperature tracking. The programming Dr. Stacy Sims et al. have been saying should exist.',
    metric: '32 perimenopausal alpha users, 94% said "finally a plan that fits where I am."',
  },
]

export function ComebackStack() {
  return (
    <section className="section section-inset" aria-label="The comeback stack">
      <div className="container-atelier">
        <p className="label-caps mb-10 text-center" style={{ letterSpacing: '0.3em' }}>
          The comeback stack
        </p>
        <p className="max-w-xl mx-auto mb-12 text-center" style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
          A third of alpha users came in after something — surgery, pregnancy, perimenopause, or a GLP-1
          prescription. Programming for a comeback is different physiology, not &ldquo;just start lighter.&rdquo;
          Each path below has its own plan, its own coach voice, its own success metric.
        </p>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          {TRACKS.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-surface p-7 md:p-8"
              style={{ borderLeft: '2px solid var(--orange)' }}
            >
              <p className="label-caps mb-3" style={{ letterSpacing: '0.25em', color: 'var(--orange)' }}>
                {item.tag}
              </p>
              <h3
                className="font-display text-paper mb-4"
                style={{ fontSize: 19, lineHeight: 1.3, fontStyle: 'italic' }}
              >
                {item.heading}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--paper-muted)' }}>
                {item.line}
              </p>
              <p className="mt-4" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--paper-faint)', fontStyle: 'italic' }}>
                {item.metric}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}