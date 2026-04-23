'use client'

import { motion } from 'framer-motion'

/**
 * SampleWeekGrid — Shows what a week with TransformFit looks like.
 *
 * Fogg: Ability — seeing a concrete week makes the abstract actionable.
 * Cialdini: Commitment — visualizing yourself in the schedule is a pre-commitment.
 */
interface DayCard {
  day: string
  short: string
  session: string
  duration: string
  adjusted?: boolean
  reason?: string
  type: 'strength' | 'cardio' | 'mobility' | 'rest' | 'recovery'
}

const WEEK: DayCard[] = [
  { day: 'Monday', short: 'M', session: 'Upper push + core', duration: '38 min', type: 'strength' },
  { day: 'Tuesday', short: 'T', session: 'Zone 2 walk + mobility', duration: '25 min', type: 'cardio' },
  { day: 'Wednesday', short: 'W', session: 'Softened — HRV −12%', duration: '—', type: 'recovery', adjusted: true, reason: 'HRV below baseline. Lifts moved to Thursday.' },
  { day: 'Thursday', short: 'Th', session: 'Lower body + carries', duration: '42 min', type: 'strength' },
  { day: 'Friday', short: 'F', session: 'Easy run + stretch', duration: '30 min', type: 'cardio' },
  { day: 'Saturday', short: 'Sa', session: 'Bodyweight finisher', duration: '18 min', type: 'mobility' },
  { day: 'Sunday', short: 'Su', session: 'Coach note arrives', duration: '—', type: 'rest' },
]

const TYPE_COLORS: Record<DayCard['type'], string> = {
  strength: 'var(--orange)',
  cardio: '#3B82F6',
  mobility: 'var(--emerald)',
  rest: 'var(--paper-faint)',
  recovery: '#D97706',
}

export function SampleWeekGrid() {
  return (
    <div className="grid grid-cols-7 gap-1.5 md:gap-2">
      {WEEK.map((day, i) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="card-surface p-3 md:p-4 text-center relative overflow-hidden"
          style={{
            borderLeft: `2px solid ${TYPE_COLORS[day.type]}`,
            opacity: day.adjusted ? 0.75 : 1,
          }}
        >
          <p className="label-caps mb-1" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
            {day.short}
          </p>
          <div
            className="w-2 h-2 rounded-full mx-auto mb-2"
            style={{ background: TYPE_COLORS[day.type] }}
            aria-hidden="true"
          />
          <p
            className="text-paper mb-0.5"
            style={{ fontSize: 11, lineHeight: 1.35, fontWeight: 500 }}
          >
            {day.session}
          </p>
          <p className="mt-1" style={{ fontSize: 10, color: 'var(--paper-faint)' }}>
            {day.duration}
          </p>

          {day.adjusted && (
            <div
              className="absolute bottom-0 left-0 right-0 py-0.5"
              style={{ background: 'rgba(217,119,6,0.12)' }}
            >
              <p style={{ fontSize: 7, color: '#D97706', letterSpacing: '0.05em' }}>
                ADJUSTED
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}