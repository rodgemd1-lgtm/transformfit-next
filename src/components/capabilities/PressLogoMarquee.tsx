'use client'

import { motion } from 'framer-motion'

/**
 * PressLogoMarquee — Scrolling brand logos for wearable integrations.
 *
 * Cialdini: Social proof + authority. Known brand names transfer trust.
 * NN/g: Recognition over recall — logos are instantly identified.
 */
const BRANDS = [
  'Oura', 'Whoop', 'Garmin', 'Apple Watch', 'Fitbit',
  'Withings', 'Samsung Galaxy Watch', 'Amazfit',
]

export function PressLogoMarquee() {
  // Duplicate for seamless loop
  const items = [...BRANDS, ...BRANDS]

  return (
    <section className="py-10 overflow-hidden" aria-label="Wearable integrations">
      <div className="container-atelier mb-6">
        <p className="label-caps text-center" style={{ letterSpacing: '0.3em', color: 'var(--paper-faint)' }}>
          Reads data from
        </p>
      </div>

      <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        <motion.div
          className="flex gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {items.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ minWidth: 120 }}
            >
              <span
                className="font-display text-paper-muted uppercase"
                style={{
                  fontSize: 13,
                  letterSpacing: '0.15em',
                  whiteSpace: 'nowrap',
                  opacity: 0.5,
                }}
              >
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}