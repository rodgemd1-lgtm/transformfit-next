'use client'

import { motion } from 'framer-motion'

/**
 * WeeklyNarratorPreview — Shows a sample Sunday note.
 *
 * Cialdini: Consistency (weekly cadence), Liking (personal voice).
 * MiroFish: #1 churn blocker — progress_visibility_v1.
 * The narrator is the #1 retention feature in alpha testing.
 */
export function WeeklyNarratorPreview() {
  return (
    <section className="section" aria-label="Weekly narrator">
      <div className="container-atelier" style={{ maxWidth: 600 }}>
        <p className="label-caps mb-6 text-center" style={{ letterSpacing: '0.3em' }}>
          Your Sunday note
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="card-surface p-6 md:p-8"
          style={{ borderLeft: '2px solid var(--orange)' }}
        >
          <p className="label-caps mb-4" style={{ color: 'var(--orange)', letterSpacing: '0.2em' }}>
            Week ending Nov 17
          </p>

          <div style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--paper-muted)' }}>
            <p className="mb-4">
              You trained four days this week. Monday heavy was the right call — your HRV was above baseline
              and the sleep data backed it up. Wednesday got softened because Tuesday ran you 11% below
              your 30-day trend. That wasn&rsquo;t random. That was the plan reading your body before you
              had to decide anything.
            </p>
            <p className="mb-4">
              Thursday you lifted and hit your target RPE at a lower heart rate than last week. That&rsquo;s
              fitness. Saturday stayed easy because your week was still loading high. The plan knows the
              difference between a good week and a recovered one.
            </p>
            <p>
              Next week starts heavier. Your baseline is trending flat-to-up. If Monday&rsquo;s HRV
              confirms, we open with compound volume. If it doesn&rsquo;t, we give Wednesday the same
              softening we gave this one. The commitment stays. The sessions bend.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'var(--orange)', color: 'var(--ink)' }}
            >
              <span className="font-display text-xs italic font-semibold">AP</span>
            </div>
            <div>
              <p className="font-display text-paper" style={{ fontSize: 14, fontStyle: 'italic' }}>
                Aisha Park
              </p>
              <p className="label-caps" style={{ color: 'var(--paper-faint)', fontSize: 9 }}>
                Head Coach · Strength & Recovery
              </p>
            </div>
          </div>
        </motion.div>

        <p className="mt-4 text-center" style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
          Real alpha note. Names and dates redacted. Your note is written every Sunday evening.
        </p>
      </div>
    </section>
  )
}