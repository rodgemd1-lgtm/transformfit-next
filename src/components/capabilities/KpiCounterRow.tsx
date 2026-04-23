'use client'

import { useRef, useEffect, useState } from 'react'

/**
 * KpiCounterRow — Animated KPI strip showing weekly clinical readout.
 *
 * Fogg: Prominence of key numbers reduces cognitive load.
 * Cialdini: Authority through specific data — not vague claims.
 * NN/g: Consistency + standards — same layout across all KPIs.
 */
interface KpiItem {
  label: string
  value: string | number
  unit?: string
  trend?: number[]
  emphasis?: boolean
}

interface KpiCounterRowProps {
  caption?: string
  items: KpiItem[]
}

function MiniTrend({ values, emphasis }: { values: number[]; emphasis?: boolean }) {
  const h = 20
  const w = 48
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: h - 2 - ((v - min) / range) * (h - 4),
  }))

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path
        d={pathD}
        fill="none"
        stroke={emphasis ? 'var(--orange)' : 'var(--paper-faint)'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function KpiCounterRow({ caption, items }: KpiCounterRowProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {caption && (
        <p className="label-caps mb-8 text-center" style={{ letterSpacing: '0.3em' }}>
          {caption}
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="card-surface p-5 md:p-6"
            style={{
              borderLeft: item.emphasis
                ? '2px solid var(--orange)'
                : undefined,
            }}
          >
            <p className="label-caps mb-2" style={{ color: 'var(--paper-faint)' }}>
              {item.label}
            </p>
            <p
              className="font-display text-paper"
              style={{
                fontSize: 28,
                lineHeight: 1,
                fontStyle: 'italic',
              }}
            >
              {typeof item.value === 'number'
                ? visible
                  ? item.value
                  : 0
                : item.value}
              {item.unit && (
                <span
                  className="font-sans text-paper-muted ml-1"
                  style={{ fontSize: 13, fontStyle: 'normal' }}
                >
                  {item.unit}
                </span>
              )}
            </p>
            {item.trend && (
              <div className="mt-3">
                <MiniTrend values={item.trend} emphasis={item.emphasis} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}