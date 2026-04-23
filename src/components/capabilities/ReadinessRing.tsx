'use client'

import { useRef, useEffect, useState } from 'react'
import { ringCalc } from '@/lib/utils'

/**
 * ReadinessRing — SVG ring gauge showing readiness score.
 *
 * NN/g: Recognition over recall — one number, one color, immediate meaning.
 * Fogg: Reduces friction by visualizing "is this a good day?" in 1 second.
 * Accessibility: aria-label + aria-valuenow + role=progressbar.
 */
interface ReadinessRingProps {
  score: number
  label?: string
  sublabel?: string
  size?: number
  strokeWidth?: number
}

export function ReadinessRing({
  score,
  label = 'Readiness',
  sublabel,
  size = 180,
  strokeWidth = 6,
}: ReadinessRingProps) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { circumference, offset, radius } = ringCalc(score, 100, size / 2, strokeWidth)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Color by score band
  const color =
    score >= 75 ? '#10B981' : score >= 50 ? '#F97316' : '#EA580C'

  return (
    <div className="flex flex-col items-center gap-4" ref={ref}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="progressbar"
          aria-label={`${label}: ${score} out of 100`}
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="readiness-ring-bg"
          />
          {/* Foreground ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="readiness-ring-fg"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            style={{
              transition: `stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)${animated ? '' : ' 0s'}`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display text-paper"
            style={{ fontSize: 48, lineHeight: 1, fontStyle: 'italic' }}
          >
            {score}
          </span>
          <span className="label-caps mt-1" style={{ color: 'var(--paper-faint)' }}>
            / 100
          </span>
        </div>
      </div>

      {/* Pulse ring (ambient animation) */}
      <div
        className="absolute rounded-full animate-pulse-ring pointer-events-none"
        style={{
          width: size,
          height: size,
          border: `1px solid ${color}`,
          opacity: 0,
        }}
        aria-hidden="true"
      />

      <div className="text-center">
        <p className="label-caps" style={{ letterSpacing: '0.2em' }}>{label}</p>
        {sublabel && (
          <p className="mt-1.5" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--paper-muted)' }}>
            {sublabel}
          </p>
        )}
      </div>
    </div>
  )
}