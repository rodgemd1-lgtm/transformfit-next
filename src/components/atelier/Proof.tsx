'use client'

import { motion } from 'framer-motion'

/**
 * Proof — Social proof quote section.
 *
 * Cialdini: Social proof + authority. Specific attribution builds trust.
 * Note: Explicit disclaimer about alpha cohort size — anti-dark-pattern.
 */
interface ProofProps {
  quote: string
  attribution: string
  context?: string
}

export function Proof({ quote, attribution, context }: ProofProps) {
  return (
    <section className="section" aria-label="Testimonial">
      <div className="container-atelier" style={{ maxWidth: 640 }}>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-paper"
          style={{ fontSize: 22, lineHeight: 1.45, fontStyle: 'italic' }}
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>
        <div className="mt-6">
          <p className="label-caps" style={{ letterSpacing: '0.2em' }}>
            — {attribution}
          </p>
          {context && (
            <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--paper-faint)', fontStyle: 'italic' }}>
              {context}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}