"use client";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import React, { useCallback, useState, useEffect } from "react";

// ── Component imports (lazy to avoid landing page bundle bloat) ──────
import dynamic from "next/dynamic";

const PyHero = dynamic(
  () => import("@/components/atelier/PyCodeRenderer").then((m) => m.PyHero),
  { ssr: false }
);
const PyCoachMessage = dynamic(
  () => import("@/components/atelier/PyCodeRenderer").then((m) => m.PyCoachMessage),
  { ssr: false }
);
const PyCTAButton = dynamic(
  () => import("@/components/atelier/PyCodeRenderer").then((m) => m.PyCTAButton),
  { ssr: false }
);
const PySection = dynamic(
  () => import("@/components/atelier/PyCodeRenderer").then((m) => m.PySection),
  { ssr: false }
);
const PyStitchDivider = dynamic(
  () => import("@/components/atelier/PyCodeRenderer").then((m) => m.PyStitchDivider),
  { ssr: false }
);

import { CoachHero } from "@/components/atelier/CoachHero";
import { Proof } from "@/components/atelier/Proof";
import { Plan } from "@/components/atelier/Plan";
import { Ladder } from "@/components/atelier/Ladder";
import { Footer } from "@/components/atelier/Footer";

// ── Puck Config ──────────────────────────────────────────────────────────

import type { Config, Data } from "@puckeditor/core";

const config: Config = {
  components: {
    Hero: {
      fields: {
        headline: { type: "text" },
        subline: { type: "text" },
        dark: { type: "checkbox" },
      },
      defaultProps: {
        headline: "Your body knows what to do.",
        subline:
          "TransformFit reads your readiness and writes your plan — a living program that adapts weekly.",
        dark: true,
      },
      render: ({ headline, subline, dark }) => (
        <PyHero headline={headline} subline={subline} dark={dark} />
      ),
    },

    CoachMessage: {
      fields: {
        coach: {
          type: "select",
          options: [
            { label: "Jake", value: "jake" },
            { label: "Aisha", value: "aisha" },
          ],
        },
        message: { type: "textarea" },
        agent: {
          type: "select",
          options: [
            { label: "SPARK", value: "SPARK" },
            { label: "PULSE", value: "PULSE" },
            { label: "IRON", value: "IRON" },
            { label: "EDGE", value: "EDGE" },
            { label: "FUEL", value: "FUEL" },
            { label: "GHOST", value: "GHOST" },
            { label: "AMBER", value: "AMBER" },
          ],
        },
      },
      defaultProps: {
        coach: "jake",
        message:
          "I see you. 12 minutes. That's all I need today. We build from there.",
        agent: "SPARK",
      },
      render: ({ coach, message, agent }) => (
        <PyCoachMessage
          coach={coach as "jake" | "aisha"}
          message={message}
          agent={agent}
        />
      ),
    },

    CTAButton: {
      fields: {
        label: { type: "text" },
        href: { type: "text" },
        emotion: {
          type: "select",
          options: [
            { label: "Identity", value: "identity" },
            { label: "Loss Aversion", value: "loss_aversion" },
            { label: "Social Proof", value: "social_proof" },
            { label: "Reciprocity", value: "reciprocity" },
          ],
        },
        sublabel: { type: "text" },
      },
      defaultProps: {
        label: "Start 3-Day Free Trial",
        href: "#coach",
        emotion: "loss_aversion",
        sublabel: "No credit card needed. Your future self will thank you.",
      },
      render: ({ label, href, emotion, sublabel }) => (
        <div className="flex justify-center py-12">
          <PyCTAButton
            label={label}
            href={href}
            emotion={emotion as any}
            sublabel={sublabel}
          />
        </div>
      ),
    },

    Section: {
      fields: {
        headline: { type: "text" },
        subline: { type: "text" },
        body: { type: "textarea" },
        dark: { type: "checkbox" },
      },
      defaultProps: {
        headline: "Week 1: No guesswork.",
        subline: "Your first week, personalized from Day 1.",
        body: "",
        dark: true,
      },
      render: ({ headline, subline, body, dark }) => (
        <PySection
          headline={headline}
          subline={subline}
          body={body || undefined}
          dark={dark}
        />
      ),
    },

    StitchDivider: {
      fields: {},
      defaultProps: {},
      render: () => <PyStitchDivider />,
    },

    CoachHeroSection: {
      fields: {},
      defaultProps: {},
      render: () => <CoachHero />,
    },

    ProofSection: {
      fields: {
        quote: { type: "textarea" },
        attribution: { type: "text" },
      },
      defaultProps: {
        quote: "I tried 5 apps before this one actually adapted to my body, not my ego.",
        attribution: "Sarah K., 34",
      },
      render: ({ quote, attribution }) => (
        <Proof quote={quote} attribution={attribution} />
      ),
    },

    PlanSection: {
      fields: {},
      defaultProps: {},
      render: () => <Plan />,
    },

    LadderSection: {
      fields: {
        opener: { type: "text" },
      },
      defaultProps: {
        opener: "Your 84-day proof ladder",
      },
      render: ({ opener }) => <Ladder opener={opener} />,
    },

    FooterSection: {
      fields: {
        tagline: { type: "text" },
      },
      defaultProps: {
        tagline: "Your body knows what to do.",
      },
      render: ({ tagline }) => <Footer tagline={tagline} />,
    },
  },
};

// ── Default Data ──────────────────────────────────────────────────────────

const defaultData: Data = {
  root: { props: {} },
  content: [
    {
      type: "Hero",
      props: {
        headline: "Your body knows what to do.",
        subline:
          "TransformFit reads your readiness and writes your plan — a living program that adapts weekly.",
        dark: true,
      },
    },
    { type: "StitchDivider", props: {} },
    { type: "CoachHeroSection", props: {} },
    { type: "StitchDivider", props: {} },
    {
      type: "CoachMessage",
      props: {
        coach: "jake",
        message:
          "That Sunday night dread? That's not you being lazy. That's your body sending a signal. Let's read it together.",
        agent: "SPARK",
      },
    },
    {
      type: "CTAButton",
      props: {
        label: "Start 3-Day Free Trial",
        href: "#coach",
        emotion: "loss_aversion",
        sublabel: "No credit card needed. Your future self will thank you.",
      },
    },
    { type: "ProofSection", props: {} },
    { type: "PlanSection", props: {} },
    { type: "FooterSection", props: {} },
  ],
};

// ── Editor Page ──────────────────────────────────────────────────────────

export default function EditorPage() {
  const [data, setData] = useState<Data>(defaultData);

  const handlePublish = useCallback((newData: Data) => {
    setData(newData);
    localStorage.setItem("transformfit-page-data", JSON.stringify(newData));
    console.log("Page data saved:", newData);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("transformfit-page-data");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        // use default
      }
    }
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={data}
        onPublish={handlePublish}
      />
    </div>
  );
}