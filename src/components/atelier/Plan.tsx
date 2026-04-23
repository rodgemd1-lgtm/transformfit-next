'use client'

import { motion } from 'framer-motion'
import { SITE } from '@/lib/utils'

/**
 * Plan — Pricing section. Paywall-as-receipt model.
 *
 * Cialdini: Scarcity (founding member cap), Authority (founder guarantee),
 *   Commitment (90-day guarantee demands you commit).
 * Fogg: Ability — simple pricing, one choice, cancel-in-one-tap.
 * MiroFish: #2 churn driver (21%) is pricing opacity. This is as transparent as it gets.
 */
export function Plan() {
  return (
    <section className="section" aria-label="Pricing" id="pricing">
      <div className="container-atelier" style={{ maxWidth: 760 }}>
        <p className="label-caps mb-10 text-center" style={{ letterSpacing: '0.3em' }}>
          Pricing, in plain English
        </p>

        {/* Founding plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="card-surface p-8 md:p-10 mb-4"
          style={{ borderLeft: '3px solid var(--orange)' }}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="label-caps mb-2" style={{ color: 'var(--orange)', letterSpacing: '0.25em' }}>
                Founding member
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-paper"
                  style={{ fontSize: 44, lineHeight: 1, fontStyle: 'italic' }}
                >
                  ${SITE.pricing.founding}
                </span>
                <span style={{ fontSize: 14, color: 'var(--paper-muted)' }}>
                  for {SITE.pricing.foundingMonths} months
                </span>
              </div>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              'Full adaptive plan · reads your sleep, HRV, soreness, schedule',
              'Sunday coach notes · written, not generated',
              'Wearable integrations · Oura, Whoop, Garmin, Apple Watch',
              'Named head coach · Aisha Park reviews your week',
              `Rolls to $${SITE.pricing.monthly}/mo after 90 days · locked for life`,
              `If the product goes lower, you match the lower price`,
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'var(--emerald-muted)' }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path d="M1.5 4L3 5.5L6.5 2.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--paper-muted)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
          >
            Start the 90 days
          </a>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-surface p-6 md:p-8"
        >
          <p className="label-caps mb-3" style={{ letterSpacing: '0.25em' }}>
            {SITE.pricing.guarantee} guarantee
          </p>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
            Follow the plan as written for 12 weeks. If you can&rsquo;t point to one measurable thing
            that moved — strength, HR, composition, something in your week — {SITE.founder} refunds
            the ${SITE.pricing.founding} personally. No asterisks. Cancel is one tap in settings.
            Your data exports as JSON on the way out.
          </p>
        </motion.div>
      </div>
    </section>
  )
}