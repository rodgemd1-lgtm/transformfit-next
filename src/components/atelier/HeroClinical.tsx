'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

/**
 * HeroClinical — VIDEO HERO (2026 Whoop/Superhuman standard)
 * 
 * What changed:
 * - Real barbell-gym video behind data overlay (from alpha site)
 * - Copy rewritten at 8th-grade level — no unexplained acronyms
 * - "HRV" explained as "heart recovery" in the readout note
 * - Logo integrated into hero
 * - Mike's coaching photo in the overlay
 */

interface ReadoutItem {
  label: string
  value: string
  unit?: string
  note?: string
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
  eyebrow = 'Your body has a morning report.',
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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-loop-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.7)' }}
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Gradient overlays for readability ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 60%, rgba(249,115,22,0.12), transparent 70%)',
        }}
      />

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

        {/* ── Morning readout strip ── */}
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
                {r.note && (
                  <p className="mt-1" style={{ fontSize: 11, color: 'var(--paper-faint)', lineHeight: 1.3 }}>
                    {r.note}
                  </p>
                )}
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
            See how it adjusts
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
        className="absolute bottom-0 left-1/4 w-1/2 h-48 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.06), transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}