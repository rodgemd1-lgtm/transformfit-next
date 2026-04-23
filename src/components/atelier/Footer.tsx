'use client'

import { SITE } from '@/lib/utils'

/**
 * Footer — Minimal, honest footer.
 *
 * No dark patterns. No newsletter capture. No social-proof carousel.
 * Cialdini: Liking through honesty. Unity through shared values.
 */
export function Footer({ tagline }: { tagline?: string }) {
  return (
    <footer className="border-t border-card-border" role="contentinfo">
      <div className="container-atelier py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand column */}
          <div>
            <span className="font-display text-paper italic text-lg">
              {SITE.name}
            </span>
            <p
              className="mt-2"
              style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--paper-muted)' }}
            >
              {tagline ?? SITE.tagline}
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="label-caps mb-4" style={{ letterSpacing: '0.2em' }}>
              Product
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Demo Dashboard', href: '/dashboard' },
                { label: 'Method', href: '#method' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Coach: Aisha Park', href: '#coach' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="accent-underline"
                    style={{ fontSize: 14, color: 'var(--paper-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust column */}
          <div>
            <p className="label-caps mb-4" style={{ letterSpacing: '0.2em' }}>
              Trust
            </p>
            <ul className="space-y-2.5" style={{ fontSize: 14, color: 'var(--paper-muted)' }}>
              <li>Cancel in one tap. No gauntlet.</li>
              <li>Data exports as JSON. Yours in, yours out.</li>
              <li>No retargeting. No pixel after you leave.</li>
              <li>Coach voice is labeled. AI fills specifics.</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--card-border)' }}
        >
          <p style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
            &copy; {new Date().getFullYear()} {SITE.name} Inc. · {SITE.founder}, Founder
          </p>
          <p style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
            Built with honesty, not dark patterns.
          </p>
        </div>
      </div>
    </footer>
  )
}