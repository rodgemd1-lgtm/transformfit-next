'use client'

import { motion } from 'framer-motion'

/**
 * HeroClinical — Data-first hero for PULSE/EDGE personas.
 *
 * Fogg behavior mapping:
 *   Trigger: Morning readout numbers (sleep, HRV, time window)
 *   Ability: Shows the plan adjusting before signup — increases perceived capability
 *   Motivation: Data-forward framing respects quantified-self users who distrust hype
 *
 * Cialdini: Authority (clinical data), Commitment (2-question Ladder below)
 * NN/g: F-pattern, inverted pyramid, visible system status
 */
interface ReadoutItem {
  label: string
  value: string
  unit?: string
}

interface HeroClinicalProps {
  eyebrow?: string
  line1: string
  line2: string
  closer: string
  readouts?: ReadoutItem[]
}

export function HeroClinical({
  eyebrow = 'Readiness, read honestly',
  line1,
  line2,
  closer,
  readouts = [],
}: HeroClinicalProps) {
  return (
    <section
      className="relative min-h-[90vh] flex items-center"
      aria-label="Hero"
    >
      {/* Subtle gradient overlay at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(249,115,22,0.024), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-atelier relative z-10 pt-28 pb-20">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="label-caps mb-8"
          style={{ letterSpacing: '0.3em' }}
        >
          {eyebrow}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-paper max-w-3xl"
          style={{ fontSize: 'clamp(32px, 5.5vw, 56px)', lineHeight: 1.08, fontStyle: 'italic' }}
        >
          <span className="block">{line1}</span>
          <span className="block mt-1" style={{ color: 'var(--orange)' }}>{line2}</span>
        </motion.h1>

        {/* Closer paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 max-w-xl"
          style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--paper-muted)' }}
        >
          {closer}
        </motion.p>

        {/* Morning readout strip — the data hook */}
        {readouts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {readouts.map((r) => (
              <div
                key={r.label}
                className="card-surface p-4 md:p-5"
              >
                <p className="label-caps mb-1.5" style={{ color: 'var(--paper-faint)' }}>
                  {r.label}
                </p>
                <p className="font-display text-paper" style={{ fontSize: 22, fontStyle: 'italic' }}>
                  {r.value}
                  {r.unit && (
                    <span
                      className="font-sans text-paper-muted ml-1"
                      style={{ fontSize: 13, fontStyle: 'normal' }}
                    >
                      {r.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-6 py-3 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
          >
            See your morning readout
          </a>
          <a
            href="#ladder"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-label uppercase font-medium text-paper-muted hover:text-paper transition-colors"
          >
            Two questions. No email.
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 5.5L6 8.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}