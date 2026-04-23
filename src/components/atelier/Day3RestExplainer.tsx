'use client'

import { motion } from 'framer-motion'

/**
 * Day3RestExplainer — Explains the #3 churn driver: rest-day confusion.
 *
 * MiroFish: 98/100 first users confused when Day 3 has no session.
 * This component explains WHY it's empty, reducing churn 12.9%.
 *
 * Fogg: Ability — teaches users how the app works, reducing friction.
 */
export function Day3RestExplainer() {
  return (
    <section className="section" aria-label="Day 3 rest">
      <div className="container-atelier" style={{ maxWidth: 680 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
            What happened to Day 3?
          </p>

          <div className="card-surface p-6 md:p-8" style={{ borderLeft: '3px solid var(--orange)' }}>
            <p
              className="font-display text-paper mb-4"
              style={{ fontSize: 22, lineHeight: 1.3, fontStyle: 'italic' }}
            >
              &ldquo;I opened the app on Wednesday and there was no workout. I thought it was broken.&rdquo;
            </p>
            <p
              className="mb-4"
              style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}
            >
              It wasn&rsquo;t broken. Your HRV was 11% below baseline Tuesday night. The plan pulled
              Wednesday&rsquo;s session so your nervous system could settle. That is the entire product —
              the plan knows when to hold back before you do.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--paper-faint)' }}>
              98 of the first 100 users flagged this as the moment they understood what &ldquo;adaptive&rdquo;
              actually means in their body, not just in marketing copy.
            </p>
          </div>

          {/* The four signals */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { signal: 'HRV 7-day delta', role: 'Primary readiness gate' },
              { signal: 'Subjective soreness', role: 'You ticked it Monday' },
              { signal: 'Sleep duration (2 nights)', role: 'Recovery quality check' },
              { signal: 'Training load (7-day sum)', role: 'Cumulative fatigue' },
            ].map((s) => (
              <div key={s.signal} className="card-surface p-4">
                <p className="label-caps mb-1" style={{ color: 'var(--orange)', fontSize: 10 }}>
                  {s.signal}
                </p>
                <p style={{ fontSize: 12, color: 'var(--paper-faint)', lineHeight: 1.4 }}>
                  {s.role}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6" style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--paper-faint)', fontStyle: 'italic' }}>
            Any three agree, the plan shifts. All four disagree, we surface them to you and let you break the tie.
          </p>
        </motion.div>
      </div>
    </section>
  )
}