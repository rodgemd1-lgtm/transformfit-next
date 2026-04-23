'use client'

import { useRef, useEffect, useState } from 'react'
import { sparklinePath } from '@/lib/utils'

/**
 * HrvSparkline — SVG sparkline showing HRV trend + baseline.
 *
 * NN/g: Visibility of system status — users see data is updating.
 * Data visualization best practice: dual-line to show trend vs baseline.
 */
interface HrvSparklineProps {
  label: string
  unit?: string
  values: number[]
  baseline: number[]
  caption?: string
  width?: number
  height?: number
  color?: string
  baselineColor?: string
}

export function HrvSparkline({
  label,
  unit = 'ms',
  values,
  baseline,
  caption,
  width = 320,
  height = 120,
  color = 'var(--orange)',
  baselineColor = 'var(--paper-faint)',
}: HrvSparklineProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 150)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const trendPath = sparklinePath(values, width, height)
  const baselinePath = sparklinePath(baseline, width, height)

  // "Today" dot position
  const lastVal = values[values.length - 1]
  const min = Math.min(...values, ...baseline)
  const max = Math.max(...values, ...baseline)
  const range = max - min || 1
  const dotY = 4 + (height - 8) - ((lastVal - min) / range) * (height - 8)

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-baseline justify-between mb-3">
        <p className="label-caps" style={{ letterSpacing: '0.2em' }}>{label}</p>
        <p className="font-display text-paper text-lg" style={{ fontStyle: 'italic' }}>
          {lastVal}<span className="font-sans text-paper-muted text-xs ml-1">{unit}</span>
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${label} chart showing 30-day trend`}
      >
        {/* Baseline (dashed) */}
        <path
          d={baselinePath}
          fill="none"
          stroke={baselineColor}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          style={{
            opacity: visible ? 0.35 : 0,
            transition: 'opacity 0.8s ease-out',
          }}
        />
        {/* Trend line */}
        <path
          d={trendPath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 6px ${color === 'var(--orange)' ? 'rgba(249,115,22,0.3)' : color})`,
            strokeDasharray: visible ? 'none' : '100%',
            strokeDashoffset: visible ? '0' : '100%',
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Today dot */}
        {visible && (
          <circle
            cx={width - 4}
            cy={dotY}
            r={3.5}
            fill={color === 'var(--orange)' ? '#F97316' : color}
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.4s ease 1.2s',
            }}
          />
        )}
      </svg>

      {caption && (
        <p className="mt-2" style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--paper-faint)' }}>
          {caption}
        </p>
      )}
    </div>
  )
}