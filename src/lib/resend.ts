import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_19HcXDp1_3xyhcVyzkovYehC1uGSXii8Z");

export async function sendOnboardingEmail(
  to: string,
  persona: "anxious_achiever" | "data_driven" | "identity_seeker" | "autonomous",
  coachVoice: "jake" | "aisha"
) {
  const fromName = coachVoice === "jake" ? "Jake at TransformFit" : "Aisha at TransformFit";
  
  // Dawn Prime (Day 0) onboarding message from the bridge
  const subject = 
    coachVoice === "jake" 
      ? "Your week was rough. The plan already knows." 
      : "Baseline metrics establishing. Your plan is live.";
      
  const body = 
    coachVoice === "jake"
      ? `Welcome.\n\nThe plan already knows your week was rough. That's not a problem — it's the starting point.\n\nLet's go.\n\nJake`
      : `Welcome.\n\nYour baseline metrics are being established. Over the next 3 days, I'll calibrate your plan against your actual readiness data. This is where precision begins.\n\nAisha`;

  try {
    const data = await resend.emails.send({
      from: `${fromName} <onboarding@transformfit.app>`, // Needs verified domain on Resend
      to: [to],
      subject: subject,
      text: body,
      // html: can add formatted version later
    });
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}