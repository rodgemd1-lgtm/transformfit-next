import { NextRequest } from "next/server";
import { streamObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import {
  TOGETHER_API_KEY,
  TOGETHER_BASE_URL,
  MODELS,
  JAKE_SYSTEM_PROMPT,
  AISHA_SYSTEM_PROMPT,
} from "@/lib/together-config";

// Create an OpenAI-compatible provider pointing to Together.ai
const together = createOpenAI({
  apiKey: TOGETHER_API_KEY,
  baseURL: TOGETHER_BASE_URL,
});

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { energy, obstacle, coachVoice = "jake" } = await req.json();

    const systemPrompt =
      coachVoice === "aisha" ? AISHA_SYSTEM_PROMPT : JAKE_SYSTEM_PROMPT;

    const result = await streamObject({
      model: together(MODELS.serverless),
      system: `${systemPrompt}

You are generating a bespoke 3-day workout plan for a user who just said:
Energy Level: ${energy}
Current Obstacle: ${obstacle}

Generate a 3-day plan. Day 1 should reflect their CURRENT state (e.g., if low energy, scale it down. If stressed, add mobility/breathwork). Day 2 and 3 should build them back up. Keep the descriptions punchy and in your coach persona.`,
      schema: z.object({
        coachMessage: z
          .string()
          .describe("A personalized opening message from the coach acknowledging their state."),
        days: z.array(
          z.object({
            dayNumber: z.number(),
            theme: z.string().describe("e.g. 'Active Recovery', 'Strength Foundation'"),
            focus: z.string().describe("e.g. 'Mobility + Core', 'Full Body'"),
            duration: z.number().describe("Duration in minutes"),
            rationale: z
              .string()
              .describe("Why this workout makes sense for them right now in the coach's voice."),
          })
        ).length(3),
      }),
      messages: [
        {
          role: "user",
          content: `I have ${energy} energy and my main obstacle right now is ${obstacle}.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Failed to generate plan:", error);
    return new Response("Error generating plan", { status: 500 });
  }
}