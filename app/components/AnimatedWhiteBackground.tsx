/* ═══════════════════════════════════════════════════════════════════════
   FUJI FENIX — Global animated white background

   Replaces the old blueprint grid (which rendered box lines behind every
   section). Pure-white base with three ultra-subtle light glows that drift
   slowly — CSS-only, zero JS, zero layout impact (fixed, -z-10,
   pointer-events-none). Reduced-motion safe.
═══════════════════════════════════════════════════════════════════════ */

export default function AnimatedWhiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-white"
    >
      <div className="bg-anim-glow bg-anim-glow--a" />
      <div className="bg-anim-glow bg-anim-glow--b" />
      <div className="bg-anim-glow bg-anim-glow--c" />
    </div>
  );
}