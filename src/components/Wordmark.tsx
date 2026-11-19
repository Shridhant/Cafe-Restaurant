import { motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { ease } from './ease'

const WORD = 'GREEN NEKO'
const TRACK = '-0.075em'
const SPACE = '0.16em'

/**
 * Oversized wordmark that always spans the full content width,
 * like the reference. Font size is solved from a measurement at 100px.
 */
export function Wordmark() {
  const boxRef = useRef<HTMLDivElement>(null)
  const probeRef = useRef<HTMLSpanElement>(null)
  const [size, setSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const box = boxRef.current
    const probe = probeRef.current
    if (!box || !probe) return
    const fit = () => {
      const w = probe.getBoundingClientRect().width
      if (w) setSize((box.clientWidth / w) * 100)
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  const letterClass = 'inline-block font-black'
  const chars = WORD.split('')

  return (
    <div ref={boxRef} className="relative">
      {/* invisible probe used to measure the word at 100px */}
      <span
        ref={probeRef}
        aria-hidden
        className="invisible absolute left-0 top-0 whitespace-nowrap text-[100px] leading-none"
        style={{ paddingRight: '0.075em' }}
      >
        {chars.map((ch, i) =>
          ch === ' ' ? (
            <span key={i} className="inline-block" style={{ width: SPACE }} />
          ) : (
            <span key={i} className={letterClass} style={{ letterSpacing: TRACK }}>
              {ch}
            </span>
          ),
        )}
      </span>

      <h1
        aria-label="Green Neko"
        className="overflow-hidden whitespace-nowrap leading-[0.86] text-forest"
        style={{
          fontSize: size ? `${size}px` : '12vw',
          paddingRight: '0.075em',
          opacity: size ? 1 : 0,
        }}
      >
        {chars.map((ch, i) =>
          ch === ' ' ? (
            <span key={i} aria-hidden className="inline-block" style={{ width: SPACE }} />
          ) : (
            <motion.span
              key={i}
              aria-hidden
              className={letterClass}
              style={{ letterSpacing: TRACK }}
              initial={{ y: '100%' }}
              animate={size ? { y: '0%' } : undefined}
              transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.05 }}
            >
              {ch}
            </motion.span>
          ),
        )}
      </h1>
    </div>
  )
}
