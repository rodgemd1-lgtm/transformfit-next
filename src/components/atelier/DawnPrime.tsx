'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

/**
 * DawnPrime — The Preview pattern (Mike approved)
 * 
 * Was → Now comparison with animated:
 * - Crossed-out original plan
 * - Orange-accent new plan
 * - Three metric cards (HRV, Sleep, Duration)
 * - Exercise list with interactive checkmarks
 * - Accept plan CTA
 * 
 * Whoop/Superhuman 2026: data becomes the hero visual
 */

interface Exercise {
  name: string
  detail: string
  duration: string
}

interface Metric {
  label: string
  value: string
  unit: string
  color: 'orange' | 'green'
}

const DEFAULT_METRICS: Metric[] = [
  { label: 'HRV', value: '34', unit: 'ms', color: 'orange' },
  { label: 'Sleep', value: '4.2', unit: 'h', color: 'orange' },
  { label: 'Duration', value: '25', unit: 'min', color: 'green' },
]

const DEFAULT_EXERCISES: Exercise[] = [
  { name: 'Incline Walk / Bike', detail: '110–130 BPM zone', duration: '20m' },
  { name: 'Hip Transfers', detail: 'Slow, controlled', duration: '2×10' },
  { name: 'Hamstring Stretch', detail: '30s each side', duration: '3m' },
]

export function DawnPrime() {
  const [exercisesComplete, setExercisesComplete] = useState<boolean[]>(
    new Array(DEFAULT_EXERCISES.length).fill(false)
  )
  const [accepted, setAccepted] = useState(false)

  const toggleExercise = (index: number) => {
    const next = [...exercisesComplete]
    next[index] = !next[index]
    setExercisesComplete(next)
  }

  return (
    <section className="section section-inset mesh-bg-2" aria-label="Dawn prime">
      <div className="container-atelier" style={{ maxWidth: 680 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center"
        >
          <p className="label-caps mb-3" style={{ letterSpacing: '0.3em', color: 'var(--paper-faint)' }}>
            Today's Protocol
          </p>
        </motion.div>

        {/* ── Was → Now Comparison Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-2xl p-5 mb-5"
        >
          <div className="flex gap-4 items-stretch">
            {/* WAS (crossed out) */}
            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="label-caps mb-2" style={{ color: 'var(--paper-faint)', letterSpacing: '0.15em' }}>
                Was
              </p>
              <p className="font-display text-lg line-through" style={{ fontStyle: 'italic', color: 'var(--paper-muted)' }}>
                Heavy Squats
              </p>
              <p style={{ fontSize: 13, color: 'var(--paper-faint)' }}>
                45 min · High intensity
              </p>
              {/* Animated line-through */}
              <motion.div
                className="absolute top-[45%] left-0 right-0 h-px"
                style={{ background: 'var(--orange)', opacity: 0.5 }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* Arrow */}
            <div className="flex items-center px-1">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <ArrowRight size={20} style={{ color: 'var(--orange)' }} />
              </motion.div>
            </div>

            {/* NOW (orange accent) */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="label-caps mb-2" style={{ color: 'var(--orange)', letterSpacing: '0.15em' }}>
                Now
              </p>
              <p className="font-display text-lg" style={{ fontStyle: 'italic', color: 'var(--orange)' }}>
                Zone 2 Flush
              </p>
              <p style={{ fontSize: 13, color: 'var(--paper-muted)' }}>
                25 min · Recovery intensity
              </p>
            </motion.div>
          </div>

          {/* Reason */}
          <motion.div
            className="mt-4 pt-3"
            style={{ borderTop: '1px solid var(--card-border)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
              <span style={{ color: 'var(--orange)', fontWeight: 600 }}>HRV −14%</span> · Sleep 4.2h.{' '}
              Your body said recover, not load. I adjusted so you still get a win today.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Three Metric Cards ── */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {DEFAULT_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="flex-1 glass-card rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
            >
              <motion.p
                className="font-display"
                style={{
                  fontSize: 28,
                  fontStyle: 'italic',
                  color: metric.color === 'orange' ? 'var(--orange)' : 'var(--emerald)',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {metric.value}
                <span style={{ fontSize: 11, color: 'var(--paper-muted)', marginLeft: 2 }}>{metric.unit}</span>
              </motion.p>
              <p className="label-caps mt-1" style={{ color: 'var(--paper-faint)', letterSpacing: '0.1em' }}>
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Exercise List ── */}
        <div className="space-y-2 mb-6">
          {DEFAULT_EXERCISES.map((exercise, i) => (
            <motion.div
              key={exercise.name}
              className="glass-card p-4 rounded-xl flex items-center justify-between cursor-pointer group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              onClick={() => toggleExercise(i)}
            >
              <div className="flex items-center gap-3">
                {/* Check circle */}
                <motion.div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: exercisesComplete[i]
                      ? '2px solid var(--emerald)'
                      : '2px solid var(--card-border)',
                    background: exercisesComplete[i] ? 'var(--emerald-muted)' : 'transparent',
                  }}
                  animate={exercisesComplete[i] ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {exercisesComplete[i] && (
                    <Check size={12} style={{ color: 'var(--emerald)' }} />
                  )}
                </motion.div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: exercisesComplete[i] ? 'var(--paper-muted)' : 'var(--paper)',
                      textDecoration: exercisesComplete[i] ? 'line-through' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {exercise.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
                    {exercise.detail}
                  </p>
                </div>
              </div>
              <span style={{ fontSize: 13, color: 'var(--paper-muted)', fontFamily: 'monospace' }}>
                {exercise.duration}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Accept Plan CTA ── */}
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="accept"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <motion.button
                onClick={() => setAccepted(true)}
                className="w-full py-4 rounded-xl font-semibold uppercase tracking-wider text-sm cursor-pointer"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--ink)',
                  boxShadow: '0 0 24px rgba(249,115,22,0.25)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(249,115,22,0.35)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Accept plan
              </motion.button>
              <button
                onClick={() => setAccepted(true)}
                className="w-full mt-2 py-3 text-sm cursor-pointer"
                style={{ color: 'var(--paper-muted)', background: 'none', border: 'none' }}
              >
                I want the original plan
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center py-4"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'var(--emerald-muted)', border: '1px solid var(--emerald)' }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Check size={16} style={{ color: 'var(--emerald)' }} />
                <span style={{ fontSize: 13, color: 'var(--emerald)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Plan accepted. See you at 6 AM.
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}