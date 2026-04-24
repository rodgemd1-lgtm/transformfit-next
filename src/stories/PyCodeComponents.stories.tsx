import type { Meta, StoryObj } from "@storybook/react";
import {
  PyHero,
  PyCoachMessage,
  PyCTAButton,
  PySection,
  PyDataMetric,
  PyStitchDivider,
} from "@/components/atelier/PyCodeRenderer";

// ── Global Styles ────────────────────────────────────────────────────

const meta: Meta = {
  title: "GenUI/PyCode Components",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;

// ── PyHero ─────────────────────────────────────────────────────────────

export const Hero: StoryObj<typeof PyHero> = {
  args: {
    headline: "Your body knows what to do.",
    subline:
      "TransformFit reads your readiness and writes your plan — a living program that adapts weekly.",
    dark: true,
  },
};

export const HeroWithReadouts: StoryObj<typeof PyHero> = {
  args: {
    headline: "72ms HRV. 6.2hr sleep. Readiness: 78%.",
    subline: "Your body is ready. Your coach is waiting.",
    readouts: [
      { label: "HRV", value: "72", unit: "ms" },
      { label: "Sleep", value: "6.2", unit: "hrs" },
      { label: "Readiness", value: "78", unit: "%" },
    ],
    dark: true,
  },
};

// ── PyCoachMessage ─────────────────────────────────────────────────────

export const JakeCoachMessage: StoryObj<typeof PyCoachMessage> = {
  args: {
    coach: "jake",
    message:
      "I see you. 12 minutes. That's all I need today. We build from there.",
    agent: "SPARK",
    timing: "re_engagement",
  },
};

export const JakeLossAversion: StoryObj<typeof PyCoachMessage> = {
  args: {
    coach: "jake",
    message:
      "That Sunday night dread? That's not you being lazy. That's your body sending a signal. Let's read it together.",
    agent: "SPARK",
    timing: "re_engagement",
    emphasis: true,
  },
};

export const AishaCoachMessage: StoryObj<typeof PyCoachMessage> = {
  args: {
    coach: "aisha",
    message:
      "You're not starting over. You're starting wiser. Every restart is data.",
    agent: "PULSE",
    timing: "dawn_prime",
  },
};

// ── PyCTAButton ────────────────────────────────────────────────────────

export const CTALossAversion: StoryObj<typeof PyCTAButton> = {
  args: {
    label: "Start 3-Day Free Trial",
    href: "#coach",
    emotion: "loss_aversion",
    sublabel: "No credit card needed. Your future self will thank you.",
  },
};

export const CTAIdentity: StoryObj<typeof PyCTAButton> = {
  args: {
    label: "Start Free Trial",
    href: "#coach",
    emotion: "identity",
  },
};

export const CTASocialProof: StoryObj<typeof PyCTAButton> = {
  args: {
    label: "Join 12,000+ Who Started Here",
    href: "#coach",
    emotion: "social_proof",
  },
};

// ── PySection ──────────────────────────────────────────────────────────

export const Section: StoryObj<typeof PySection> = {
  args: {
    headline: "Week 1: No guesswork.",
    subline: "Your first week, personalized from Day 1.",
    body: "We read your HRV, sleep quality, and stress markers. Then we build a plan that fits your body — not a generic template.",
    dark: true,
  },
};

// ── PyDataMetric ──────────────────────────────────────────────────────

export const DataMetric: StoryObj<typeof PyDataMetric> = {
  args: {
    label: "HRV Score",
    value: "72",
    unit: "ms",
    emphasis: true,
  },
};

export const DataMetricSubtle: StoryObj<typeof PyDataMetric> = {
  args: {
    label: "Sleep Quality",
    value: "6.2",
    unit: "hrs",
    emphasis: false,
  },
};

// ── PyStitchDivider ──────────────────────────────────────────────────

export const StitchDivider: StoryObj<typeof PyStitchDivider> = {};