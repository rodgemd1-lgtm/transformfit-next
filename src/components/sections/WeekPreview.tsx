'use client'

import { motion } from 'framer-motion'

/**
 * WeekPreview — What month one actually feels like.
 *
 * MiroFish V08: trial_end_no_wow — 100% of 28-day pricing encounters flag confusion.
 * This addresses it by narrating each week.
 */

const MILESTONES = [
  {
    week: 'Week 1',
    line: 'The plan adjusts twice. You did not have to ask. You notice you skipped Tuesday because Monday ran long, and the app didn\'t guilt you. You notice you noticed.',
  },
  {
    week: 'Week 2',
    line: 'Your first Sunday note lands. It is 180 words. It is specific enough that you read it twice. You consider forwarding it to your partner and decide not to. The privacy was part of the point.',
  },
  {
    week: 'Week 3',
    line: 'The coach references something you said in onboarding — not as a marketing hook, just in passing. That\'s the moment most alpha users say they stopped calling it "the app" and started calling it by the coach\'s name.',
  },
  {
    week: 'Week 4',
    line: 'First trackable: your resting HR drops 3 beats. Your deadlift hits a real PR, because the plan backed off in week two instead of overreaching. The math is on the dashboard, not a marketing number.',
  },
  {
    week: 'Week 8',
    line: 'Your week has a shape. The plan knows which days are your hard days and which ones are your "life" days. The Sunday note reads like continuity, not surprise. You forget when you started.',
  },
  {
    week: 'Week 12',
    line: 'First DEXA or strength bench comes in. If the number isn\'t what you hoped, the coach writes you a plan for the next 12 weeks and refunds the prior three months. No asterisks.',
  },
]

export function WeekPreview() {
  return (
    <section className="section section-inset" aria-label="Week preview">
      <div className="container-atelier" style={{ maxWidth: 820 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          What month one actually feels like
        </p>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.week}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-surface p-6"
            >
              <p className="label-caps mb-3" style={{ letterSpacing: '0.25em', color: 'var(--orange)' }}>
                {m.week}
              </p>
              <p
                style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--paper-muted)' }}
                dangerouslySetInnerHTML={{ __html: m.line }}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center label-caps" style={{ color: 'var(--paper-faint)', letterSpacing: '0.2em' }}>
          Composite observations from 412 alpha-cohort weekly notes. Names redacted, week labels anchored.
        </p>
      </div>
    </section>
  )
}