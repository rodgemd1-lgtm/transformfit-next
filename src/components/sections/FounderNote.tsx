'use client'

import { motion } from 'framer-motion'

/**
 * FounderNote — Cialdini unity principle.
 * Named, personal, accountable. No stock faces, no anonymous "team".
 */

export function FounderNote() {
  return (
    <section className="section section-inset" aria-label="Founder note">
      <div className="container-atelier" style={{ maxWidth: 640 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />

        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          Why we built this
        </p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-paper"
          style={{ fontSize: 22, lineHeight: 1.45, fontStyle: 'italic' }}
        >
          I&rsquo;ve worn every tracker. I&rsquo;ve tried every app. They all gave me numbers and
          none of them changed tomorrow&rsquo;s workout when I had a bad Tuesday. So we built
          the missing layer — the one that reads your signals and actually rewrites the plan
          before you open it. This is the tool I wanted.
        </motion.p>

        <p className="label-caps mt-8" style={{ color: 'var(--paper-faint)' }}>
          — Mike Rodgers, TransformFit
        </p>
      </div>
    </section>
  )
}