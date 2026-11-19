import { motion, type MotionValue } from 'motion/react'

/**
 * Hollow six-arm asterisk from the reference: the arms are drawn twice —
 * once with a thick stroke, then filled with the page colour on top —
 * which leaves only the outline of their union.
 */
export function Asterisk({ rotate, className = '' }: { rotate?: MotionValue<number>; className?: string }) {
  const arm = 'M-5.5 3 L-5.5 -44 L5.5 -47 L5.5 3 Z'
  const arms = [0, 60, 120, 180, 240, 300]
  return (
    <motion.svg viewBox="-52 -52 104 104" className={className} style={{ rotate }} aria-hidden>
      <g stroke="currentColor" strokeWidth={4.4} strokeLinejoin="round" fill="currentColor">
        {arms.map((r) => (
          <path key={r} d={arm} transform={`rotate(${r})`} />
        ))}
      </g>
      <g fill="var(--color-cream)">
        {arms.map((r) => (
          <path key={r} d={arm} transform={`rotate(${r})`} />
        ))}
      </g>
    </motion.svg>
  )
}

/** Two opposing outlined arcs — the bowl / cat-ear mark in the gallery. */
export function Arcs({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 68 64" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={1.4}>
      <path d="M2 2 A32 28 0 0 0 66 2 L54 2 A20 16 0 0 1 14 2 Z" strokeLinejoin="round" />
      <path d="M2 62 A32 28 0 0 1 66 62 L54 62 A20 16 0 0 0 14 62 Z" strokeLinejoin="round" />
    </svg>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={1.3}>
      <path d="M1 6h9M6.5 2.5 10 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
