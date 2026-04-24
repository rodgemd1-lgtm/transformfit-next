"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import "@copilotkit/react-ui/styles.css";

// ── Types ──────────────────────────────────────────────────────────────

export type GenUIFlavor = "controlled" | "template" | "open";
export type CoachVoice = "jake" | "aisha";
export type ConversionModel =
  | "warm_proof_ladder"
  | "confession_booth"
  | "proof_stack";
export type Persona =
  | "anxious_achiever"
  | "data_driven"
  | "identity_seeker"
  | "autonomous";

export interface Generation {
  id: string;
  componentType: string;
  flavor: GenUIFlavor;
  conversionModel: ConversionModel;
  persona: Persona;
  coachVoice: CoachVoice;
  content: string;
  htmlContent?: string;
  parsedJSON?: Record<string, unknown>;
  status: "generating" | "reviewing" | "approved" | "rejected" | "error";
  review?: DesignReview;
  timestamp: string;
}

export interface DesignReview {
  verdict: "PASS" | "WARN" | "FAIL";
  notes: string[];
  score: number;
  reviewer: "jake" | "pycode";
}

interface GenUIContextType {
  generations: Generation[];
  currentFlavor: GenUIFlavor;
  activePersona: Persona;
  addGeneration: (gen: Omit<Generation, "id" | "timestamp">) => string;
  updateGeneration: (id: string, updates: Partial<Generation>) => void;
  setFlavor: (flavor: GenUIFlavor) => void;
  setPersona: (persona: Persona) => void;
  clearGenerations: () => void;
  latestGeneration: Generation | null;
}

// ── Context ────────────────────────────────────────────────────────────

const GenUIContext = createContext<GenUIContextType | null>(null);

export function useGenUI() {
  const ctx = useContext(GenUIContext);
  if (!ctx) throw new Error("useGenUI must be used within GenUIProvider");
  return ctx;
}

// ── Together.ai Pipeline (Client-Side) ─────────────────────────────────

import { MODELS, JAKE_SYSTEM_PROMPT, AISHA_SYSTEM_PROMPT, REVIEW_SYSTEM_PROMPT } from "./together-config";

const TOGETHER_API_KEY =
  process.env.NEXT_PUBLIC_TOGETHER_API_KEY ||
  "tgp_v1_bFH05AHjQdMpk42vq9ePIjW2wU5l1gAs1Oh9xo45VZk";
const TOGETHER_BASE_URL = "https://api.together.xyz/v1";

async function callTogetherAI(
  messages: { role: string; content: string }[],
  systemPrompt: string,
  model: string = MODELS.serverless,
  temperature = 0.5,
  maxTokens = 800
): Promise<string> {
  // First try the requested model
  let response = await fetch(`${TOGETHER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  // If fine-tuned model fails (e.g. idle timeout, cold start error), fallback to serverless
  if (!response.ok && model !== MODELS.serverless) {
    console.warn(`Dedicated endpoint failed: ${response.status}. Falling back to serverless.`);
    response = await fetch(`${TOGETHER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODELS.serverless,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature,
        max_tokens: maxTokens,
      }),
    });
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Together.ai error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

// ── Provider ────────────────────────────────────────────────────────────

export function GenUIProvider({ children }: { children: React.ReactNode }) {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [currentFlavor, setCurrentFlavor] = useState<GenUIFlavor>("controlled");
  const [activePersona, setActivePersona] = useState<Persona>("anxious_achiever");
  const idCounter = useRef(0);

  const addGeneration = useCallback(
    (gen: Omit<Generation, "id" | "timestamp">): string => {
      const id = `gen-${++idCounter.current}-${Date.now().toString(36)}`;
      const newGen: Generation = {
        ...gen,
        id,
        timestamp: new Date().toISOString(),
      };
      setGenerations((prev) => [...prev, newGen]);
      return id;
    },
    []
  );

  const updateGeneration = useCallback(
    (id: string, updates: Partial<Generation>) => {
      setGenerations((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      );
    },
    []
  );

  const clearGenerations = useCallback(() => {
    setGenerations([]);
  }, []);

  const latestGeneration = generations[generations.length - 1] || null;

  return (
    <GenUIContext.Provider
      value={{
        generations,
        currentFlavor,
        activePersona,
        addGeneration,
        updateGeneration,
        setFlavor: setCurrentFlavor,
        setPersona: setActivePersona,
        clearGenerations,
        latestGeneration,
      }}
    >
      {children}
    </GenUIContext.Provider>
  );
}

// ── CopilotKit Wrapper ──────────────────────────────────────────────────

export function CopilotWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <GenUIProvider>
        <CopilotSidebar
          labels={{
            title: "TransformFit Design Studio",
            initial:
              "I can generate landing page components (hero, coach_message, CTA buttons) or review your designs against Cialdini/Fogg/Kahneman principles. Try: 'Generate a Jake coach message for someone who hasn't worked out in a week'",
          }}
          defaultOpen={false}
          clickOutsideToClose={true}
        >
          {children}
        </CopilotSidebar>
      </GenUIProvider>
    </CopilotKit>
  );
}

// ── CopilotKit Actions Hook ────────────────────────────────────────────
// This is the core GenUI integration — CopilotKit actions that call
// Together.ai and return structured component JSON.

export function useCopilotGenUIActions() {
  const { addGeneration, updateGeneration, currentFlavor, activePersona } =
    useGenUI();

  // Expose current state to the AI so it can reference it in responses
  useCopilotReadable(
    {
      description: "Current GenUI configuration and recent generations",
      value: {
        flavor: currentFlavor,
        persona: activePersona,
        recentGenerations: 0,
      },
    },
    [currentFlavor, activePersona]
  );

  // ── Action: Generate Component ──────────────────────────────────────
  // PyCode agent generates a component via Together.ai
  useCopilotAction({
    name: "generateComponent",
    description:
      "Generate a TransformFit landing page component (hero, coach_message, cta_button, section, data_metric). Returns structured JSON rendered by PyCodeRenderer.",
    parameters: [
      {
        name: "componentType",
        type: "string",
        description:
          'Component type: "hero", "coach_message", "cta_button", "section", "data_metric", "stitch_divider"',
        required: true,
      },
      {
        name: "description",
        type: "string",
        description:
          "What the component should say/communicate. Be specific about the emotional angle.",
        required: true,
      },
      {
        name: "coachVoice",
        type: "string",
        description: '"jake" or "aisha" — determines the persona voice',
        required: false,
      },
      {
        name: "conversionModel",
        type: "string",
        description: '"warm_proof_ladder", "confession_booth", or "proof_stack"',
        required: false,
      },
    ],
    handler: async ({
      componentType,
      description,
      coachVoice = "jake",
      conversionModel = "warm_proof_ladder",
    }: {
      componentType: string;
      description: string;
      coachVoice?: string;
      conversionModel?: string;
    }) => {
      const voice = (coachVoice === "aisha" ? "aisha" : "jake") as CoachVoice;
      const systemPrompt =
        voice === "jake" ? JAKE_SYSTEM_PROMPT : AISHA_SYSTEM_PROMPT;

      const genId = addGeneration({
        componentType,
        flavor: currentFlavor,
        conversionModel: conversionModel as ConversionModel,
        persona: activePersona,
        coachVoice: voice,
        content: "",
        status: "generating",
      });

      try {
        const userMessage = `Generate a "${componentType}" component for a user who is: ${description}. Conversion model: ${conversionModel}. Persona: ${activePersona}.`;
        
        // Use fine-tuned models if available
        const modelKey = voice === "aisha" ? MODELS.aisha_dedicated : MODELS.jake_dedicated;
        
        const raw = await callTogetherAI(
          [{ role: "user", content: userMessage }],
          systemPrompt,
          modelKey,
          voice === "jake" ? 0.3 : 0.5,
          800
        );

        // Parse JSON from response
        let parsed: Record<string, unknown> | null = null;
        try {
          // Try to extract JSON from the response (handle code fences)
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          }
        } catch {
          // If parsing fails, store raw content
        }

        updateGeneration(genId, {
          content: raw,
          parsedJSON: parsed || undefined,
          status: parsed ? "approved" : "error",
        });

        return parsed || { error: "Failed to parse JSON", raw };
      } catch (error) {
        updateGeneration(genId, { status: "error" });
        return { error: String(error) };
      }
    },
    render: ({
      status,
      args,
      result,
    }: {
      status: string;
      args: Record<string, any>;
      result?: unknown;
    }) => {
      const voice = args.coachVoice === "aisha" ? "Aisha" : "Jake";
      if (status === "inProgress") {
        return (
          <div className="bg-surface border border-amber-700/30 p-3 text-xs font-mono">
            <div className="text-amber-300">⚡ {voice} generating...</div>
            <div className="text-paper/60 mt-1">
              {args.componentType}: {args.description.slice(0, 60)}...
            </div>
          </div>
        );
      }
      if (status === "complete" && result) {
        const res = result as Record<string, unknown>;
        return (
          <div className="bg-surface border border-green-700/30 p-3 text-xs font-mono">
            <div className="text-green-300">✅ Component generated</div>
            <pre className="text-paper/60 mt-1 overflow-x-auto text-[10px]">
              {JSON.stringify(res, null, 2).slice(0, 300)}
            </pre>
          </div>
        );
      }
      return <span />;
    },
  });

  // ── Action: Review Design ───────────────────────────────────────────
  // Jake agent reviews a component against Cialdini/Fogg/Kahneman
  useCopilotAction({
    name: "reviewDesign",
    description:
      "Review a TransformFit component against Cialdini's 6 principles, Fogg's Behavior Model, and Kahneman's System 1/2. Returns PASS/WARN/FAIL with score.",
    parameters: [
      {
        name: "componentCode",
        type: "string",
        description: "The component JSON or description to review",
        required: true,
      },
      {
        name: "componentType",
        type: "string",
        description: "Component type being reviewed",
        required: false,
      },
    ],
    handler: async ({
      componentCode,
      componentType = "unknown",
    }: {
      componentCode: string;
      componentType?: string;
    }) => {
      try {
        const raw = await callTogetherAI(
          [
            {
              role: "user",
              content: `Review this ${componentType} component:\n\n${componentCode}`,
            },
          ],
          REVIEW_SYSTEM_PROMPT,
          MODELS.jake_dedicated, // Jake does all design reviews
          0.4,
          500
        );

        let review: DesignReview | null = null;
        try {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            review = {
              verdict: parsed.verdict || "WARN",
              notes: parsed.notes || [],
              score: parsed.score || 5,
              reviewer: "jake",
            };
          }
        } catch {
          // Fallback review
        }

        return (
          review || {
            verdict: "WARN",
            notes: ["Could not parse review response"],
            score: 5,
            reviewer: "jake",
          }
        );
      } catch (error) {
        return { verdict: "FAIL", notes: [String(error)], score: 0 };
      }
    },
    render: ({
      status,
      result,
    }: {
      status: string;
      result?: unknown;
    }) => {
      if (status === "inProgress") {
        return (
          <div className="bg-surface border border-amber-700/30 p-3 text-xs font-mono">
            <div className="text-amber-300">🔍 Jake reviewing design...</div>
          </div>
        );
      }
      if (status === "complete" && result) {
        const review = result as DesignReview;
        const color =
          review.verdict === "PASS"
            ? "green"
            : review.verdict === "WARN"
            ? "amber"
            : "red";
        return (
          <div
            className={`bg-surface border border-${color}-700/30 p-3 text-xs font-mono`}
          >
            <div className={`text-${color}-300`}>
              {review.verdict === "PASS"
                ? "✅"
                : review.verdict === "WARN"
                ? "⚠️"
                : "❌"}{" "}
              Jake Review: {review.verdict} ({review.score}/10)
            </div>
            {review.notes?.length > 0 && (
              <ul className="text-paper/60 mt-1 list-disc pl-4">
                {review.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            )}
          </div>
        );
      }
      return <span />;
    },
  });

  // ── Action: Switch Coach Voice ─────────────────────────────────────
  useCopilotAction({
    name: "switchCoach",
    description:
      'Switch between Jake (strength-focused, loss-aversion) and Aisha (holistic, identity-based) coaching voices.',
    parameters: [
      {
        name: "coach",
        type: "string",
        description: '"jake" or "aisha"',
        required: true,
      },
    ],
    handler: async ({ coach }: { coach: string }) => {
      const voice = coach === "aisha" ? "Aisha" : "Jake";
      return {
        switched: true,
        coach: voice,
        message: `Switched to ${voice}. All future generations will use ${voice}'s voice and conversion framing.`,
      };
    },
  });
}

// ── Direct API Actions (non-CopilotKit programmatic use) ─────────────

export function useGenUIActions() {
  const { addGeneration, updateGeneration, currentFlavor, activePersona } =
    useGenUI();

  const generateComponent = useCallback(
    async (params: {
      componentType: string;
      description: string;
      conversionModel?: ConversionModel;
      persona?: Persona;
      coachVoice?: CoachVoice;
    }) => {
      const voice = params.coachVoice || "jake";
      const systemPrompt =
        voice === "jake" ? JAKE_SYSTEM_PROMPT : AISHA_SYSTEM_PROMPT;

      const id = addGeneration({
        componentType: params.componentType,
        flavor: currentFlavor,
        conversionModel: params.conversionModel || "warm_proof_ladder",
        persona: params.persona || activePersona,
        coachVoice: voice,
        content: "",
        status: "generating",
      });

      try {
        const raw = await callTogetherAI(
          [
            {
              role: "user",
              content: `Generate a "${params.componentType}" component: ${params.description}. Conversion model: ${params.conversionModel || "warm_proof_ladder"}.`,
            },
          ],
          systemPrompt,
          voice === "aisha" ? MODELS.aisha_dedicated : MODELS.jake_dedicated
        );

        let parsed: Record<string, unknown> | null = null;
        try {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
        } catch {}

        updateGeneration(id, {
          content: raw,
          parsedJSON: parsed || undefined,
          status: parsed ? "approved" : "error",
        });

        return parsed;
      } catch (error) {
        updateGeneration(id, { status: "error" });
        return null;
      }
    },
    [addGeneration, updateGeneration, currentFlavor, activePersona]
  );

  const reviewComponent = useCallback(
    async (params: {
      componentType: string;
      componentCode: string;
      conversionModel?: ConversionModel;
    }) => {
      try {
        const raw = await callTogetherAI(
          [
            {
              role: "user",
              content: `Review this ${params.componentType} component:\n\n${params.componentCode}`,
            },
          ],
          REVIEW_SYSTEM_PROMPT,
          MODELS.jake_dedicated,
          0.4,
          500
        );

        try {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          if (jsonMatch) return JSON.parse(jsonMatch[0]);
        } catch {}
        return { verdict: "WARN", notes: ["Could not parse review"], score: 5 };
      } catch {
        return { verdict: "FAIL", notes: ["API error"], score: 0 };
      }
    },
    []
  );

  return { generateComponent, reviewComponent };
}