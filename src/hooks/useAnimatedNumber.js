import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function useAnimatedNumber(target, duration = 400) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef(null)
  const startRef = useRef(target)
  const startTimeRef = useRef(null)

  useEffect(() => {
    const from = startRef.current
    const to = target

    if (from === to) return

    startTimeRef.current = performance.now()

    function animate(now) {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      setDisplay(from + (to - from) * eased)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        startRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      startRef.current = to
    }
  }, [target, duration])

  return display
}
