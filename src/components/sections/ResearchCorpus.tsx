'use client'

import { motion } from 'framer-motion'

/**
 * ResearchCorpus — Clinical credibility at length.
 *
 * Cialdini: Authority — references real research, names researchers,
 *   acknowledges sample-size limitations honestly.
 * Anti-dark-pattern: Won't publish methodology until n=5,000.
 */

export function ResearchCorpus() {
  return (
    <section className="section" aria-label="The research corpus" id="method">
      <div className="container-atelier" style={{ maxWidth: 780 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />
        <p className="label-caps mb-8" style={{ letterSpacing: '0.3em' }}>
          The research corpus
        </p>

        <div className="space-y-7" style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--paper-muted)' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            Adaptive programming isn&rsquo;t a TransformFit claim. HRV-gated training, load-rolling
            periodization, and RPE-cross-checked zone-2 are a decade of peer-reviewed work across
            Plews, Laursen, Seiler, Flatt, and the Norwegian endurance tradition. We implemented
            the literature. We didn&rsquo;t invent it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The periodization stack leans on Mike Israetel&rsquo;s volume-landmark work for the
            strength block. The longevity framing references Peter Attia&rsquo;s centenarian decathlon,
            Andy Galpin&rsquo;s muscle physiology, and Stacy Sims&rsquo;s cycle-aware programming
            for the perimenopause and postpartum tracks. Citations live at
            transformfit.app/method (post n=5,000 cohort — we don&rsquo;t want to publish a
            methodology with a sample size we&rsquo;d revise away from).
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The coach-voice architecture is designed against our own Coach Doctrine — ten capability
            layers including point of view, innovation heuristics, value detection, reasoning modes,
            case memory, experiment design, uncertainty logic, creative tension, narrative identity,
            and meta-cognition. Knowledge is the floor. Judgment is the differentiator.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Not shipping the methodology paper yet means not shipping it. We will when the cohort
            supports it. Until then you&rsquo;re looking at a functional product that works on alpha
            users — and a company that would rather publish late than publish wrong.
          </motion.p>
        </div>
      </div>
    </section>
  )
}