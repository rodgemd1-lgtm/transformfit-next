'use client'

/**
 * Ladder — Two-question engagement gate.
 *
 * Fogg behavior model:
 *   Trigger: "Show me what today looks like" — immediate value proposition
 *   Ability: 2 questions only, no email required — reduces friction to near-zero
 *   Motivation: Curiosity gap — "what would the plan say about MY week?"
 *
 * Cialdini: Commitment & consistency — once they answer 2 questions,
 * they've psychologically committed to trying.
 *
 * NN/g: Error prevention — no wrong answers, no required fields, no signup wall.
 */

interface LadderProps {
  opener?: string
  q1?: string
  q2?: string
  cta?: string
}

export function Ladder({
  opener = 'Two questions. No email. Close the tab anytime. We will not optimize for your guilt.',
  q1 = 'What does your energy feel like right now, honestly?',
  q2 = 'How many days this week do you want to move?',
  cta = 'Show me what today looks like',
}: LadderProps) {
  return (
    <section
      id="ladder"
      className="section-inset"
      aria-label="Quick check-in"
    >
      <div className="container-atelier" style={{ maxWidth: 600 }}>
        <p className="label-caps mb-10 text-center" style={{ letterSpacing: '0.3em' }}>
          Try it
        </p>
        <p
          className="text-center mb-10"
          style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper-muted)' }}
        >
          {opener}
        </p>

        {/* Q1 */}
        <div className="mb-8">
          <label
            htmlFor="ladder-q1"
            className="block font-display text-paper mb-3"
            style={{ fontSize: 19, fontStyle: 'italic' }}
          >
            {q1}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Low', 'Medium', 'Honest'].map((opt) => (
              <button
                key={opt}
                type="button"
                className="card-surface p-3 text-center text-paper-muted hover:text-paper hover:border-orange/30 transition-colors"
                style={{ cursor: 'pointer', fontSize: 14 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="mb-10">
          <label
            htmlFor="ladder-q2"
            className="block font-display text-paper mb-3"
            style={{ fontSize: 19, fontStyle: 'italic' }}
          >
            {q2}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['2', '3', '4', '5+'].map((opt) => (
              <button
                key={opt}
                type="button"
                className="card-surface p-3 text-center text-paper-muted hover:text-paper hover:border-orange/30 transition-colors"
                style={{ cursor: 'pointer', fontSize: 15, fontWeight: 600 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-semibold px-8 py-3.5 rounded-sharp bg-orange text-ink hover:bg-orange-600 transition-colors"
          >
            {cta}
          </a>
          <p className="mt-4" style={{ fontSize: 12, color: 'var(--paper-faint)' }}>
            No signup required. Open the demo dashboard.
          </p>
        </div>
      </div>
    </section>
  )
}