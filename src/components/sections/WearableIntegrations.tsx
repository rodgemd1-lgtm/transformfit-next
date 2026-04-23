'use client'

import { motion } from 'framer-motion'

/**
 * WearableIntegrations — What each wearable does in TransformFit.
 *
 * Cialdini: Authority — specific data pipelines, not vague "integrations" claims.
 * Fogg: Ability — showing exactly what data flows reduces uncertainty.
 */

const WEARABLES = [
  { brand: 'Whoop', pulls: 'Strain, recovery, HRV, RHR, sleep stages.', uses: 'Strain feeds load rolling sum. Recovery gates intensity ceiling. HRV is primary readiness signal.' },
  { brand: 'Oura', pulls: 'Readiness score, HRV, skin temp, sleep stages, cycle phase.', uses: 'Cycle phase shifts protein targets and rest-day placement. Temp trend informs illness-pause trigger.' },
  { brand: 'Garmin', pulls: 'Training status, body battery, HRV (stress), VO₂max, recovery time.', uses: 'VO₂max trend is the 12-week outcome. Training status cross-checks our adaptive plan.' },
  { brand: 'Apple Watch', pulls: 'HRV, RHR, AFib alerts, workout HR, sleep.', uses: 'HRV is the primary gate. AFib alert pauses plan until cleared — no training through known arrhythmia.' },
  { brand: 'Fitbit', pulls: 'HRV, RHR, sleep, stress-management score.', uses: 'Stress-management score modifies intensity for high-stress weeks. Fallback to RPE when data thin.' },
  { brand: 'No wearable', pulls: 'Nothing. RPE, soreness, hours-slept, energy tick in-app.', uses: 'Same adaptive logic, self-reported signal. ~20% of alpha cohort; 73% week-8 retention.' },
]

export function WearableIntegrations() {
  return (
    <section className="section" aria-label="Wearable integrations">
      <div className="container-atelier" style={{ maxWidth: 820 }}>
        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          What your wearable does here
        </p>
        <p className="mb-10" style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
          Your Whoop told you you&rsquo;re &ldquo;4%.&rdquo; Your Oura said &ldquo;pay attention.&rdquo;
          What&rsquo;s the call for today&rsquo;s session? None of them answered. This layer does.
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {WEARABLES.map((w, i) => (
            <motion.div
              key={w.brand}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-surface p-6 md:p-7"
            >
              <p className="label-caps mb-3" style={{ letterSpacing: '0.25em', color: 'var(--orange)' }}>
                {w.brand}
              </p>
              <p className="mb-2" style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--paper-muted)' }}>
                <span style={{ color: 'var(--paper-faint)' }}>Pulls:</span> {w.pulls}
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--paper-muted)' }}>
                <span style={{ color: 'var(--paper-faint)' }}>Used for:</span> {w.uses}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}