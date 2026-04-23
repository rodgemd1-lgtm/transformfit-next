'use client'

import { motion } from 'framer-motion'

/**
 * BreathingCircle — Animated breathing exercise circle.
 * Shows TransformFit's wellness capability, not just training.
 *
 * Fogg: Ability — breathing is the lowest-friction wellness action.
 * NN/g: Aesthetic and minimalist — one circle, one instruction.
 */
interface BreathingCircleProps {
  duration?: number // breath cycle in seconds
  label?: string
}

export function BreathingCircle({
  duration = 8,
  label = 'Breathe',
}: BreathingCircleProps) {
  // 4-4 breathing (inhale 4s, hold 0, exhale 4s)
  const cycleDuration = duration * 1000

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: 120, height: 120 }}>
        {/* Outer glow pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--emerald-faint)' }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.08, 0.3],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
        {/* Inner circle */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: 20,
            background: 'var(--emerald-muted)',
            border: '2px solid var(--emerald)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Instruction text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="label-caps"
            style={{ color: 'var(--emerald)', letterSpacing: '0.2em', fontSize: 10 }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </div>
  )
}