"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGenUI } from "@/lib/copilotkit";

// ── Design Tokens ──────────────────────────────────────────────────────

const TOKENS = {
  ink: "#0A0A0A",
  ink900: "#111111",
  ink800: "#1A1A1A",
  paper: "#F0EDE8",
  paperMuted: "rgba(240,237,232,0.55)",
  paperFaint: "rgba(240,237,232,0.35)",
  orange: "#F97316",
  orangeWarm: "#FB923C",
  orangeDark: "#C2410C",
  emerald: "#10B981",
  rose: "#F43F5E",
  fontDisplay: "'Playfair Display', serif",
  fontBody: "'Inter', sans-serif",
  radiusSharp: "2px",
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

// ── Animation Variants ────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: TOKENS.spring } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// ── Component Types ────────────────────────────────────────────────────

interface HeroProps {
  headline: string;
  subline?: string;
  cta?: { label: string; href: string; emotion?: string };
  readouts?: { label: string; value: string; unit?: string }[];
  dark?: boolean;
}

interface CoachMessageProps {
  coach: "jake" | "aisha";
  message: string;
  agent?: string;
  timing?: string;
  emphasis?: boolean;
}

interface CTAButtonProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  emotion?: "loss_aversion" | "identity" | "social_proof" | "reciprocity";
  sublabel?: string;
}

interface SectionProps {
  headline: string;
  subline?: string;
  body?: string;
  dark?: boolean;
  children?: React.ReactNode;
}

interface DataMetricProps {
  label: string;
  value: string;
  unit?: string;
  trend?: number[];
  emphasis?: boolean;
}

// ── Hero Component ──────────────────────────────────────────────────────

export function PyHero({
  headline,
  subline,
  cta,
  readouts,
  dark = true,
}: HeroProps) {
  return (
    <section className={`py-20 md:py-32 ${dark ? "bg-[var(--ink)]" : ""}`}>
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--container-max, 680px)" }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display italic text-[var(--paper)] leading-[1.08]"
            style={{
              fontSize: "clamp(32px, 5.5vw, 56px)",
              fontFamily: TOKENS.fontDisplay,
            }}
          >
            {headline}
          </motion.h1>

          {subline && (
            <motion.p
              variants={fadeInUp}
              className="font-body text-[15px] leading-[1.65]"
              style={{ color: TOKENS.paperMuted }}
            >
              {subline}
            </motion.p>
          )}

          {cta && <PyCTAButton label={cta.label} href={cta.href} emotion={cta.emotion as any} />}

          {readouts && readouts.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-8 pt-8"
            >
              {readouts.map((r, i) => (
                <div key={i} className="text-center">
                  <p
                    className="font-display italic text-[var(--paper)]"
                    style={{ fontSize: "28px" }}
                  >
                    {r.value}
                    {r.unit && (
                      <span className="text-[13px]" style={{ color: TOKENS.paperMuted }}>
                        {r.unit}
                      </span>
                    )}
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.1em]"
                    style={{ color: TOKENS.paperFaint }}
                  >
                    {r.label}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── Coach Message ───────────────────────────────────────────────────────

export function PyCoachMessage({
  coach,
  message,
  agent = "SPARK",
  timing,
  emphasis = false,
}: CoachMessageProps) {
  const coachName = coach === "jake" ? "Jake" : "Aisha";
  const borderColor = emphasis ? TOKENS.rose : TOKENS.orange;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: TOKENS.spring }}
      className="relative p-6 md:p-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: TOKENS.radiusSharp,
      }}
    >
      <p
        className="text-[11px] uppercase tracking-[0.2em] mb-4"
        style={{ color: borderColor }}
      >
        {coachName} · {agent}
        {timing && ` · ${timing.replace("_", " ")}`}
      </p>
      <p
        className="font-display italic text-[var(--paper)]"
        style={{ fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.35 }}
      >
        &ldquo;{message}&rdquo;
      </p>
    </motion.div>
  );
}

// ── CTA Button ──────────────────────────────────────────────────────────

export function PyCTAButton({
  label,
  href,
  variant = "primary",
  emotion = "identity",
  sublabel,
}: CTAButtonProps) {
  const variantStyles = {
    primary: `bg-[${TOKENS.orange}] text-[var(--ink)] hover:brightness-110`,
    secondary:
      "bg-transparent border border-[var(--orange)]/30 text-[var(--paper)] hover:border-[var(--orange)]/60",
    ghost: "bg-transparent text-[var(--paper-muted)] hover:text-[var(--paper)]",
  };

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 transition-all duration-300 ${variantStyles[variant]}`}
      style={{ borderRadius: TOKENS.radiusSharp }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-emotion={emotion}
    >
      {label}
      {sublabel && (
        <span
          className="text-[10px] font-normal normal-case tracking-normal block mt-1"
          style={{ color: TOKENS.paperMuted }}
        >
          {sublabel}
        </span>
      )}
    </motion.a>
  );
}

// ── Section ─────────────────────────────────────────────────────────────

export function PySection({
  headline,
  subline,
  body,
  dark = true,
  children,
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${dark ? "bg-[var(--ink)]" : ""}`}>
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--container-max, 680px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: TOKENS.spring }}
        >
          <h2
            className="font-display italic text-[var(--paper)]"
            style={{
              fontSize: "clamp(24px, 3.5vw, 40px)",
              lineHeight: 1.15,
            }}
          >
            {headline}
          </h2>
          {subline && (
            <p
              className="mt-3 text-[14px] leading-[1.5]"
              style={{ color: TOKENS.paperMuted }}
            >
              {subline}
            </p>
          )}
          {body && (
            <p
              className="mt-6 text-[14.5px] leading-[1.65]"
              style={{ color: TOKENS.paperMuted }}
            >
              {body}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// ── Data Metric ──────────────────────────────────────────────────────────

export function PyDataMetric({
  label,
  value,
  unit,
  trend,
  emphasis = false,
}: DataMetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: TOKENS.radiusSharp,
      }}
    >
      <p
        className="text-[11px] uppercase tracking-[0.1em]"
        style={{ color: TOKENS.paperFaint }}
      >
        {label}
      </p>
      <p
        className="font-display italic"
        style={{
          fontSize: "28px",
          color: emphasis ? TOKENS.orange : TOKENS.paper,
        }}
      >
        {value}
        {unit && (
          <span className="text-[13px]" style={{ color: TOKENS.paperMuted }}>
            {unit}
          </span>
        )}
      </p>
    </motion.div>
  );
}

// ── Stitch Divider ───────────────────────────────────────────────────────

export function PyStitchDivider() {
  return (
    <div
      className="stitch-line mx-auto"
      style={{
        maxWidth: "var(--container-max, 680px)",
        height: "1px",
        background: `linear-gradient(to right, transparent, ${TOKENS.orangeWarm}, transparent)`,
        opacity: 0.25,
      }}
    />
  );
}

// ── Generic PyCode Renderer ──────────────────────────────────────────────

/**
 * Renders a GenUI JSON component definition into React.
 * Takes the parsed JSON from PyCode/Together.ai and maps it to our components.
 */
export function PyCodeRenderer({ data }: { data: Record<string, any> }) {
  const type = data?.type;

  switch (type) {
    case "hero":
      return (
        <PyHero
          headline={data.headline || "Your body knows what to do."}
          subline={data.subline}
          cta={data.cta ? { label: data.cta.label, href: data.cta.href, emotion: data.cta.emotion } : undefined}
          readouts={data.readouts}
          dark={data.dark !== false}
        />
      );

    case "coach_message":
      return (
        <PyCoachMessage
          coach={data.coach || "jake"}
          message={data.message || ""}
          agent={data.agent}
          timing={data.timing}
          emphasis={data.emphasis}
        />
      );

    case "cta_button":
      return (
        <PyCTAButton
          label={data.label || "Start Free Trial"}
          href={data.href || "#"}
          variant={data.variant}
          emotion={data.emotion}
          sublabel={data.sublabel}
        />
      );

    case "section":
      return (
        <PySection
          headline={data.headline || ""}
          subline={data.subline}
          body={data.body}
          dark={data.dark !== false}
        >
          {data.items?.map((item: any, i: number) => {
            if (item.type === "coach_note") {
              return (
                <PyCoachMessage
                  key={i}
                  coach={item.coach || "jake"}
                  message={item.message || ""}
                  agent={item.agent}
                />
              );
            }
            if (item.type === "metric") {
              return (
                <PyDataMetric
                  key={i}
                  label={item.label || ""}
                  value={item.value || ""}
                  unit={item.unit}
                  emphasis={item.emphasis}
                />
              );
            }
            return null;
          })}
        </PySection>
      );

    case "data_dashboard":
      return (
        <PySection
          headline={data.title || "Your Readiness"}
          dark={data.dark !== false}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.metrics?.map((m: any, i: number) => (
              <PyDataMetric
                key={i}
                label={m.label || ""}
                value={m.value || ""}
                unit={m.unit}
                trend={m.trend}
                emphasis={m.emphasis}
              />
            ))}
          </div>
        </PySection>
      );

    case "landing_page":
      return (
        <div className="landing-page">
          {(data.sections || []).map((section: any, i: number) => (
            <PyCodeRenderer key={i} data={section} />
          ))}
        </div>
      );

    default:
      return (
        <div
          className="p-4 text-[13px]"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderLeft: "3px solid var(--orange)",
            borderRadius: "2px",
            color: TOKENS.paperMuted,
          }}
        >
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: TOKENS.orange }}>
            PyCode Output
          </p>
          <p style={{ color: TOKENS.paper }}>
            {data.headline || data.message || data.label || JSON.stringify(data).slice(0, 200)}
          </p>
        </div>
      );
  }
}

// ── Generation History Panel ────────────────────────────────────────────

export function PyGenerationHistory() {
  const { generations } = useGenUI();

  if (generations.length === 0) {
    return (
      <p className="text-[13px] text-center" style={{ color: TOKENS.paperMuted }}>
        No generations yet. Use the Studio sidebar to create components.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {generations.map((g) => (
        <div
          key={g.id}
          className="flex items-center justify-between p-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: TOKENS.radiusSharp,
          }}
        >
          <div>
            <span className="text-[12px] font-mono" style={{ color: TOKENS.paper }}>
              {g.id}
            </span>
            <span className="text-[12px] ml-2" style={{ color: TOKENS.paperMuted }}>
              {g.componentType}
            </span>
          </div>
          <span
            className="text-[11px] px-2 py-0.5 rounded-sm"
            style={{
              color:
                g.status === "approved"
                  ? TOKENS.emerald
                  : g.status === "error"
                  ? TOKENS.rose
                  : TOKENS.orange,
            }}
          >
            {g.status}
          </span>
        </div>
      ))}
    </div>
  );
}