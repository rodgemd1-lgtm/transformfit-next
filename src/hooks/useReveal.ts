'use client'

import { useEffect, useRef, useCallback } from 'react'
import { REVEAL_THRESHOLD, REVEAL_ROOT_MARGIN } from '@/lib/utils'

/**
 * useReveal — IntersectionObserver-based scroll reveal.
 * Adds .is-visible when element enters viewport.
 * Respects prefers-reduced-motion (WCAG 2.1 AA §2.3.3).
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  const visible = useRef(false)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !visible.current) {
        visible.current = true
        entry.target.classList.add('is-visible')
      }
    })
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced && ref.current) {
      ref.current.classList.add('is-visible')
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: REVEAL_THRESHOLD,
      rootMargin: REVEAL_ROOT_MARGIN,
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [handleIntersection])

  return ref
}

/**
 * useCounter — Animated number counter with requestAnimationFrame.
 * Counts from 0 to target over duration ms.
 */
export function useCounter(target: number, duration: number = 1200) {
  const value = useRef(0)
  const rafId = useRef<number>(0)
  const started = useRef(false)

  const start = useCallback(() => {
    if (started.current) return
    started.current = true

    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out exponential
      const eased = 1 - Math.pow(1 - progress, 3)
      value.current = Math.round(eased * target)

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick)
      }
    }
    rafId.current = requestAnimationFrame(tick)
  }, [target, duration])

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  return { value, start }
}