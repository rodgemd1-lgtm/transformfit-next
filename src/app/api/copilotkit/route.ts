import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

// ── CopilotKit Runtime ──────────────────────────────────────────────
// The CopilotKit runtime proxies LLM calls through our /api/copilotkit route.
// The OpenAI-compatible adapter is configured client-side in copilotkit.tsx
// to use Together.ai's endpoint with Llama-3.3-70B-Instruct-Turbo.
//
// See: /src/lib/copilotkit.tsx for the Together.ai pipeline (dual-model)
// See: /src/lib/together-config.ts for model IDs, API keys, system prompts
// See: /studio/genui/pipeline/together.py for the Python pipeline

const runtime = new CopilotRuntime();

const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
  runtime,
  endpoint: "/api/copilotkit",
});

export async function POST(req: NextRequest) {
  return handleRequest(req);
}