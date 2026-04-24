'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HeroClinical — Cinematic hero (2026 Whoop/Superhuman standard)
 *
 * Enhanced with:
 * - Gradient mesh background (not flat black)
 * - Parallax scroll depth
 * - Staggered reveal animations
 * - Orange glow pulse on data cards
 * - Micro-interactions on CTA
 *
 * Fogg behavior mapping:
 *   Trigger: Morning readout numbers (sleep, HRV, time window)
 *   Ability: Shows the plan adjusting before signup — increases perceived capability
 *   Motivation: Data-forward framing respects quantified-self users who distrust hype
 *
 * Cialdini: Authority (clinical data), Commitment (2-question Ladder below)
 * NN/g: F-pattern, inverted pyramid, visible system status
 */

interface ReadoutItem {
  label: string
  value: string
  unit?: string
}

interface HeroClinicalProps {
  eyebrow?: string
  line1: string
  line2: string
  closer: string
  readouts?: ReadoutItem[]
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const readoutVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.9 + i * 0.12,
      ease: easeOutExpo,
    },
  }),
}

export function HeroClinical({
  eyebrow = 'Readiness, read honestly',
  line1,
  line2,
  closer,
  readouts = [],
}: HeroClinicalProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const meshOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Gradient mesh background (cinematic, not flat) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary mesh glow — warm orange radial */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 25% 50%, rgba(249,115,22,0.06), transparent 70%)',
            opacity: meshOpacity,
          }}
        />
        {/* Secondary mesh layer — cool edge */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 40% 60% at 80% 30%, rgba(16,185,129,0.03), transparent 60%)',
            opacity: meshOpacity,
          }}
        />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
            opacity: 0.4,
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--ink), transparent)' }}
        />
      </div>

      {/* ── Content with parallax ── */}
      <motion.div
        className="container-atelier relative z-10 pt-28 pb-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="label-caps mb-8"
          style={{ letterSpacing: '0.3em' }}
        >
          {eyebrow}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOutExpo }}
          className="font-display text-paper max-w-3xl"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05, fontStyle: 'italic' }}
        >
          <span className="block">{line1}</span>
          <motion.span
            className="block mt-2"
            style={{ color: 'var(--orange)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easeOutExpo }}
          >
            {line2}
          </motion.span>
        </motion.h1>

        {/* Closer paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 max-w-xl"
          style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--paper-muted)' }}
        >
          {closer}
        </motion.p>

        {/* ── Morning readout strip — the data hook ── */}
        {readouts.length > 0 && (
          <motion.div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3"
            initial="hidden"
            animate="visible"
          >
            {readouts.map((r, i) => (
              <motion.div
                key={r.label}
                className="glass-card p-4 md:p-5 group cursor-default"
                style={{ borderRadius: 'var(--radius-sharp)' }}
                custom={i}
                variants={readoutVariants}
                whileHover={{
                  y: -3,
                  borderColor: 'rgba(249,115,22,0.3)',
                  transition: { duration: 0.2 },
                }}
              >
                <p className="label-caps mb-1.5" style={{ color: 'var(--paper-faint)' }}>
                  {r.label}
                </p>
                <motion.p
                  className="font-display text-paper"
                  style={{ fontSize: 24, fontStyle: 'italic' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {r.value}
                  {r.unit && (
                    <span
                      className="font-sans ml-1"
                      style={{ fontSize: 13, color: 'var(--paper-muted)', fontStyle: 'normal' }}
                    >
                      {r.unit}
                    </span>
                  )}
                </motion.p>
                {/* Hover glow line */}
                <div
                  className="mt-2 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'var(--orange)', opacity: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#coach"
            className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 rounded-sharp cursor-pointer"
            style={{
              background: 'var(--orange)',
              color: 'var(--ink)',
              boxShadow: '0 0 24px rgba(249,115,22,0.2), 0 4px 12px rgba(0,0,0,0.3)',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 40px rgba(249,115,22,0.35), 0 8px 24px rgba(0,0,0,0.4)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            See your morning readout
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.a>
          <a
            href="#coach"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-medium cursor-pointer"
            style={{ color: 'var(--paper-muted)' }}
          >
            Two questions. No email.
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 5.5L6 8.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Ambient orange glow (bottom) ── */}
      <div
        className="absolute bottom-0 left-1/4 w-1/2 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.04), transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}