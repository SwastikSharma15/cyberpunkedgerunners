import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Global GSAP Configuration
export const gsapConfig = {
  defaults: {
    duration: 1.2,
    ease: "power4.inOut"
  },
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1.5,
    markers: false // Set to true for development debugging
  }
}

// Animation Presets
export const revealAnimations = {
  fadeInUp: {
    from: { y: 100, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 }
  },
  fadeInDown: {
    from: { y: -100, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 }
  },
  fadeInLeft: {
    from: { x: -100, opacity: 0, scale: 0.95 },
    to: { x: 0, opacity: 1, scale: 1 }
  },
  fadeInRight: {
    from: { x: 100, opacity: 0, scale: 0.95 },
    to: { x: 0, opacity: 1, scale: 1 }
  },
  scaleIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 }
  },
  glowIn: {
    from: { opacity: 0, filter: 'blur(10px)' },
    to: { opacity: 1, filter: 'blur(0px)' }
  }
}

// Scroll Animation Presets
export const scrollAnimations = {
  parallax: {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    }
  },
  staggerReveal: {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
}

// Animation Timeline Presets
export const createHeroTimeline = (elements: Record<string, gsap.TweenTarget>) => {
  const tl = gsap.timeline({ paused: true })

  // Background video fade in (0-0.5s)
  if (elements.background) {
    tl.fromTo(elements.background,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
  }

  // Hero text with glitch effect (0.5-1.5s)
  if (elements.headline) {
    tl.fromTo(elements.headline,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1 }
    )
  }

  // Subtitle fade in (1.5-2s)
  if (elements.subtitle) {
    tl.fromTo(elements.subtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.3"
    )
  }

  // CTA button scale effect (2-2.5s)
  if (elements.cta) {
    tl.fromTo(elements.cta,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.2"
    )
  }

  return tl
}

export const createStoryTimeline = (selector: string, panels: HTMLElement[]) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: selector,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      pinSpacing: false
    }
  })

  // Add panel transitions
  panels.forEach((panel, index) => {
    if (index > 0) {
      tl.to(panels[index - 1], { opacity: 0, x: -100 })
    }
    tl.to(panel, { opacity: 1, x: 0 })
  })

  return tl
}

// Performance Monitoring
export const optimizeAnimation = (elements: gsap.TweenTarget[]) => {
  elements.forEach(element => {
    gsap.set(element, {
      willChange: "transform, opacity",
      backfaceVisibility: "hidden" as any,
      perspective: 1000
    })
  })
}

// Easing Functions
export const customEasing = {
  smooth: "power2.inOut",
  bouncy: "back.out(1.7)",
  sharp: "power4.inOut",
  elastic: "elastic.out(1, 0.5)"
}

// Responsive Animation Adjustments
export const getResponsiveDuration = (baseDuration: number) => {
  if (window.innerWidth < 768) {
    return baseDuration * 0.8 // Faster on mobile
  }
  return baseDuration
}

// Prefers Reduced Motion Support
export const respectsReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Animation Cleanup
export const cleanupAnimations = (timelines: gsap.core.Timeline[]) => {
  timelines.forEach(timeline => {
    timeline.kill()
  })
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}