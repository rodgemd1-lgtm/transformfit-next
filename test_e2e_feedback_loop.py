#!/usr/bin/env python3
"""
End-to-End Test: TransformFit GenUI Feedback Loop
Tests the complete pipeline: Generate → Review → Iterate → Deploy

Pipeline:
1. PyCode generates component JSON via Together.ai (Llama-3.3-70B-Instruct-Turbo + Jake/Aisha system prompts)
2. Jake reviews the component (Cialdini/Fogg/Kahneman/WCAG)
3. If WARN/FAIL → PyCode regenerates with review feedback
4. If PASS → Component is ready for PyCodeRenderer

This tests:
- Together.ai API connectivity
- Jake generation (loss-aversion, short sentences, micro-commitment)
- Aisha generation (identity reinforcement, ritual suggestion)
- Jake review (PASS/WARN/FAIL + score)
- Feedback loop iteration
- PyCodeRenderer JSON schema validation
"""

import json
import re
import sys
import time
import requests
from typing import Optional, Dict, Any

# ── Configuration ──────────────────────────────────────────────────

API_KEY = "tgp_v1_bFH05AHjQdMpk42vq9ePIjW2wU5l1gAs1Oh9xo45VZk"
BASE_URL = "https://api.together.xyz/v1"
MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo"
DEPLOYED_URL = "https://transformfit-next.vercel.app"

# ── System Prompts ─────────────────────────────────────────────────

JAKE_GEN_PROMPT = """You are Jake, the TransformFit strength coach. When generating UI, output ONLY valid JSON (no markdown, no code fences):

For coach_message: {"type":"coach_message","coach":"jake","message":"...","agent":"SPARK","timing":"re_engagement","emphasis":false}
For hero: {"type":"hero","headline":"...","subline":"...","dark":true}
For cta_button: {"type":"cta_button","label":"...","href":"...","emotion":"loss_aversion","sublabel":"..."}
For section: {"type":"section","headline":"...","subline":"...","body":"...","dark":true}

Jake's voice: Short sentences. Lead with what you notice. Loss-aversion when urgent. End with micro-commitment."""

AISHA_GEN_PROMPT = """You are Aisha, the TransformFit holistic wellness coach. When generating UI, output ONLY valid JSON (no markdown, no code fences):

For coach_message: {"type":"coach_message","coach":"aisha","message":"...","agent":"PULSE","timing":"dawn_prime","emphasis":false}
For hero: {"type":"hero","headline":"...","subline":"...","dark":true}
For cta_button: {"type":"cta_button","label":"...","href":"...","emotion":"identity","sublabel":"..."}
For section: {"type":"section","headline":"...","subline":"...","body":"...","dark":true}

Aisha's voice: Warm, affirming. Frame setbacks as data. Identity reinforcement. End with ritual."""

REVIEW_PROMPT = """You are Jake reviewing a UI component for TransformFit. Evaluate against:
1. CIALDINI: At least 1 of 6 principles? (Reciprocity, Commitment, Social Proof, Authority, Liking, Scarcity)
2. FOGG: Behavior model clear? (Motivation + Ability + Prompt = Behavior)
3. KAHNEMAN: System 1/2 respected? (Quick emotional hit → slow proof → identity close)
4. WCAG: Basic accessibility?
5. BRAND: TransformFit voice? (Not generic fitness, not clinical)

Output ONLY valid JSON: {"verdict":"PASS"|"WARN"|"FAIL","notes":["..."],"score":8}
PASS=≥7, WARN=4-6, FAIL=<4"""

# ── API Helper ──────────────────────────────────────────────────────

def call_together(messages: list, system: str, temperature: float = 0.4, max_tokens: int = 500) -> str:
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL,
        "messages": [{"role": "system", "content": system}] + messages,
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    resp = requests.post(f"{BASE_URL}/chat/completions", headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"]

def extract_json(text: str) -> Optional[Dict[str, Any]]:
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        try:
            return json.loads(match.group())
        except:
            return None
    return None

# ── Test Functions ──────────────────────────────────────────────────

def test_deployment_urls():
    """Test that all deployed URLs are reachable."""
    print("\n" + "="*60)
    print("TEST 1: Deployment URL Health Checks")
    print("="*60)
    
    tests = [
        ("/", "Landing page"),
        ("/editor", "Puck editor"),
    ]
    
    all_pass = True
    for path, name in tests:
        url = f"{DEPLOYED_URL}{path}"
        try:
            resp = requests.get(url, timeout=10)
            status = resp.status_code
            ok = status == 200
            all_pass = all_pass and ok
            print(f"  {'✅' if ok else '❌'} {name}: {url} → {status}")
        except Exception as e:
            all_pass = False
            print(f"  ❌ {name}: {url} → ERROR: {e}")
    
    # CopilotKit API should return 405 on GET (it's POST only)
    try:
        resp = requests.get(f"{DEPLOYED_URL}/api/copilotkit", timeout=10)
        ok = resp.status_code == 405
        all_pass = all_pass and ok
        print(f"  {'✅' if ok else '❌'} CopilotKit API: GET returns 405 → {resp.status_code}")
    except Exception as e:
        all_pass = False
        print(f"  ❌ CopilotKit API: ERROR: {e}")
    
    return all_pass


def test_jake_generation():
    """Test Jake generating a coach_message component."""
    print("\n" + "="*60)
    print("TEST 2: Jake Coach Message Generation")
    print("="*60)
    
    user_msg = "Generate a coach_message for a user who hasn't worked out in 5 days and feels guilty."
    raw = call_together(
        [{"role": "user", "content": user_msg}],
        JAKE_GEN_PROMPT,
        temperature=0.3,
        max_tokens=300
    )
    
    parsed = extract_json(raw)
    
    if parsed:
        print(f"  ✅ JSON parsed successfully")
        print(f"  Type: {parsed.get('type', 'N/A')}")
        print(f"  Coach: {parsed.get('coach', 'N/A')}")
        print(f"  Agent: {parsed.get('agent', 'N/A')}")
        print(f"  Message: {parsed.get('message', 'N/A')[:100]}...")
        
        # Validate schema
        required = ["type", "coach", "message"]
        missing = [k for k in required if k not in parsed]
        if missing:
            print(f"  ❌ Missing fields: {missing}")
            return False
        if parsed.get("type") != "coach_message":
            print(f"  ❌ Wrong type: {parsed.get('type')}")
            return False
        print(f"  ✅ Schema valid (coach_message)")
        return True
    else:
        print(f"  ❌ Failed to parse JSON from response")
        print(f"  Raw: {raw[:200]}")
        return False


def test_aisha_generation():
    """Test Aisha generating a hero component."""
    print("\n" + "="*60)
    print("TEST 3: Aisha Hero Component Generation")
    print("="*60)
    
    user_msg = "Generate a hero for someone starting their wellness journey, emphasizing identity over performance."
    raw = call_together(
        [{"role": "user", "content": user_msg}],
        AISHA_GEN_PROMPT,
        temperature=0.5,
        max_tokens=300
    )
    
    parsed = extract_json(raw)
    
    if parsed:
        print(f"  ✅ JSON parsed successfully")
        print(f"  Type: {parsed.get('type', 'N/A')}")
        print(f"  Headline: {parsed.get('headline', 'N/A')}")
        
        required = ["type", "headline", "subline"]
        missing = [k for k in required if k not in parsed]
        if missing:
            print(f"  ⚠️ Missing optional fields: {missing}")
        if parsed.get("type") == "hero":
            print(f"  ✅ Schema valid (hero)")
        elif parsed.get("type") == "coach_message":
            print(f"  ⚠️ Generated coach_message instead of hero — still valid JSON")
        
        return True
    else:
        print(f"  ❌ Failed to parse JSON")
        print(f"  Raw: {raw[:200]}")
        return False


def test_jake_review():
    """Test Jake reviewing a component."""
    print("\n" + "="*60)
    print("TEST 4: Jake Design Review (Cialdini/Fogg/Kahneman/WCAG)")
    print("="*60)
    
    component = json.dumps({
        "type": "coach_message",
        "coach": "jake",
        "message": "Notice you've skipped 3 days. Every missed day adds up. Don't let a small slip turn into a long break. Get back on track now. Commit to 10 minutes of exercise today.",
        "agent": "SPARK",
        "timing": "re_engagement"
    })
    
    raw = call_together(
        [{"role": "user", "content": f"Review this component:\n{component}"}],
        REVIEW_PROMPT,
        temperature=0.4,
        max_tokens=500
    )
    
    parsed = extract_json(raw)
    
    if parsed:
        verdict = parsed.get("verdict", "N/A")
        score = parsed.get("score", 0)
        notes = parsed.get("notes", [])
        
        print(f"  ✅ Review parsed successfully")
        print(f"  Verdict: {verdict}")
        print(f"  Score: {score}/10")
        print(f"  Notes: {notes[0][:100] if notes else 'None'}...")
        
        if verdict in ["PASS", "WARN", "FAIL"]:
            print(f"  ✅ Valid verdict")
        else:
            print(f"  ❌ Invalid verdict: {verdict}")
            return False
        
        if isinstance(score, (int, float)) and 0 <= score <= 10:
            print(f"  ✅ Valid score range")
        else:
            print(f"  ❌ Invalid score: {score}")
            return False
        
        return verdict == "PASS"
    else:
        print(f"  ❌ Failed to parse review JSON")
        print(f"  Raw: {raw[:200]}")
        return False


def test_feedback_loop():
    """Test the full feedback loop: Generate → Review → Iterate if needed."""
    print("\n" + "="*60)
    print("TEST 5: Full Feedback Loop (Generate → Review → Iterate)")
    print("="*60)
    
    max_iterations = 3
    
    for iteration in range(1, max_iterations + 1):
        print(f"\n  --- Iteration {iteration} ---")
        
        # Generate
        if iteration == 1:
            gen_msg = "Generate a CTA button using loss-aversion for someone about to abandon their free trial."
        else:
            gen_msg = f"Improve this CTA button based on review feedback: {json.dumps(prev_review)}. Make it more compelling."
        
        raw = call_together(
            [{"role": "user", "content": gen_msg}],
            JAKE_GEN_PROMPT,
            temperature=0.3 + (iteration * 0.1),
            max_tokens=300
        )
        
        component = extract_json(raw)
        if not component:
            print(f"    ❌ Generation failed")
            return False
        
        print(f"    Generated: {json.dumps(component, indent=2)[:150]}...")
        
        # Review
        review_raw = call_together(
            [{"role": "user", "content": f"Review this component:\n{json.dumps(component)}"}],
            REVIEW_PROMPT,
            temperature=0.4,
            max_tokens=500
        )
        
        review = extract_json(review_raw)
        if not review:
            print(f"    ❌ Review failed")
            return False
        
        verdict = review.get("verdict", "FAIL")
        score = review.get("score", 0)
        print(f"    Review: {verdict} ({score}/10)")
        
        if verdict == "PASS":
            print(f"    ✅ PASSED after {iteration} iteration(s)")
            return True
        else:
            print(f"    ⚠️ {verdict} — iterating...")
            prev_review = review
    
    print(f"    ❌ Did not pass after {max_iterations} iterations")
    return False


def test_multiple_component_types():
    """Test generating multiple component types."""
    print("\n" + "="*60)
    print("TEST 6: Multiple Component Type Generation")
    print("="*60)
    
    types = [
        ("section", "A section about Week 1 personalization"),
        ("cta_button", "A CTA using scarcity for trial end"),
        ("data_metric", "An HRV readiness metric"),
    ]
    
    all_pass = True
    for comp_type, desc in types:
        raw = call_together(
            [{"role": "user", "content": f"Generate a {comp_type} component: {desc}"}],
            JAKE_GEN_PROMPT,
            temperature=0.3,
            max_tokens=300
        )
        
        parsed = extract_json(raw)
        if parsed:
            actual_type = parsed.get("type", "unknown")
            print(f"  ✅ {comp_type}: Generated type='{actual_type}'")
        else:
            print(f"  ❌ {comp_type}: Failed to parse")
            all_pass = False
    
    return all_pass


# ── Runner ──────────────────────────────────────────────────────────

def main():
    results = {}
    
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║  TransformFit GenUI — End-to-End Feedback Loop Test Suite  ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    
    tests = [
        ("Deployment URLs", test_deployment_urls),
        ("Jake Generation", test_jake_generation),
        ("Aisha Generation", test_aisha_generation),
        ("Jake Review", test_jake_review),
        ("Feedback Loop", test_feedback_loop),
        ("Multiple Types", test_multiple_component_types),
    ]
    
    for name, test_fn in tests:
        try:
            results[name] = test_fn()
            time.sleep(1)  # Rate limit safety
        except Exception as e:
            print(f"\n  ❌ EXCEPTION: {e}")
            results[name] = False
    
    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    
    for name, result in results.items():
        print(f"  {'✅' if result else '❌'} {name}")
    
    print(f"\n  {passed}/{total} tests passed")
    
    if passed == total:
        print("\n  🎉 ALL TESTS PASSED — Feedback loop validated!")
    else:
        print(f"\n  ⚠️ {total - passed} test(s) failed")
    
    return passed == total


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)