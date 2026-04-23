'use client'

import { motion } from 'framer-motion'

/**
 * MeetTheCoach — Aisha Park section.
 *
 * Cialdini: Authority (named coach, credentials), Liking (photo, personal voice).
 * MiroFish: Name prediction Aisha Park = highest-trust candidate (8.0/100%).
 * Anti-dark-pattern: Coach is labeled. AI fills specifics. We say this out loud.
 */

export function MeetTheCoach() {
  return (
    <section className="section section-inset" aria-label="Meet your coach" id="coach">
      <div className="container-atelier" style={{ maxWidth: 860 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          Meet your coach
        </p>

        <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-start">
          {/* Photo + name */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--card-surface)',
              border: '1px solid var(--card-border)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Placeholder coach photo area */}
            <div
              className="flex items-center justify-center"
              style={{
                height: 280,
                background: 'linear-gradient(135deg, var(--ink-700), var(--ink-800))',
              }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'var(--card-surface)', border: '1px solid var(--card-border)' }}
              >
                <span className="font-display text-paper italic text-3xl">AP</span>
              </div>
            </div>
            <div className="p-5" style={{ borderTop: '2px solid var(--orange)' }}>
              <p
                className="font-display text-paper"
                style={{ fontSize: 20, lineHeight: 1.1, fontStyle: 'italic' }}
              >
                Aisha Park
              </p>
              <p
                className="label-caps mt-1"
                style={{ color: 'var(--paper-faint)', letterSpacing: '0.2em' }}
              >
                Head Coach · Strength & Recovery
              </p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p
              className="font-display text-paper mb-5"
              style={{ fontSize: 22, lineHeight: 1.35, fontStyle: 'italic' }}
            >
              &ldquo;Your HRV dropped overnight. We softened Tuesday — strength moves to Thursday.
              Trust the plan; recovery is a rep.&rdquo;
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
              Aisha reads your week — sleep, HRV, soreness, the hour the week actually starts — and
              rewrites the plan before you open the app. Fourteen years of S&amp;C experience informs
              the response templates; an adaptive AI layer fills in your specifics.
            </p>
            <p className="mt-5" style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
              She is labeled. Voice is synthetic, programming logic is real, and the refund guarantee
              has the founder&rsquo;s name on it. The parasocial tie is optional — the math that moves
              your training isn&rsquo;t.
            </p>
            <p className="label-caps mt-6" style={{ color: 'var(--paper-faint)', letterSpacing: '0.25em' }}>
              Coach name selected by MiroFish · highest-trust candidate across 6 tested names
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}