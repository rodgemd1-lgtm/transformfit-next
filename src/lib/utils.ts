export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]) {
  return inputs
    .flatMap((input) => {
      if (!input) return []
      if (typeof input === 'string') return [input]
      return Object.entries(input)
        .filter(([, v]) => v)
        .map(([k]) => k)
    })
    .join(' ')
}

/**
 * Format a number for display (e.g., KPI counters)
 */
export function formatNumber(value: number, options?: { decimals?: number; unit?: string }): string {
  const { decimals = 0, unit = '' } = options ?? {}
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return unit ? `${formatted}${unit}` : formatted
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Calculate stroke dash array/offset for SVG rings
 */
export function ringCalc(
  value: number,
  max: number,
  radius: number,
  strokeWidth: number = 6
): { circumference: number; offset: number; radius: number } {
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const progress = clamp(value / max, 0, 1)
  const offset = circumference * (1 - progress)
  return { circumference, offset, radius: normalizedRadius }
}

/**
 * Generate HRV sparkline path from values
 */
export function sparklinePath(
  values: number[],
  width: number,
  height: number,
  options?: { padding?: number; smooth?: boolean }
): string {
  const { padding = 4, smooth = true } = options ?? {}
  if (values.length < 2) return ''

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const plotW = width - padding * 2
  const plotH = height - padding * 2

  const points = values.map((v, i) => ({
    x: padding + (i / (values.length - 1)) * plotW,
    y: padding + plotH - ((v - min) / range) * plotH,
  }))

  if (!smooth) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  }

  // Catmull-Rom to cubic bezier smoothing
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return d
}

/**
 * Constants
 */
export const SITE = {
  name: 'TransformFit',
  tagline: 'For the week you are actually having.',
  url: 'https://transformfit.app',
  description: 'A fitness coaching app that reads the week you are actually having — sleep, soreness, stress, schedule — and bends the plan to fit.',
  founder: 'Mike Rodgers',
  coach: 'Aisha Park',
  coachTitle: 'Head Coach · Strength & Recovery',
  pricing: {
    monthly: 29,
    founding: 299,
    foundingMonths: 3,
    guarantee: '90-day',
    guaranteeRefund: true,
  },
} as const

/**
 * Type-safe style utility — converts CSS custom property to var()
 */
export function cssVar(name: string): string {
  return `var(--${name})`
}

/**
 * Intersection Observer hook helper (for scroll reveals)
 */
export const REVEAL_THRESHOLD = 0.15
export const REVEAL_ROOT_MARGIN = '0px 0px -40px 0px'