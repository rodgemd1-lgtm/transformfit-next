import { NextRequest, NextResponse } from "next/server";
import { sendOnboardingEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email, persona = "anxious_achiever", coachVoice = "jake" } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Try to send the email, but don't block the user flow if it fails
    // (e.g. if the Resend domain isn't verified yet)
    try {
      await sendOnboardingEmail(email, persona, coachVoice);
    } catch (e) {
      console.error("Failed to send onboarding email:", e);
    }

    return NextResponse.json({ success: true, message: "Trial started" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}