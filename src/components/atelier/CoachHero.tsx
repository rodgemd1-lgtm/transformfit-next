'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicPlanPreview } from '@/components/atelier/DynamicPlanPreview'

/**
 * CoachHero — Inline progressive questioning hero.
 * 
 * The coach EMERGES from the conversation, not from a card selector.
 * TELOS architecture: Being Layer (WHY) determines Doing Layer (HOW).
 * 
 * Step 1: "What does your energy feel like right now, honestly?"
 *   → Energy state selection (single tap, color-coded)
 * Step 2: "What usually gets in the way?"
 *   → Obstacle selection (single tap)
 * Step 3: Personalized coach response
 *   → 16 combinations (4 energy × 4 obstacle)
 * Step 4: How It Works reveal
 *   → Agent system progressive disclosure
 * 
 * Behavioral levers:
 *   - Liking: Coach demonstrates it knows you after 2 questions
 *   - Consistency: 3 micro-commitments in sequence (tap, tap, read)
 *   - Reciprocity: We personalize before asking for anything
 *   - Progressive disclosure: 2-3 layers max (UX research)
 * 
 * Cialdini: Liking + Consistency + Reciprocity (staged)
 * Kahneman: System 1 → System 2 → System 1
 * Fogg: Trigger (question) + Ability (tap, don't type) + Motivation (personalized response)
 */

// ── Types ──────────────────────────────────────────────────────

type EnergyState = 'low_energy' | 'stressed' | 'focused' | 'ready'
type ObstacleType = 'accountability' | 'autonomy' | 'data' | 'identity'
type IdentityAnchor = 'Architect' | 'Organizer' | 'Warrior' | 'Phoenix' | 'Leader' | 'Explorer'
type EntryPath = 'accountability' | 'autonomy' | 'data' | 'identity'
type AgentVoice = 'SPARK' | 'PULSE' | 'IRON' | 'EDGE'

interface EnergyOption {
  label: string
  state: EnergyState
  anchor: IdentityAnchor
  path: EntryPath
  color: string
  accent: string
}

interface ObstacleOption {
  label: string
  shortLabel: string
  type: ObstacleType
}

interface CoachResponse {
  message: string
  agentVoice: AgentVoice
  identity: IdentityAnchor
  dataSource: string // what data the coach references
}

interface CoachHeroProps {
  onStepComplete?: (step: number, data: Record<string, string>) => void
  onAllStepsComplete?: (data: {
    energy: EnergyState
    obstacle: ObstacleType
    anchor: IdentityAnchor
    path: EntryPath
    response: CoachResponse
  }) => void
}

// ── Data ───────────────────────────────────────────────────────

const ENERGY_OPTIONS: EnergyOption[] = [
  {
    label: 'Low energy',
    accent: 'Low',
    state: 'low_energy',
    anchor: 'Architect',
    path: 'autonomy',
    color: 'var(--orange)',
  },
  {
    label: 'Stressed',
    accent: 'Stressed',
    state: 'stressed',
    anchor: 'Phoenix',
    path: 'identity',
    color: 'var(--error)',
  },
  {
    label: 'Focused',
    accent: 'Focused',
    state: 'focused',
    anchor: 'Leader',
    path: 'accountability',
    color: 'var(--info)',
  },
  {
    label: 'Ready',
    accent: 'Ready',
    state: 'ready',
    anchor: 'Explorer',
    path: 'data',
    color: 'var(--emerald)',
  },
]

const OBSTACLE_OPTIONS: ObstacleOption[] = [
  { label: 'I stop when life gets busy', shortLabel: 'Life gets in the way', type: 'accountability' },
  { label: 'I don\'t know what to do', shortLabel: 'Not sure where to start', type: 'autonomy' },
  { label: 'I need to see the numbers', shortLabel: 'Show me the data', type: 'data' },
  { label: 'I forget why I started', shortLabel: 'Lose motivation', type: 'identity' },
]

// 16 personalized responses (4 energy × 4 obstacle)
const COACH_RESPONSES: Record<EnergyState, Record<ObstacleType, CoachResponse>> = {
  low_energy: {
    accountability: {
      message: 'Busy Tuesday. I scaled your plan down to 20 minutes. You showed up anyway — that counts. I\'ll check in tomorrow.',
      agentVoice: 'PULSE',
      identity: 'Architect',
      dataSource: 'Readiness score adjusted. Session: mobility + core.',
    },
    autonomy: {
      message: 'Low energy today. I built the plan around it — just follow it. 20 minutes. No decisions needed.',
      agentVoice: 'IRON',
      identity: 'Architect',
      dataSource: 'Readiness 62%. Adjusted to maintenance mode.',
    },
    data: {
      message: 'Readiness score: 62%. Session adjusted to mobility + core. Heart recovery is 14% below your normal. That means go light today.',
      agentVoice: 'PULSE',
      identity: 'Architect',
      dataSource: 'Heart recovery: 38ms (your normal is 44ms). Sleep: 5.1 hrs.',
    },
    identity: {
      message: 'This week tried to break you. It didn\'t. The plan already adjusted. Rest is part of the architecture.',
      agentVoice: 'SPARK',
      identity: 'Architect',
      dataSource: 'Plan adjusted. Wednesday: strength returns.',
    },
  },
  stressed: {
    accountability: {
      message: 'Stressed and showing up anyway. That\'s everything. I\'ve got tomorrow written. Tonight, just breathe.',
      agentVoice: 'SPARK',
      identity: 'Phoenix',
      dataSource: 'Stress recovery mode. Session: 15 min mobility.',
    },
    autonomy: {
      message: 'Hard day. The plan is 20 minutes. Just start it. It knows what you need — you don\'t have to think.',
      agentVoice: 'IRON',
      identity: 'Phoenix',
      dataSource: 'Session auto-scaled. No decisions required.',
    },
    data: {
      message: 'Heart recovery dropped 14% from baseline. Stress recovery mode activated. Tomorrow\'s session shifts to zone-2. The plan adapts before you ask.',
      agentVoice: 'PULSE',
      identity: 'Phoenix',
      dataSource: 'Readiness: 58%. Heart recovery: −14%. Adjusting Wednesday to deload.',
    },
    identity: {
      message: 'Phoenixes don\'t skip hard days. They show up differently. That\'s what you just did.',
      agentVoice: 'SPARK',
      identity: 'Phoenix',
      dataSource: 'Plan: restructured around stress. Strength moves to Thursday.',
    },
  },
  focused: {
    accountability: {
      message: 'Checking in on a focused day. The plan is loaded. I\'m here if you need me. Go prove something.',
      agentVoice: 'EDGE',
      identity: 'Leader',
      dataSource: 'Readiness: 78%. Full session available.',
    },
    autonomy: {
      message: 'Focused and ready. Your plan is built. No adjustments needed. Go execute.',
      agentVoice: 'IRON',
      identity: 'Leader',
      dataSource: 'Readiness: 82%. All systems green.',
    },
    data: {
      message: 'Readiness 85%. Heart recovery trending up 6% week-over-week. Optimized for progressive overload today. The data says: push.',
      agentVoice: 'PULSE',
      identity: 'Leader',
      dataSource: 'Readiness: 85%. Heart recovery: 49ms (+6%). Volume tolerance: high.',
    },
    identity: {
      message: 'The Leader never wastes a clear day. This plan was built for moments like this.',
      agentVoice: 'EDGE',
      identity: 'Leader',
      dataSource: 'Plan: optimized. All metrics green.',
    },
  },
  ready: {
    accountability: {
      message: 'You\'re ready. I\'ll be here when you need me. Today is yours.',
      agentVoice: 'SPARK',
      identity: 'Explorer',
      dataSource: 'Readiness: 91%. Peak performance window.',
    },
    autonomy: {
      message: 'Ready state. Full plan loaded. No adjustments. Go.',
      agentVoice: 'IRON',
      identity: 'Explorer',
      dataSource: 'Readiness: 93%. All zones available.',
    },
    data: {
      message: 'All metrics green. Readiness 91%. Heart recovery stable at 46ms. Sleep: 7.8 hrs. Optimized session, maximum output. The data says: this is your day.',
      agentVoice: 'PULSE',
      identity: 'Explorer',
      dataSource: 'Readiness: 91%. Heart recovery: 46ms. Sleep: 7.8 hrs. Volume capacity: max.',
    },
    identity: {
      message: 'This is what the training is for. Go prove it.',
      agentVoice: 'SPARK',
      identity: 'Explorer',
      dataSource: 'Plan: full intensity. You earned this.',
    },
  },
}

// ── Animation variants ────────────────────────────────────────

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const blurFadeIn = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 16 } as const,
  animate: { opacity: 1, filter: 'blur(0px)' as const, y: 0 } as const,
  transition: { duration: 0.6, ease: easeOutExpo } as const,
}

const mkTransition = (delay: number) => ({ duration: 0.6, ease: easeOutExpo, delay } as const)

const stepContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const btnHover = {
  whileHover: { scale: 1.03, transition: { duration: 0.15 } },
  whileTap: { scale: 0.97 },
}

// ── Component ──────────────────────────────────────────────────

export function CoachHero({ onStepComplete, onAllStepsComplete }: CoachHeroProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyState | null>(null)
  const [selectedObstacle, setSelectedObstacle] = useState<ObstacleType | null>(null)
  const [coachResponse, setCoachResponse] = useState<CoachResponse | null>(null)
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const handleEnergySelect = (option: EnergyOption) => {
    setSelectedEnergy(option.state)
    setCurrentStep(1)
    onStepComplete?.(1, { energy: option.state, anchor: option.anchor, path: option.path })
  }

  const handleObstacleSelect = (option: ObstacleOption) => {
    setSelectedObstacle(option.type)
    
    if (selectedEnergy) {
      const response = COACH_RESPONSES[selectedEnergy][option.type]
      setCoachResponse(response)
      setCurrentStep(2)
      
      onStepComplete?.(2, { obstacle: option.type })
      
      onAllStepsComplete?.({
        energy: selectedEnergy,
        obstacle: option.type,
        anchor: ENERGY_OPTIONS.find(e => e.state === selectedEnergy)!.anchor,
        path: ENERGY_OPTIONS.find(e => e.state === selectedEnergy)!.path,
        response,
      })

      // Show How It Works after a delay (progressive disclosure)
      setTimeout(() => setShowHowItWorks(true), 2400)
    }
  }

  const selectedEnergyOption = ENERGY_OPTIONS.find(e => e.state === selectedEnergy)

  return (
    <section
      className="section section-inset"
      aria-label="Your coach"
      id="coach"
    >
      <div className="container-atelier" style={{ maxWidth: 680 }}>
        <div className="stitch-line mb-12" role="separator" aria-orientation="horizontal" />

        {/* ── Step 1: Energy State ────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              variants={stepContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.p
                className="label-caps mb-8 text-center"
                style={{ letterSpacing: '0.3em' }}
                {...blurFadeIn}
              >
                Meet your coach
              </motion.p>

              <motion.h2
                className="font-display text-paper text-center"
                style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, fontStyle: 'italic' }}
                {...blurFadeIn}
                transition={mkTransition(0.15)}
              >
                What does your energy feel like right now, honestly?
              </motion.h2>

              <motion.p
                className="text-center mt-4 mb-10"
                style={{ fontSize: 14, color: 'var(--paper-faint)' }}
                {...blurFadeIn}
                transition={mkTransition(0.25)}
              >
                No wrong answer. Just tap.
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ENERGY_OPTIONS.map((option, idx) => (
                  <motion.button
                    key={option.state}
                    className="card-surface p-5 text-center cursor-pointer group"
                    style={{ borderRadius: 'var(--radius-sharp)' }}
                    variants={blurFadeIn}
                    initial="initial"
                    animate="animate"
                    transition={mkTransition(0.35 + idx * 0.08)}
                    {...btnHover}
                    onClick={() => handleEnergySelect(option)}
                    aria-label={option.label}
                  >
                    <span className="font-display block mb-2" style={{ fontSize: 14, fontStyle: 'italic', color: option.color }}>
                      {option.accent}
                    </span>
                    <p
                      className="mt-2 font-sans text-paper-muted group-hover:text-paper transition-colors"
                      style={{ fontSize: 13, fontWeight: 500 }}
                    >
                      {option.label}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 2: Obstacle ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step2"
              variants={stepContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Previous selection indicator */}
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sharp"
                  style={{
                    background: 'var(--card-surface)',
                    border: `1px solid ${selectedEnergyOption?.color || 'var(--card-border)'}`,
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: selectedEnergyOption?.color }}>{selectedEnergyOption?.accent}</span>
                  <span style={{ color: 'var(--paper-muted)' }}>{selectedEnergyOption?.label}</span>
                </span>
              </motion.div>

              <motion.h2
                className="font-display text-paper text-center"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.15, fontStyle: 'italic' }}
                {...blurFadeIn}
              >
                What usually gets in the way?
              </motion.h2>

              <motion.p
                className="text-center mt-3 mb-8"
                style={{ fontSize: 14, color: 'var(--paper-faint)' }}
                {...blurFadeIn}
                transition={mkTransition(0.1)}
              >
                The plan adapts to this too.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {OBSTACLE_OPTIONS.map((option, idx) => (
                  <motion.button
                    key={option.type}
                    className="card-surface p-4 text-left cursor-pointer group"
                    style={{ borderRadius: 'var(--radius-sharp)' }}
                    variants={blurFadeIn}
                    initial="initial"
                    animate="animate"
                    transition={mkTransition(0.2 + idx * 0.08)}
                    {...btnHover}
                    onClick={() => handleObstacleSelect(option)}
                    aria-label={option.label}
                  >
                    <p
                      className="font-display text-paper group-hover:text-orange transition-colors"
                      style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.3 }}
                    >
                      {option.label}
                    </p>
                    <p
                      className="font-sans mt-1"
                      style={{ fontSize: 12, color: 'var(--paper-faint)' }}
                    >
                      {option.type === 'accountability' && 'Check-ins keep you going'}
                      {option.type === 'autonomy' && 'Just the plan, please'}
                      {option.type === 'data' && 'Numbers and trends'}
                      {option.type === 'identity' && 'Remembering why you started'}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 3: Coach Response ───────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && coachResponse && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Selection summary */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sharp"
                  style={{
                    background: 'var(--card-surface)',
                    border: `1px solid ${selectedEnergyOption?.color || 'var(--card-border)'}`,
                    fontSize: 12,
                    color: 'var(--paper-muted)',
                  }}
                >
                  <span style={{ color: selectedEnergyOption?.color }}>{selectedEnergyOption?.accent}</span>
                  {selectedEnergyOption?.label}
                </span>
                <span style={{ color: 'var(--paper-faint)', fontSize: 12 }}>·</span>
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-sharp"
                  style={{
                    background: 'var(--card-surface)',
                    border: '1px solid var(--card-border)',
                    fontSize: 12,
                    color: 'var(--paper-muted)',
                  }}
                >
                  {OBSTACLE_OPTIONS.find(o => o.type === selectedObstacle)?.shortLabel}
                </span>
              </div>

              {/* Dynamic Generation replacing static Coach message */}
              <div className="-mx-4 md:mx-0">
                <DynamicPlanPreview 
                  energy={selectedEnergyOption?.label || "stressed"} 
                  obstacle={OBSTACLE_OPTIONS.find(o => o.type === selectedObstacle)?.label || "time"} 
                  coachVoice={selectedEnergyOption?.state === 'stressed' ? "aisha" : "jake"}
                />
              </div>

              <motion.p
                className="text-center mt-4"
                style={{ fontSize: 12, color: 'var(--paper-faint)', letterSpacing: '0.05em' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Generated live via Together.ai and Llama-3.3-70B.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 4: How It Works ────────────────────────── */}
        <AnimatePresence>
          {showHowItWorks && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <p
                className="label-caps mb-8 text-center"
                style={{ letterSpacing: '0.3em' }}
              >
                How it works
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    time: '6:00 AM',
                    agent: 'PULSE',
                    action: 'Reads your readiness',
                    detail: 'Sleep, heart recovery, soreness',
                  },
                  {
                    time: '12:00 PM',
                    agent: 'IRON',
                    action: 'Adjusts your plan',
                    detail: 'Scaled session, new targets',
                  },
                  {
                    time: 'During workout',
                    agent: 'REAL-TIME',
                    action: 'Coaches you through',
                    detail: 'Neural load tracking',
                  },
                  {
                    time: '9:00 PM',
                    agent: 'EDGE',
                    action: 'Reviews your week',
                    detail: 'Weekly narrative, progress',
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={step.agent}
                    className="card-surface p-4"
                    style={{ borderRadius: 'var(--radius-sharp)' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.12, duration: 0.5 }}
                  >
                    <p
                      className="font-sans"
                      style={{ fontSize: 11, color: 'var(--paper-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      {step.time}
                    </p>
                    <p
                      className="font-display mt-1"
                      style={{ fontSize: 16, color: 'var(--orange)', fontStyle: 'italic' }}
                    >
                      {step.agent}
                    </p>
                    <p
                      className="font-sans mt-2"
                      style={{ fontSize: 14, color: 'var(--paper)', lineHeight: 1.4 }}
                    >
                      {step.action}
                    </p>
                    <p
                      className="font-sans mt-1"
                      style={{ fontSize: 12, color: 'var(--paper-faint)' }}
                    >
                      {step.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Readiness Ring data visualization */}
              <motion.div
                className="mt-8 flex items-center justify-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-center">
                  <p className="font-display" style={{ fontSize: 28, color: 'var(--orange)', fontStyle: 'italic' }}>
                    62
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--paper-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Readiness
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-display" style={{ fontSize: 28, color: 'var(--paper)', fontStyle: 'italic' }}>
                    12,847
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--paper-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Plans adjusted
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-display" style={{ fontSize: 28, color: 'var(--paper)', fontStyle: 'italic' }}>
                    94%
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--paper-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Day 3 retention
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}