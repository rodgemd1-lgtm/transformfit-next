/**
 * CoachHero → AEP Onboarding Integration
 * 
 * Bridges the landing page CoachHero progressive questioning data
 * to the AEP (Adapt Evolve Progress) onboarding system.
 * 
 * Flow:
 * 1. User completes CoachHero on landing page
 * 2. Energy state + obstacle stored as onboarding profile
 * 3. Profile maps to AEP's inflection point engine
 * 4. Day 0-7 onboarding messages dispatched per segment
 */

// ── Types ──────────────────────────────────────────────────────

import type {
  EnergyState,
  ObstacleType,
  IdentityAnchor,
  EntryPath,
} from '@/data/coach-voices'
import { COACH_RESPONSES } from '@/data/coach-voices'

type CoachResponse = typeof COACH_RESPONSES[EnergyState][ObstacleType]

export interface LandingPageProfile {
  /** From CoachHero Step 1 */
  energyState: EnergyState
  /** From CoachHero Step 2 */
  obstacle: ObstacleType
  /** Derived from energy state */
  identityAnchor: IdentityAnchor
  /** Derived from obstacle */
  entryPath: EntryPath
  /** Personalized coach response */
  coachResponse: CoachResponse
  /** Timestamp of profile creation */
  createdAt: string
  /** Source of the profile */
  source: 'landing_page' | 'onboarding' | 'segment_route'
  /** Coach voice preference (Jake or Aisha) */
  coachVoice: 'jake' | 'aisha'
}

export interface OnboardingConfig {
  /** How often to send messages (per segment) */
  notificationCadence: {
    dailyLimit: number
    weeklyLimit: number
    optimalHours: number[]
  }
  /** Primary agent for this segment */
  primaryAgent: 'SPARK' | 'PULSE' | 'IRON' | 'EDGE' | 'FUEL' | 'GHOST' | 'AMBER'
  /** Emotional mode for Dawn Prime messages */
  dawnPrimeMode: 'identity_reinforcement' | 'competence_proof' | 'normative_relief'
  /** Entry path label for UI */
  entryPathLabel: string
  /** Entry path description */
  entryPathDescription: string
}

// ── Segment Mapping ─────────────────────────────────────────────

const SEGMENT_CONFIG: Record<EntryPath, OnboardingConfig> = {
  accountability: {
    notificationCadence: {
      dailyLimit: 2,
      weeklyLimit: 8,
      optimalHours: [8, 17, 19], // 8 AM, 5 PM, 7 PM
    },
    primaryAgent: 'SPARK',
    dawnPrimeMode: 'identity_reinforcement',
    entryPathLabel: 'I stop when life gets busy',
    entryPathDescription: 'Check-ins keep you going',
  },
  autonomy: {
    notificationCadence: {
      dailyLimit: 1,
      weeklyLimit: 3,
      optimalHours: [7], // 7 AM only
    },
    primaryAgent: 'IRON',
    dawnPrimeMode: 'competence_proof',
    entryPathLabel: "I don't know what to do",
    entryPathDescription: 'Just the plan, please',
  },
  data: {
    notificationCadence: {
      dailyLimit: 1,
      weeklyLimit: 5,
      optimalHours: [7, 18], // 7 AM, 6 PM
    },
    primaryAgent: 'PULSE',
    dawnPrimeMode: 'competence_proof',
    entryPathLabel: 'I need to see the numbers',
    entryPathDescription: 'Numbers and trends',
  },
  identity: {
    notificationCadence: {
      dailyLimit: 2,
      weeklyLimit: 8,
      optimalHours: [6, 19], // 6 AM, 7 PM
    },
    primaryAgent: 'SPARK',
    dawnPrimeMode: 'identity_reinforcement',
    entryPathLabel: 'I forget why I started',
    entryPathDescription: 'Remembering why you started',
  },
}

// ── Onboarding Message Templates ───────────────────────────────

interface OnboardingMessage {
  day: number
  window: 'dawn_prime' | 'workout_launch' | 'post_session' | 'evening_reflection'
  agent: string
  mode: string
  segment: EntryPath
  jakeMessage: string
  aishaMessage: string
  churnSafeguard: string
}

const ONBOARDING_MESSAGES: OnboardingMessage[] = [
  // Day 0 — Landing Page
  {
    day: 0,
    window: 'dawn_prime',
    agent: 'SPARK',
    mode: 'identity_reinforcement',
    segment: 'identity',
    jakeMessage: 'Welcome. The plan already knows your week was rough. That\'s not a problem — it\'s the starting point. Let\'s go.',
    aishaMessage: 'Welcome. Your baseline metrics are being established. Over the next 3 days, I\'ll calibrate your plan against your actual readiness data. This is where precision begins.',
    churnSafeguard: '#1 anonymous preview, #2 60s to value',
  },
  {
    day: 0,
    window: 'post_session',
    agent: 'SPARK',
    mode: 'winning_moment',
    segment: 'identity',
    jakeMessage: 'First session done. You\'re already different. I\'ll be here at 6am tomorrow. The plan adjusts overnight.',
    aishaMessage: 'Session complete. Your first data point is logged. Tomorrow\'s plan adjusts based on your recovery metrics. Check in after sleep.',
    churnSafeguard: '#4 progress visibility, #5 coach memory',
  },

  // Day 1 — The Morning Door
  {
    day: 1,
    window: 'dawn_prime',
    agent: 'SPARK',
    mode: 'identity_reinforcement',
    segment: 'identity',
    jakeMessage: 'Day 1. Yesterday you showed up. Today the plan already adjusted. You don\'t have to think about it. Just follow it.',
    aishaMessage: 'Good morning. Your readiness score for today is calculated. The plan adjusts to your actual state, not yesterday\'s ambition. Here\'s what today looks like.',
    churnSafeguard: '#4 progress visibility',
  },
  {
    day: 1,
    window: 'post_session',
    agent: 'EDGE',
    mode: 'narrative_anchor',
    segment: 'identity',
    jakeMessage: 'That was Day 1. The plan put you there. You showed up. Tomorrow I\'ll be waiting at 6am.',
    aishaMessage: 'Day 1 complete. Your session data is logged. The readiness curve starts tomorrow. The data says you\'re building something.',
    churnSafeguard: '#4 progress visibility, #5 coach memory',
  },

  // Day 2 — The Adjustment
  {
    day: 2,
    window: 'dawn_prime',
    agent: 'PULSE',
    mode: 'competence_proof',
    segment: 'identity',
    jakeMessage: 'The plan adjusted overnight. You don\'t have to think about it. Just start.',
    aishaMessage: 'Good morning. Your readiness is {readiness_score}/100. Based on overnight recovery, I\'ve adjusted today\'s plan. The data supports this modification.',
    churnSafeguard: '#3 Day 3 rest explainer prep',
  },
  {
    day: 2,
    window: 'evening_reflection',
    agent: 'SPARK',
    mode: 'narrative_anchor',
    segment: 'identity',
    jakeMessage: 'Two days. The foundation is real. {non_scale_win}.',
    aishaMessage: 'Day 2 complete. {non_scale_win_with_data}. The data confirms your trajectory.',
    churnSafeguard: '#7 non-scale proof setup',
  },

  // Day 3 — The Paywall (CRITICAL)
  {
    day: 3,
    window: 'dawn_prime',
    agent: 'PULSE',
    mode: 'competence_proof_or_normative_relief',
    segment: 'identity',
    jakeMessage: 'Day 3. You\'re not stopping. The plan has you. Let\'s go.',
    aishaMessage: 'Day 3. Readiness: {readiness_score}/100. All systems support training today. Your trajectory is consistent.',
    churnSafeguard: '#3 Day 3 rest confusion fix',
  },
  {
    day: 3,
    window: 'post_session',
    agent: 'SPARK',
    mode: 'loss_aversion',
    segment: 'identity',
    jakeMessage: '3 days. Your plan knows you now. Don\'t lose this.',
    aishaMessage: '3 days of data. Your personalized plan continues with your subscription. The adjustments get smarter from here.',
    churnSafeguard: '#2 transparent pricing, #6 loss aversion',
  },

  // Day 4 — Recovery + Adjustment
  {
    day: 4,
    window: 'dawn_prime',
    agent: 'PULSE',
    mode: 'competence_proof',
    segment: 'identity',
    jakeMessage: 'Day 4. The plan is already different from Day 1. That\'s the point. You don\'t have to think about it.',
    aishaMessage: 'Day 4. Your {metric_trend} is {trend_direction}. The plan adapts based on real data, not assumptions.',
    churnSafeguard: '#5 coach intimacy deepening',
  },

  // Day 5 — Non-Scale Proof
  {
    day: 5,
    window: 'dawn_prime',
    agent: 'EDGE',
    mode: 'narrative_anchor',
    segment: 'identity',
    jakeMessage: '5 days in. {non_scale_win}. You feel that? That\'s not a number on a scale. That\'s the plan working.',
    aishaMessage: 'Day 5 milestone: {non_scale_win_with_data}. Your {metric} improved {percentage}% from baseline. This confirms your adaptation trajectory.',
    churnSafeguard: '#7 non-scale proof',
  },

  // Day 6 — Identity Lock-In
  {
    day: 6,
    window: 'evening_reflection',
    agent: 'SPARK',
    mode: 'identity_reinforcement',
    segment: 'identity',
    jakeMessage: 'One more day in your first week. You\'re not the person who starts and stops. You\'re the person who starts and keeps going.',
    aishaMessage: 'Day 6. Your consistency data is building a profile. The weekly narrative drops tomorrow. This is what personalization looks like — data meeting commitment.',
    churnSafeguard: '#10 habit fragility (66-day badge)',
  },

  // Day 7 — The Weekly Narrative
  {
    day: 7,
    window: 'evening_reflection',
    agent: 'EDGE',
    mode: 'narrative_anchor_social_proof',
    segment: 'identity',
    jakeMessage: 'Week 1 complete. Here\'s your story: {weekly_summary_narrative}. The plan adapts. You commit. That\'s the architecture.',
    aishaMessage: 'Weekly review: {weekly_data_summary}. Your trajectory: {trajectory}. The data confirms {key_insight}. Next week starts Monday.',
    churnSafeguard: '#4 progress visibility, #10 66-day badge',
  },
]

// ── Integration Functions ───────────────────────────────────────

/**
 * Convert CoachHero interaction data to AEP onboarding profile.
 * Called when user completes all 3 steps of CoachHero.
 */
export function coachHeroToOnboardingProfile(
  energyState: EnergyState,
  obstacle: ObstacleType,
  response: CoachResponse,
  coachVoice: 'jake' | 'aisha' = 'jake',
): LandingPageProfile {
  const ENERGY_ANCHOR_MAP: Record<EnergyState, IdentityAnchor> = {
    low_energy: 'Architect',
    stressed: 'Phoenix',
    focused: 'Leader',
    ready: 'Explorer',
  }

  const OBSTACLE_PATH_MAP: Record<ObstacleType, EntryPath> = {
    accountability: 'accountability',
    autonomy: 'autonomy',
    data: 'data',
    identity: 'identity',
  }

  return {
    energyState,
    obstacle,
    identityAnchor: ENERGY_ANCHOR_MAP[energyState],
    entryPath: OBSTACLE_PATH_MAP[obstacle],
    coachResponse: response,
    createdAt: new Date().toISOString(),
    source: 'landing_page',
    coachVoice,
  }
}

/**
 * Get onboarding configuration for a given entry path.
 * Used by the AEP notification cadence system.
 */
export function getOnboardingConfig(entryPath: EntryPath): OnboardingConfig {
  return SEGMENT_CONFIG[entryPath]
}

/**
 * Get Day 0-7 onboarding messages for a segment.
 * Filters the message templates by segment and fills in profile-specific data.
 */
export function getOnboardingMessages(
  entryPath: EntryPath,
  coachVoice: 'jake' | 'aisha',
): Array<Omit<OnboardingMessage, 'jakeMessage' | 'aishaMessage'> & { message: string }> {
  // Get messages for this segment (or identity as fallback)
  const segmentMessages = ONBOARDING_MESSAGES.filter(
    (m) => m.segment === entryPath || m.segment === 'identity',
  )

  return segmentMessages.map((m) => {
    const { jakeMessage, aishaMessage, ...rest } = m
    return {
      ...rest,
      message: coachVoice === 'jake' ? jakeMessage : aishaMessage,
    }
  })
}

/**
 * Store landing page profile in localStorage for AEP to pick up on Day 0.
 * This bridges the landing page (static Next.js) to the app (AEP React).
 */
export function storeLandingPageProfile(profile: LandingPageProfile): void {
  if (typeof window === 'undefined') return

  localStorage.setItem('transformfit_onboarding_profile', JSON.stringify(profile))

  // Also dispatch a custom event for any listeners
  window.dispatchEvent(
    new CustomEvent('transformfit:profile_created', {
      detail: profile,
    }),
  )
}

/**
 * Retrieve stored landing page profile (used by AEP on Day 0).
 */
export function getStoredLandingPageProfile(): LandingPageProfile | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem('transformfit_onboarding_profile')
  if (!stored) return null

  try {
    return JSON.parse(stored) as LandingPageProfile
  } catch {
    return null
  }
}

/**
 * Check if user came from landing page and has a profile.
 * Used by AEP to route onboarding flow.
 */
export function hasLandingPageProfile(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('transformfit_onboarding_profile') !== null
}