/**
 * StitchDivider — Horizontal rule with warm gradient.
 * The "stitch" is a warm-thread line that separates sections.
 * Draws from the original clinical landing's visual grammar.
 */
export function StitchDivider({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div
        className="stitch-line"
        role="separator"
        aria-orientation="horizontal"
      />
    </div>
  )
}