'use client'

import { motion } from 'framer-motion'

/**
 * QuizReveal — Two-question gate that shows immediate value before signup.
 *
 * Fogg: Ability — 2 questions, no email, instant feedback.
 * Cialdini: Reciprocity — give value before asking for anything.
 * MiroFish: #1 V01 blocker — signup friction. This kills it.
 */

export function QuizReveal() {
  return (
    <section id="ladder" className="section-inset" aria-label="Try it — no email">
      <div className="container-atelier" style={{ maxWidth: 600 }}>
        <p className="label-caps mb-6 text-center" style={{ letterSpacing: '0.3em' }}>
          Two questions. No email.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Q1: Energy */}
          <div className="mb-8">
            <label className="block font-display text-paper mb-4" style={{ fontSize: 20, fontStyle: 'italic' }}>
              What does your energy feel like right now, honestly?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Low', desc: 'Tired, sore, dreading it' },
                { label: 'Medium', desc: 'Could go either way' },
                { label: 'Honest', desc: 'Let\'s see what the plan says' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  className="card-surface p-4 text-center hover:border-orange/30 transition-all cursor-pointer group"
                >
                  <p className="font-display text-paper group-hover:text-orange transition-colors" style={{ fontSize: 17, fontStyle: 'italic' }}>
                    {opt.label}
                  </p>
                  <p className="mt-1" style={{ fontSize: 11, color: 'var(--paper-faint)' }}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Days */}
          <div className="mb-10">
            <label className="block font-display text-paper mb-4" style={{ fontSize: 20, fontStyle: 'italic' }}>
              How many days this week do you want to move?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['2', '3', '4', '5+'].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="card-surface p-4 text-center hover:border-orange/30 transition-all cursor-pointer group"
                >
                  <p className="font-display text-paper group-hover:text-orange transition-colors" style={{ fontSize: 22, fontStyle: 'italic' }}>
                    {n}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
            >
              Show me what today looks like
            </a>
            <p className="mt-4" style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
              Close the tab anytime. We will not optimize for your guilt.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}