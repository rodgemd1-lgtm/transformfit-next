'use client'

import { motion } from 'framer-motion'

/**
 * CoachShift — The adaptive-coaching demonstration section.
 *
 * Shows what the coach says vs. what most apps say.
 * Pattern: punch → contrast → adaptation list.
 *
 * Fogg: Increases perceived ability — you see the plan adjusting FOR you.
 * Cialdini: Authority (named coach), Liking (coach voice is warm, specific).
 */
interface CoachShiftProps {
  variant?: 'clinical' | 'coach' | 'minimal'
  punches: string[]
  shift: string
  shiftAccent?: string
  adaptations: string[]
}

export function CoachShift({
  variant = 'clinical',
  punches,
  shift,
  shiftAccent,
  adaptations,
}: CoachShiftProps) {
  return (
    <section className="section" aria-label="Coach shift">
      <div className="container-atelier" style={{ maxWidth: 720 }}>
        <StitchDivider className="mb-12" />

        {/* Punches — what most apps would say */}
        <div className="mb-10">
          {punches.map((punch, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="font-display text-paper mb-3"
              style={{
                fontSize: 20,
                lineHeight: 1.35,
                fontStyle: 'italic',
                borderLeft: '2px solid var(--orange)',
                paddingLeft: 16,
              }}
            >
              {punch}
            </motion.p>
          ))}
        </div>

        {/* Shift — how TransformFit is different */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p
            className="mb-2 label-caps"
            style={{ color: 'var(--orange)', letterSpacing: '0.25em' }}
          >
            The shift
          </p>
          <p className="mb-6" style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--paper-muted)' }}>
            {shift}
          </p>

          {shiftAccent && (
            <p
              className="font-display text-paper mb-10"
              style={{ fontSize: 22, lineHeight: 1.35, fontStyle: 'italic' }}
            >
              {shiftAccent}
            </p>
          )}
        </motion.div>

        {/* Adaptation list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          {adaptations.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: 'var(--emerald-muted)' }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5.5L4 7.5L8 3.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--paper-muted)' }}>{a}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StitchDivider({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="stitch-line" role="separator" aria-orientation="horizontal" />
    </div>
  )
}