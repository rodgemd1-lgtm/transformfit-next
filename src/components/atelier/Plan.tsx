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
          3 days free. Then it's yours or it's gone.
        </p>

        {/* 3-day trial */}
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
                3-day free trial
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-paper"
                  style={{ fontSize: 44, lineHeight: 1, fontStyle: 'italic' }}
                >
                  Free
                </span>
                <span style={{ fontSize: 14, color: 'var(--paper-muted)' }}>
                  for 3 days, then ${SITE.pricing.monthly}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Day-by-day timeline */}
          <div className="mb-8 space-y-4">
            {[
              { day: 'Day 1', desc: 'Your plan generates. The coach learns your body.' },
              { day: 'Day 2', desc: 'The plan adjusts. You feel the difference.' },
              { day: 'Day 3', desc: 'You decide. Keep it or cancel. No tricks.' },
            ].map((item) => (
              <div key={item.day} className="flex items-start gap-3">
                <span className="label-caps flex-shrink-0" style={{ color: 'var(--orange)', letterSpacing: '0.1em', minWidth: '4.5rem' }}>
                  {item.day}
                </span>
                <span style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--paper-muted)' }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const btn = form.querySelector('button');
              const input = form.querySelector('input');
              if (btn) btn.textContent = 'Starting...';
              
              try {
                await fetch('/api/trial', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: input?.value })
                });
                if (btn) {
                  btn.textContent = 'Check your email';
                  btn.style.backgroundColor = '#10B981';
                }
                setTimeout(() => {
                  window.location.href = '/dashboard';
                }, 1500);
              } catch (err) {
                if (btn) btn.textContent = 'Build my plan';
              }
            }}
            className="flex w-full md:w-auto items-center gap-2"
          >
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="px-4 py-3 rounded-sharp bg-ink border border-card-border text-paper text-sm w-full md:w-64 focus:outline-none focus:border-orange transition-colors"
            />
            <button type="submit" className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer">
              Build my plan
            </button>
          </form>
          <span style={{ fontSize: 13, color: 'var(--paper-faint)' }}>
            No credit card · No email wall
          </span>
        </div>

          {/* Pricing-as-receipt */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--card-border)' }}>
            <p className="label-caps mb-3" style={{ letterSpacing: '0.2em' }}>
              After 3 days
            </p>
            <ul className="space-y-2">
              {[
                `Full adaptive plan · reads your sleep, heart recovery, soreness, schedule`,
                `Named head coach · ${SITE.coach} reviews your week`,
                `Wearable integrations · Oura, Whoop, Garmin, Apple Watch`,
                `Sunday coach notes · written, not generated`,
                `$${SITE.pricing.monthly}/mo · cancel anytime in settings`,
                `$24/mo annual · locked for life`,
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
          </div>
        </motion.div>

        {/* Loss aversion close */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-surface p-6 md:p-8"
        >
          <p
            className="font-display text-paper mb-4"
            style={{ fontSize: 20, lineHeight: 1.35, fontStyle: 'italic' }}
          >
            3 days from now, you'll either have a plan that knows you, or you'll be back to guessing. Your call.
          </p>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--paper-muted)' }}>
            {SITE.pricing.guarantee} guarantee. Follow the plan as written. If you can&rsquo;t point to one measurable
            thing that moved — strength, HR, composition, something in your week — {SITE.founder} refunds
            the ${SITE.pricing.founding} personally. No asterisks. Cancel is one tap. Your data exports as JSON on the way out.
          </p>
        </motion.div>
      </div>
    </section>
  )
}