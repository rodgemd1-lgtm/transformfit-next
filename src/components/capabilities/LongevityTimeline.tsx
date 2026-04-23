'use client'

/**
 * LongevityTimeline — Multi-decade healthspan visualization.
 * Inspired by Elyx/Continuum-style longevity framing.
 *
 * Cialdini: Authority (clinical markers), Consistency (multi-decade commitment framing)
 * NN/g: Recognition over recall — key inflection points visible at a glance
 */

interface TimelineMarker {
  age: number
  label: string
  emphasis?: boolean
}

interface LongevityTimelineProps {
  fromAge: number
  toAge: number
  currentAge: number
  markers: TimelineMarker[]
  caption?: string
}

export function LongevityTimeline({
  fromAge,
  toAge,
  currentAge,
  markers,
  caption,
}: LongevityTimelineProps) {
  const totalSpan = toAge - fromAge
  const ageToPercent = (age: number) => ((age - fromAge) / totalSpan) * 100

  return (
    <div>
      <div className="relative" style={{ height: 180 }}>
        {/* Timeline track */}
        <div
          className="absolute left-0 right-0"
          style={{ top: 40, height: 2, background: 'var(--ink-500)' }}
        />

        {/* Current age marker */}
        <div
          className="absolute"
          style={{
            left: `${ageToPercent(currentAge)}%`,
            top: 24,
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: 'var(--orange)' }}
          />
          <p
            className="label-caps mt-2 text-center whitespace-nowrap"
            style={{ color: 'var(--orange)', letterSpacing: '0.15em', fontSize: 10 }}
          >
            You · {currentAge}
          </p>
        </div>

        {/* Markers */}
        {markers.map((m) => (
          <div
            key={m.age}
            className="absolute"
            style={{
              left: `${ageToPercent(m.age)}%`,
              top: m.emphasis ? 8 : 50,
              transform: 'translateX(-50%)',
            }}
          >
            <div
              className="w-2 h-2 rounded-full mx-auto"
              style={{
                background: m.emphasis ? '#DC2626' : 'var(--paper-faint)',
                boxShadow: m.emphasis ? '0 0 8px rgba(220,38,38,0.4)' : 'none',
              }}
            />
            <div className="text-center mt-1.5 whitespace-nowrap" style={{ maxWidth: 140 }}>
              <p
                className="label-caps"
                style={{
                  letterSpacing: '0.1em',
                  fontSize: 10,
                  color: m.emphasis ? 'var(--paper)' : 'var(--paper-faint)',
                }}
              >
                {m.age}
              </p>
              <p
                style={{
                  fontSize: 11,
                  lineHeight: 1.35,
                  color: m.emphasis ? 'var(--paper-muted)' : 'var(--paper-faint)',
                }}
              >
                {m.label}
              </p>
            </div>
          </div>
        ))}

        {/* Age labels at edges */}
        <p
          className="absolute label-caps"
          style={{ left: 0, bottom: 0, color: 'var(--paper-faint)', fontSize: 10 }}
        >
          {fromAge}
        </p>
        <p
          className="absolute label-caps"
          style={{ right: 0, bottom: 0, color: 'var(--paper-faint)', fontSize: 10 }}
        >
          {toAge}
        </p>
      </div>

      {caption && (
        <p className="mt-6 text-center" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--paper-muted)' }}>
          {caption}
        </p>
      )}
    </div>
  )
}