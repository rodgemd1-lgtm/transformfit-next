# Deploying Jake & Aisha Fine-Tuned Models

## Status

Both fine-tune jobs are **COMPLETED**:
- **Jake**: `rodgemd1_3218/Llama-3.3-70B-Instruct-Reference-transformfit-jake-d728b385`
- **Aisha**: `rodgemd1_3218/Llama-3.3-70B-Instruct-Reference-transformfit-aisha-58835bae`

## Current Setup (Working)

The serverless fallback is active:
- **Model**: `meta-llama/Llama-3.3-70B-Instruct-Turbo`
- **Jake voice**: System prompt with Jake's personality injected
- **Aisha voice**: System prompt with Aisha's personality injected
- **Score**: Jake generates valid `coach_message` JSON. Review passes at 8-9/10.

## Creating Dedicated Endpoints (Manual Step)

The Together.ai API doesn't allow creating dedicated endpoints for fine-tuned models programmatically. You need to create them through the web dashboard:

1. Go to https://api.together.ai/models
2. Find your fine-tuned model in the list
3. Click **"CREATE DEDICATED ENDPOINT"**
4. Select hardware: **2x NVIDIA A100 80GB SXM** (required for 70B model)
5. Set autoscaling: **min=1, max=1** 
6. Set **inactive_timeout=60** (auto-shutdown after 1 hour idle)
7. Click **"DEPLOY"**
8. Copy the endpoint name (e.g., `rodgemd1_3218/Llama-3.3-70B-Instruct-Reference-transformfit-jake-d728b385-xxxx`)
9. Repeat for Aisha

**Estimated cost**: ~$5.18/hour per endpoint (2x A100 80GB SXM at 8.64¢/min)

## After Creating Endpoints

Update `src/lib/together-config.ts`:

```typescript
export const MODELS = {
  serverless: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  jake_dedicated: "rodgemd1_3218/<endpoint-name-from-dashboard>",  // Replace after creating
  aisha_dedicated: "rodgemd1_3218/<endpoint-name-from-dashboard>",  // Replace after creating
} as const;
```

Then update `src/lib/copilotkit.tsx` to try the dedicated endpoint first, falling back to serverless:

```typescript
async function callTogetherAI(messages, systemPrompt, preferredModel = "jake") {
  const modelKey = preferredModel === "aisha" ? "aisha_dedicated" : "jake_dedicated";
  const dedicatedModel = MODELS[modelKey];
  
  try {
    // Try fine-tuned model first
    return await fetchCompletion(messages, systemPrompt, dedicatedModel);
  } catch {
    // Fallback to serverless with persona system prompt
    console.log(`Dedicated endpoint unavailable, falling back to serverless`);
    return await fetchCompletion(messages, systemPrompt, MODELS.serverless);
  }
}
```

## Testing After Deployment

```bash
curl -s https://api.together.xyz/v1/chat/completions \
  -H "Authorization: Bearer $TOGETHER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "rodgemd1_3218/<endpoint-name-from-dashboard>",
    "messages": [{"role": "user", "content": "Generate a coach message for someone who skipped 3 days"}],
    "max_tokens": 200
  }'
```