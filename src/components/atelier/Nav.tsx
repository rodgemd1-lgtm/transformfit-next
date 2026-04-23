'use client'

import { motion } from 'framer-motion'
import { cn, SITE } from '@/lib/utils'

/* ── Nav ───────────────────────────────────────────────
   Sticky top nav. Minimal — logo + wordmark + 2 CTAs.
   Fogg: Visibility + simplicity reduce cognitive load.
   NN/g: Consistent nav position across pages.
   ─────────────────────────────────────────────────────── */

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-card-border bg-ink/90 backdrop-blur-md"
    >
      <div className="container-atelier flex items-center justify-between h-14">
        {/* Wordmark */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="TransformFit home">
          <div
            className="w-6 h-6 rounded-sharp flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-warm))' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v10M1 6h10" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-display text-paper text-[17px] italic tracking-tight">
            {SITE.name}
          </span>
        </a>

        {/* Right side: minimal links + CTA */}
        <div className="flex items-center gap-6">
          <a
            href="#method"
            className="hidden sm:inline-block text-paper-muted text-[13px] tracking-label uppercase font-medium hover:text-paper transition-colors"
          >
            Method
          </a>
          <a
            href="#pricing"
            className="hidden sm:inline-block text-paper-muted text-[13px] tracking-label uppercase font-medium hover:text-paper transition-colors"
          >
            Pricing
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-wide uppercase font-semibold px-4 py-1.5 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
          >
            Open demo
          </a>
        </div>
      </div>
    </motion.nav>
  )
}