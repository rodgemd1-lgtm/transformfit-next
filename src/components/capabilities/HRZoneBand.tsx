'use client'

import { useRef, useEffect, useState } from 'react'

/**
 * HRZoneBand — Heart rate zone visualization for session cards.
 * Shows time-in-zone as vertical bands, mimicking Whoop-style output.
 *
 * NN/g: Aesthetic and minimalist design — show complex data in one glance.
 */
interface HRZoneBandProps {
  label: string
  sublabel?: string
  points: number[]
  height?: number
  zones?: { max: number; color: string; label: string }[]
}

export function HRZoneBand({
  label,
  sublabel,
  points,
  height = 80,
  zones = [
    { max: 107, color: 'rgba(16,185,129,0.6)', label: 'Zone 1' },  // Recovery
    { max: 126, color: 'rgba(59,130,246,0.6)', label: 'Zone 2' },   // Fat burn
    { max: 145, color: 'rgba(249,115,22,0.6)', label: 'Zone 3' },   // Cardio
    { max: 163, color: 'rgba(239,68,68,0.6)', label: 'Zone 4' },    // Peak
    { max: 180, color: 'rgba(220,38,38,0.8)', label: 'Zone 5' },    // Max
  ],
}: HRZoneBandProps) {
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

  const minHR = Math.min(...points)
  const maxHR = Math.max(...points)
  const range = maxHR - minHR || 1

  // Build catmull-rom path
  const padding = 2
  const w = 100
  const h = height

  const coords = points.map((hr, i) => ({
    x: padding + (i / (points.length - 1)) * (w - padding * 2),
    y: padding + ((maxHR - hr) / range) * (h - padding * 2),
  }))

  let d = `M${coords[0].x},${coords[0].y}`
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(0, i - 1)]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[Math.min(coords.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }

  // Zone fills (horizontal bands)
  const zoneBands = zones.map((z) => {
    const yTop = padding + ((maxHR - z.max) / range) * (h - padding * 2)
    return { ...z, yTop: Math.max(0, yTop) }
  })

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <p className="label-caps" style={{ letterSpacing: '0.2em' }}>{label}</p>
          {sublabel && (
            <p className="mt-1" style={{ fontSize: 12, color: 'var(--paper-faint)' }}>{sublabel}</p>
          )}
        </div>
        <p className="font-display text-paper" style={{ fontSize: 18, fontStyle: 'italic' }}>
          {Math.round(points.reduce((a, b) => a + b, 0) / points.length)} avg
        </p>
      </div>

      <div className="relative" style={{ height }}>
        {/* Zone bands */}
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {zoneBands.map((zb) => (
            <rect
              key={zb.label}
              x="0"
              y={zb.yTop}
              width={w}
              height={h - zb.yTop}
              fill={zb.color}
              opacity={0.08}
            />
          ))}
        </svg>

        {/* HR curve */}
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label={label}
        >
          <path
            d={d}
            fill="none"
            stroke="var(--orange)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{
              opacity: visible ? 1 : 0,
              strokeDasharray: visible ? 'none' : '200',
              strokeDashoffset: visible ? '0' : '200',
              transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
            }}
          />
        </svg>
      </div>

      {/* Zone legend */}
      <div className="flex flex-wrap gap-3 mt-3">
        {zones.map((z) => (
          <div key={z.label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: z.color.replace('0.6', '1').replace('0.8', '1') }}
            />
            <span style={{ fontSize: 10, color: 'var(--paper-faint)' }}>{z.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}