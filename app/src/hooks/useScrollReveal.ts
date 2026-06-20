import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollRevealOptions {
  /** 从下方偏移的像素量 */
  y?: number
  /** 持续时间 (秒) */
  duration?: number
  /** 延迟 (秒) */
  delay?: number
  /** GSAP ease */
  ease?: string
  /** ScrollTrigger start 条件 */
  start?: string
  /** 使用 IntersectionObserver 而非 ScrollTrigger */
  useObserver?: boolean
  /** IntersectionObserver threshold */
  threshold?: number
}

/**
 * 统一的滚动揭示动画 hook — 包装 GSAP ScrollTrigger (默认) 或 IntersectionObserver
 *
 * @param ref        目标元素的 ref
 * @param options    动画配置
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const {
    y = 60,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    start = 'top 80%',
    useObserver = false,
    threshold = 0.15,
  } = options

  const hasPlayed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasPlayed.current) return

    if (useObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !hasPlayed.current) {
              hasPlayed.current = true
              gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration, delay, ease })
              observer.disconnect()
              break
            }
          }
        },
        { threshold }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }

    // 默认使用 ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [ref, y, duration, delay, ease, start, useObserver, threshold])
}

/**
 * 逐个子元素的交错显现动画
 * 用于卡片列表、筛选栏等包含多个子元素的区域
 */
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  options: ScrollRevealOptions & { stagger?: number } = {},
) {
  const {
    y = 30,
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    stagger = 0.08,
    threshold = 0.1,
  } = options

  const hasPlayed = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasPlayed.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayed.current) {
            hasPlayed.current = true
            const targets = container.querySelectorAll(selector)
            gsap.fromTo(targets, { opacity: 0, y }, { opacity: 1, y: 0, duration, delay, stagger, ease })
            observer.disconnect()
            break
          }
        }
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [containerRef, selector, y, duration, delay, ease, stagger, threshold])
}