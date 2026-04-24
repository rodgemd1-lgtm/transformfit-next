'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * DawnPrimeDashboard — Proactive Telemetry Alert
 * 
 * 10x feature: When wearable data (HRV, sleep) signals recovery is needed,
 * the dashboard proactively adapts your workout. This is the "body that knows
 * what week you're actually in" moment.
 * 
 * Uses ONLY design system tokens:
 *   bg-primary, text-primary, bg-surface, bg-surfaceAlt,
 *   text-textMain, text-textMuted, border-border, rounded-xl
 *   font-display (Cal Sans), font-sans (Inter)
 * 
 * Design system: tokens.json — Empowering, data-driven, never shaming
 * Persona: Data-Driven Optimizer (28yo, tech, wears Whoop/Oura)
 * JTBD: "When I wake up with low HRV, I want the app to explain the science
 *        behind my recovery, so I can trust the process of resting."
 * 
 * Figma Weave: Hero asset with dramatic side-lighting on coach photo
 * Rive: coach_message animation with MessageMachine state machine
 */

interface TelemetryData {
  hrv: number
  hrvDelta: number
  sleep: number
  sleepLabel: string
  readiness: number
  originalWorkout: string
  modifiedWorkout: string
  modifiedDuration: string
  modifiedExercises: { name: string; detail: string; duration: string }[]
}

const MOCK_DATA: TelemetryData = {
  hrv: 34,
  hrvDelta: -14,
  sleep: 4.2,
  sleepLabel: 'Poor',
  readiness: 38,
  originalWorkout: 'Heavy Squats',
  modifiedWorkout: 'Zone 2 Flush',
  modifiedDuration: '25 MIN',
  modifiedExercises: [
    { name: 'Incline Walk / Stationary Bike', detail: 'Keep heart rate between 110-130 BPM.', duration: '20 min' },
    { name: '90/90 Hip Transfers', detail: 'Slow, controlled breathing.', duration: '2 × 10' },
    { name: 'Standing Hamstring Stretch', detail: '30-second hold each side.', duration: '3 min' },
  ],
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function DawnPrimeDashboard() {
  const [data] = useState<TelemetryData>(MOCK_DATA)
  const [showModified, setShowModified] = useState(false)
  const [alertDismissed, setAlertDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowModified(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section data-testid="dawn-prime-dashboard" className="max-w-md mx-auto p-4">
      <AnimatePresence mode="wait">
        {!alertDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl overflow-hidden border border-primary/30 mb-6"
            style={{ background: 'linear-gradient(135deg, rgba(255,61,90,0.08) 0%, rgba(20,20,27,0.7) 100%)' }}
          >
            {/* Alert header bar */}
            <div
              className="w-full h-1"
              style={{ background: 'linear-gradient(to right, #FF3D5A, transparent)' }}
            />

            <div className="p-6 flex items-start gap-4">
              {/* Coach avatar with pulse */}
              <div className="relative w-10 h-10 shrink-0 mt-1">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-display text-xl text-textMain mb-1" style={{ fontStyle: 'italic' }}>
                  Dawn Prime Intervention
                </h3>
                <p className="text-textMuted text-sm leading-relaxed max-w-2xl mb-4">
                  &ldquo;Your HRV dropped {Math.abs(data.hrvDelta)}% overnight and deep sleep was compromised.
                  I&#39;ve automatically swapped today&#39;s heavy squats for a Zone 2 flush.
                  You still get a win today without burning out.&rdquo;
                  <span className="block mt-2 text-primary font-medium text-xs tracking-wider uppercase">
                    — Jake
                  </span>
                </p>

                {/* Telemetry data row */}
                <div className="flex items-center gap-6 bg-black/40 p-3 rounded-lg border border-border inline-flex">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-textMuted uppercase tracking-widest">HRV</span>
                    <span className="text-sm font-medium text-textMain">{data.hrv}ms</span>
                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 rounded font-medium">
                      {data.hrvDelta}%
                    </span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-textMuted uppercase tracking-widest">SLEEP</span>
                    <span className="text-sm font-medium text-textMain">{data.sleep}h</span>
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 rounded font-medium">
                      {data.sleepLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => setAlertDismissed(true)}
                className="text-textMuted hover:text-textMain transition-colors p-1"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modified workout card */}
      <AnimatePresence mode="wait">
        {showModified && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="rounded-xl border border-border overflow-hidden"
            style={{ background: 'rgba(20,20,27,0.7)', backdropFilter: 'blur(12px)' }}
          >
            <div className="p-6 flex justify-between items-start mb-4">
              <div>
                <span
                  className="inline-block bg-secondary/20 text-secondary text-xs font-bold px-2 py-1 rounded mb-2"
                >
                  AUTO-MODIFIED
                </span>
                <h2 className="font-display text-2xl text-textMain" style={{ fontStyle: 'italic' }}>
                  {data.modifiedWorkout}
                </h2>
              </div>
              <span className="text-textMuted">{data.modifiedDuration}</span>
            </div>

            <div className="space-y-4 px-6 pb-6">
              {data.modifiedExercises.map((exercise, idx) => (
                <motion.div
                  key={exercise.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.12, duration: 0.5, ease: easeOutExpo }}
                  className="p-4 bg-surface rounded-xl border border-border flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-textMain">{exercise.name}</p>
                    <p className="text-sm text-textMuted">{exercise.detail}</p>
                  </div>
                  <span className="text-sm text-textMuted">{exercise.duration}</span>
                </motion.div>
              ))}
            </div>

            {/* Accept / Adjust CTA */}
            <div className="px-6 pb-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-primary text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(255,61,90,0.3)] hover:bg-opacity-90 transition-all"
                aria-label="Accept modified workout"
              >
                Accept Plan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl border border-border text-textMuted hover:text-textMain transition-colors"
                aria-label="Manually adjust workout"
              >
                Adjust
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}