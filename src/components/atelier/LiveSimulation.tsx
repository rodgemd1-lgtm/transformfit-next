'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LiveSimulation — Cold Data pattern (Mike approved)
 * 
 * Whoop/Superhuman 2026 standard:
 * - Animated slider thumb that glows
 * - Smooth bar fills that draw on
 * - Cards that reveal with stagger
 * - Data pulse effects
 * - Mesh gradient background
 * 
 * Behavioral levers:
 *   - Fogg: Trigger (interactive slider) + Ability (tap, don't type) + Motivation (personalized plan)
 *   - Cialdini: Authority (data-driven), Commitment (slider = micro-commitment)
 *   - Kahneman: System 1 (slider) → System 2 (read the plan) → System 1 (accept)
 */

interface PlanDay {
  day: 1 | 2 | 3
  title: string
  load: number // percentage
  duration: number // minutes
}

const PLANS: Record<string, PlanDay[]> = {
  low: [
    { day: 1, title: 'Recovery Session', load: 23, duration: 20 },
    { day: 2, title: 'Primer Strength', load: 58, duration: 35 },
    { day: 3, title: 'Progressive Load', load: 82, duration: 45 },
  ],
  mid: [
    { day: 1, title: 'Mobility + Core', load: 42, duration: 25 },
    { day: 2, title: 'Foundation Strength', load: 68, duration: 40 },
    { day: 3, title: 'Full Output', load: 91, duration: 55 },
  ],
  high: [
    { day: 1, title: 'Power Training', load: 67, duration: 40 },
    { day: 2, title: 'Volume Session', load: 85, duration: 55 },
    { day: 3, title: 'Peak Performance', load: 96, duration: 65 },
  ],
}

const barColor = (load: number): string => {
  if (load < 45) return 'var(--orange)'
  if (load < 80) return 'var(--paper-muted)'
  return 'var(--emerald)'
}

export function LiveSimulation() {
  const [energy, setEnergy] = useState(5)
  const [showPlan, setShowPlan] = useState(false)
  const [planType, setPlanType] = useState<'low' | 'mid' | 'high'>('mid')

  // Calculate derived values
  const calculatedScore = Math.round(energy * 7.5 + 18)
  const hrvDelta = calculatedScore < 40 ? '−14%' : calculatedScore < 70 ? '−4%' : '+6%'
  const hrvColor = calculatedScore < 40 ? 'var(--error)' : calculatedScore < 70 ? 'var(--orange)' : 'var(--emerald)'

  useEffect(() => {
    const newPlanType = calculatedScore < 40 ? 'low' : calculatedScore < 70 ? 'mid' : 'high'
    setPlanType(newPlanType)
    setShowPlan(true)
  }, [calculatedScore])

  const currentPlan = PLANS[planType]

  return (
    <section className="section section-inset mesh-bg-1" aria-label="Live simulation">
      <div className="container-atelier" style={{ maxWidth: 680 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="label-caps mb-4" style={{ letterSpacing: '0.3em', color: 'var(--paper-faint)' }}>
            Your morning numbers
          </p>
          <h2
            className="font-display text-paper"
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1.1, fontStyle: 'italic' }}
          >
            Your body sent data.
            <br />
            <span style={{ color: 'var(--orange)' }}>This is what it means.</span>
          </h2>
        </motion.div>

        {/* Readiness Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-5 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="label-caps mb-2" style={{ color: 'var(--paper-faint)', letterSpacing: '0.15em' }}>
                Readiness Score
              </p>
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="font-display text-paper"
                  style={{
                    fontSize: 56,
                    lineHeight: 1,
                    fontStyle: 'italic',
                    color: 'var(--orange)',
                  }}
                  key={calculatedScore}
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {calculatedScore}
                </motion.span>
                <span style={{ fontSize: 16, color: 'var(--paper-muted)' }}>/100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="label-caps mb-1" style={{ color: 'var(--paper-faint)', letterSpacing: '0.15em' }}>
                Heart recovery Δ
              </p>
              <motion.span
                className="font-mono text-2xl"
                style={{ color: hrvColor }}
                key={hrvDelta}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {hrvDelta}
              </motion.span>
            </div>
          </div>

          {/* Score bar with pulse tip */}
          <div className="relative">
            <div className="h-1.5 bg-[var(--ink-500)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: 'linear-gradient(90deg, var(--orange), var(--emerald))',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${calculatedScore}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Animated pulse dot at the end */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(249,115,22,0.4)',
                      '0 0 0 8px rgba(249,115,22,0)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Slider Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <label className="text-[var(--paper-faint)] text-xs tracking-[0.2em] uppercase block mb-6">
            How does your body feel right now?
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              className="w-full"
              aria-label="Energy level"
              style={{
                background: `linear-gradient(to right, var(--orange) ${(energy - 1) * 11.1}%, var(--ink-500) ${(energy - 1) * 11.1}%)`,
              }}
            />
            {/* Glow behind thumb */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none"
              style={{
                left: `calc(${(energy - 1) * 11.1}% - 16px)`,
                background: 'var(--orange)',
                filter: 'blur(10px)',
                opacity: 0.4,
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span style={{ fontSize: 11, color: 'var(--paper-faint)', letterSpacing: '0.1em' }}>
              Exhausted
            </span>
            <span style={{ fontSize: 11, color: 'var(--paper-faint)', letterSpacing: '0.1em' }}>
              Energized
            </span>
          </div>
        </motion.div>

        {/* Generated Plan */}
        <AnimatePresence mode="wait">
          {showPlan && (
            <motion.div
              key={planType}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="label-caps" style={{ letterSpacing: '0.2em', color: 'var(--paper-faint)' }}>
                  Generated Plan
                </p>
                <motion.span
                  className="text-xs font-medium"
                  style={{ color: 'var(--emerald)' }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </motion.span>
              </div>

              {/* Day Cards */}
              <div className="space-y-3">
                {currentPlan.map((dayData, index) => (
                  <motion.div
                    key={`${planType}-${dayData.day}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="glass-card p-4 group cursor-default"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="label-caps mb-1" style={{ color: 'var(--paper-faint)', letterSpacing: '0.1em' }}>
                          Day {dayData.day}
                        </p>
                        <p
                          className="font-display text-lg group-hover:text-orange transition-colors"
                          style={{ fontStyle: 'italic', color: 'var(--paper)' }}
                        >
                          {dayData.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="font-mono text-sm"
                          style={{ color: barColor(dayData.load) }}
                        >
                          {dayData.load}%
                        </p>
                        <p className="label-caps" style={{ fontSize: 10, color: 'var(--paper-faint)' }}>
                          LOAD
                        </p>
                      </div>
                    </div>

                    {/* Load bar */}
                    <div className="mt-3 w-full h-1 bg-[var(--ink-500)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: barColor(dayData.load) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${dayData.load}%` }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15 + 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>

                    {/* Duration pill */}
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="text-[10px] px-2 py-1 rounded-full"
                        style={{
                          background: 'var(--card-surface)',
                          color: 'var(--paper-muted)',
                          border: '1px solid var(--card-border)',
                        }}
                      >
                        {dayData.duration} min
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                <motion.a
                  href="#pricing"
                  className="w-full inline-flex items-center justify-center py-4 rounded-xl font-semibold uppercase tracking-wider text-sm cursor-pointer"
                  style={{
                    background: 'var(--orange)',
                    color: 'var(--ink)',
                    boxShadow: '0 0 24px rgba(249,115,22,0.25)',
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(249,115,22,0.35)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Start 3-day trial
                </motion.a>
                <p className="text-center mt-3" style={{ fontSize: 13, color: 'var(--paper-faint)' }}>
                  No credit card required.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}