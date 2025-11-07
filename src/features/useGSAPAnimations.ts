import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  revealAnimations,
  createHeroTimeline,
  respectsReducedMotion,
  optimizeAnimation,
  cleanupAnimations
} from '../utils/animationConfig'
import { DURATIONS } from '../utils/constants'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Generic hook for reveal animations
export const useRevealAnimation = (
  selector: string,
  animationType: keyof typeof revealAnimations,
  options?: {
    delay?: number
    duration?: number
    stagger?: number
    scrollTrigger?: boolean
  }
) => {
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Skip animation if reduced motion is preferred
    if (respectsReducedMotion()) return

    // Optimize for performance
    optimizeAnimation([element])

    const animation = revealAnimations[animationType]
    const delay = options?.delay || 0
    const duration = options?.duration || DURATIONS.NORMAL
    const stagger = options?.stagger || 0
    const useScrollTrigger = options?.scrollTrigger ?? true

    const timeline = gsap.timeline({
      delay,
      scrollTrigger: useScrollTrigger ? {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      } : undefined
    })

    if (stagger > 0) {
      timeline.fromTo(
        element.children,
        { ...animation.from },
        {
          ...animation.to,
          duration,
          stagger
        }
      )
    } else {
      timeline.fromTo(
        element,
        { ...animation.from },
        {
          ...animation.to,
          duration
        }
      )
    }

    return () => {
      timeline.kill()
    }
  }, [animationType, options, selector])

  return elementRef
}

// Hook for parallax effects
export const useParallax = (
  _selector: string,
  speed: number = 0.5
) => {
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (respectsReducedMotion()) return

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(element, {
          y: progress * speed * 100,
          duration: 0.3,
          ease: "none"
        })
      }
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [speed])

  return elementRef
}

// Hook for hero animations
export const useHeroAnimation = (elements: Record<string, HTMLElement>) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (respectsReducedMotion()) {
      // Simple fallback animation
      Object.values(elements).forEach(element => {
        gsap.set(element, { opacity: 1, y: 0 })
      })
      return
    }

    optimizeAnimation(Object.values(elements))
    timelineRef.current = createHeroTimeline(elements)

    // Start the animation after a brief delay
    setTimeout(() => {
      timelineRef.current?.play()
    }, 100)

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [elements])

  return timelineRef
}

// Hook for scroll-triggered timeline animations
export const useScrollTimeline = (
  triggerSelector: string,
  panelSelectors: string[],
  options?: {
    scrub?: boolean
    pin?: boolean
    pinSpacing?: boolean
  }
) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const panels = panelSelectors.map(selector =>
      document.querySelector(selector) as HTMLElement
    ).filter(Boolean)

    if (panels.length === 0) return

    if (respectsReducedMotion()) {
      // Simple fallback - show all panels
      panels.forEach(panel => {
        gsap.set(panel, { opacity: 1, x: 0 })
      })
      return
    }

    const scrub = options?.scrub ?? true
    const pin = options?.pin ?? true
    const pinSpacing = options?.pinSpacing ?? false

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top top",
        end: "bottom top",
        scrub: scrub ? 1 : false,
        pin,
        pinSpacing
      }
    })

    // Add panel transitions
    panels.forEach((panel, index) => {
      if (index > 0) {
        timelineRef.current?.to(panels[index - 1], {
          opacity: 0,
          x: -100,
          duration: 0.5
        })
      }
      timelineRef.current?.to(panel, {
        opacity: 1,
        x: 0,
        duration: 0.5
      })
    })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [triggerSelector, panelSelectors, options])

  return timelineRef
}

// Hook for responsive animation adjustments
export const useResponsiveAnimation = (
  animations: {
    mobile?: gsap.TweenVars
    tablet?: gsap.TweenVars
    desktop?: gsap.TweenVars
  }
) => {
  const elementRef = useRef<HTMLElement | null>(null)

  const updateAnimation = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const width = window.innerWidth

    let animation: gsap.TweenVars = {}
    if (width < 768 && animations.mobile) {
      animation = animations.mobile
    } else if (width < 1024 && animations.tablet) {
      animation = animations.tablet
    } else if (animations.desktop) {
      animation = animations.desktop
    }

    if (Object.keys(animation).length > 0) {
      gsap.to(element, animation)
    }
  }, [animations])

  useEffect(() => {
    updateAnimation()

    const handleResize = () => {
      updateAnimation()
    }

    // Throttle resize events
    let resizeTimer: number
    const throttledResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', throttledResize)

    return () => {
      window.removeEventListener('resize', throttledResize)
      clearTimeout(resizeTimer)
    }
  }, [updateAnimation])

  return elementRef
}

// Hook for managing multiple animations
export const useAnimationManager = () => {
  const timelinesRef = useRef<gsap.core.Timeline[]>([])
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])

  const addTimeline = useCallback((timeline: gsap.core.Timeline) => {
    timelinesRef.current.push(timeline)
  }, [])

  const addScrollTrigger = useCallback((scrollTrigger: ScrollTrigger) => {
    scrollTriggersRef.current.push(scrollTrigger)
  }, [])

  const cleanup = useCallback(() => {
    cleanupAnimations(timelinesRef.current)
    timelinesRef.current = []
    scrollTriggersRef.current = []
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    addTimeline,
    addScrollTrigger,
    cleanup
  }
}