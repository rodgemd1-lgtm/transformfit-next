'use client'

import { motion } from 'framer-motion'

/**
 * FitCheck — Who this is for / not for.
 *
 * Cialdini: Exclusivity principle — disqualifying people increases
 *   perceived value for those who remain. Also: honesty builds trust.
 * Also: anti-dark-pattern — we don't want unsatisfied customers.
 */

export function FitCheck() {
  const forYou = [
    'You\'ve tried and drifted off two or three apps. You are not broken. The plans were.',
    'You want clinical credibility — HRV, zone logic, load numbers you can actually see.',
    'You already wear an Oura, Whoop, Apple Watch, or Garmin and want the data to do real work.',
    'You\'re preserving muscle through GLP-1s, perimenopause, or a training reset after 35.',
    'You\'re 35–55, high-intent about healthspan, and done with apps that shout.',
  ]

  const notForYou = [
    'You\'re looking for motivational theatre — countdowns, streak shame, hype videos.',
    'You want Instagram aesthetics first and training logic second. We chose the other order.',
    'You expect zero friction. The plan adapts; you still have to show up.',
  ]

  return (
    <section className="section section-inset" aria-label="Fit check">
      <div className="container-atelier">
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-10 text-center" style={{ letterSpacing: '0.3em' }}>
          Fit check · Honestly
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-surface p-7 md:p-8"
            style={{ borderLeft: '2px solid var(--orange)' }}
          >
            <h3
              className="font-display text-paper mb-6"
              style={{ fontSize: 22, lineHeight: 1.2, fontStyle: 'italic' }}
            >
              This is for you if&hellip;
            </h3>
            <ul className="space-y-4">
              {forYou.map((item) => (
                <li
                  key={item}
                  style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--paper-muted)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface p-7 md:p-8"
          >
            <h3
              className="font-display text-paper mb-6"
              style={{ fontSize: 22, lineHeight: 1.2, fontStyle: 'italic' }}
            >
              This is not for you if&hellip;
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item) => (
                <li
                  key={item}
                  style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--paper-faint)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}