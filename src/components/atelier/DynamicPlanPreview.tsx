"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";

const planSchema = z.object({
  coachMessage: z.string(),
  days: z.array(
    z.object({
      dayNumber: z.number(),
      theme: z.string(),
      focus: z.string(),
      duration: z.number(),
      rationale: z.string(),
    })
  ),
});

interface DynamicPlanPreviewProps {
  energy: string;
  obstacle: string;
  coachVoice: "jake" | "aisha";
  onComplete?: () => void;
}

export function DynamicPlanPreview({
  energy,
  obstacle,
  coachVoice,
  onComplete,
}: DynamicPlanPreviewProps) {
  const { object, submit, isLoading } = useObject({
    api: "/api/generate-plan",
    schema: planSchema,
    onFinish: () => {
      if (onComplete) onComplete();
    },
  });

  useEffect(() => {
    submit({ energy, obstacle, coachVoice });
  }, [energy, obstacle, coachVoice, submit]);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0">
      {/* Loading State & Coach Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="label-caps mb-4 text-orange" style={{ letterSpacing: "0.2em" }}>
          {isLoading ? "Generating your plan..." : "Your Custom Plan"}
        </p>
        <h2 className="font-display text-paper text-2xl md:text-3xl italic max-w-2xl mx-auto">
          {object?.coachMessage || "Analyzing your state..."}
          {isLoading && !object?.coachMessage && (
            <span className="inline-block animate-pulse ml-2">_</span>
          )}
        </h2>
      </motion.div>

      {/* The 3-Day Plan */}
      <div className="grid md:grid-cols-3 gap-6 relative">
        {/* Connection line behind cards on desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-card-border -z-10" />

        {[0, 1, 2].map((index) => {
          const day = object?.days?.[index];
          const isVisible = !!day;

          return (
            <motion.div
              key={`day-${index}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0.5, y: 0, scale: 0.95 }
              }
              transition={{ duration: 0.4 }}
              className="card-surface p-6 relative bg-ink/90 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center justify-center bg-orange text-ink text-[11px] font-bold tracking-widest px-3 py-1 rounded-sharp">
                  DAY {index + 1}
                </span>
                {day?.duration && (
                  <span className="text-paper-muted text-xs tracking-wider">
                    {day.duration} MIN
                  </span>
                )}
              </div>

              <div className="min-h-[140px]">
                {isVisible ? (
                  <>
                    <h3 className="font-display text-paper text-xl italic mb-1">
                      {day.theme}
                    </h3>
                    <p className="text-orange text-sm font-medium mb-4 uppercase tracking-wider">
                      {day.focus}
                    </p>
                    <p className="text-paper-muted text-[14.5px] leading-relaxed">
                      {day.rationale}
                    </p>
                  </>
                ) : (
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-card-border/50 w-3/4 rounded" />
                    <div className="h-4 bg-card-border/30 w-1/2 rounded" />
                    <div className="space-y-2 pt-4">
                      <div className="h-3 bg-card-border/20 w-full rounded" />
                      <div className="h-3 bg-card-border/20 w-5/6 rounded" />
                      <div className="h-3 bg-card-border/20 w-4/6 rounded" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action appearing after generation */}
      {!isLoading && object?.days?.length === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-col items-center justify-center text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-[13px] tracking-wide uppercase font-semibold px-8 py-4 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
          >
            Start your 3-day trial
          </a>
          <p className="text-paper-faint text-sm mt-4">
            We will load this exact plan to your dashboard.
          </p>
        </motion.div>
      )}
    </div>
  );
}