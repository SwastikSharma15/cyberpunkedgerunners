import { useEffect, useState, useCallback, useRef } from 'react'
import { SCROLL } from '../utils/constants'

// Hook for detecting scroll direction
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (direction !== scrollDirection && scrollY !== lastScrollY) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

// Hook for tracking scroll progress
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100

      setProgress(scrolled)
      setScrollY(winScroll)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScrollProgress() // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { progress, scrollY }
}

// Hook for scroll-based element visibility
export const useScrollVisibility = (
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return { isVisible, elementRef }
}

// Hook for parallax scrolling
export const useScrollParallax = (
  speed: number = 0.5,
  direction: 'y' | 'x' = 'y'
) => {
  const elementRef = useRef<HTMLElement | null>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let ticking = false

    const updateParallax = () => {
      const scrollY = window.scrollY
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrollY
      const elementHeight = rect.height
      const windowHeight = window.innerHeight

      // Calculate how far the element is from the center of the viewport
      const elementCenter = elementTop + elementHeight / 2
      const viewportCenter = scrollY + windowHeight / 2
      const distance = elementCenter - viewportCenter

      const translate = distance * speed

      setTransform(prev => ({
        ...prev,
        [direction]: translate
      }))

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateParallax() // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [speed, direction])

  return { elementRef, transform }
}

// Hook for scroll-based animation triggers
export const useScrollTrigger = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: {
    threshold?: number | number[]
    rootMargin?: string
    triggerOnce?: boolean
  }
) => {
  const elementRef = useRef<HTMLElement | null>(null)
  const [hasTriggered, setHasTriggered] = useState(false)

  const threshold = options?.threshold ?? 0.1
  const rootMargin = options?.rootMargin ?? '0px'
  const triggerOnce = options?.triggerOnce ?? false

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          callback(entry)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [callback, threshold, rootMargin, triggerOnce, hasTriggered])

  return elementRef
}

// Hook for smooth scroll to element
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = SCROLL.OFFSET) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: SCROLL.BEHAVIOR
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: SCROLL.BEHAVIOR
    })
  }, [])

  return { scrollToElement, scrollToTop }
}

// Hook for scroll-based navbar effects
export const useScrollNavbarEffect = (
  onScrollUp?: () => void,
  onScrollDown?: () => void,
  threshold: number = 100
) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrolled = scrollY > threshold

      setIsScrolled(scrolled)

      if (scrollDirection === 'up' && onScrollUp) {
        onScrollUp()
      } else if (scrollDirection === 'down' && onScrollDown) {
        onScrollDown()
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollDirection, onScrollUp, onScrollDown, threshold])

  return isScrolled
}

// Hook for scroll position-based state
export const useScrollPosition = (
  positions: Array<{ scrollY: number; action: () => void }>
) => {
  useEffect(() => {
    let ticking = false

    const checkScrollPosition = () => {
      const scrollY = window.scrollY

      positions.forEach(({ scrollY: position, action }) => {
        if (Math.abs(scrollY - position) < 10) { // 10px tolerance
          action()
        }
      })

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkScrollPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [positions])
}