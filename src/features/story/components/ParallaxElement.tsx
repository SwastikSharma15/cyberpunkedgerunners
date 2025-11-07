import React, { useEffect, useRef } from 'react'
import { useScrollParallax } from '../../shared/hooks/useScrollEffects'

interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  direction?: 'x' | 'y'
  className?: string
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'y',
  className = ''
}) => {
  const { elementRef, transform } = useScrollParallax(speed, direction)

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `${direction === 'x' ? `translateX(${transform.x}px)` : `translateY(${transform.y}px)`}`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

// Specialized parallax components for specific use cases
export const FloatingData: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  const { elementRef, transform } = useScrollParallax(0.3, 'y')

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `translateY(${transform.y}px) rotate(${transform.y * 0.1}deg)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

export const GlitchingElement: React.FC<{
  children: React.ReactNode
  glitchIntensity?: number
  className?: string
}> = ({ children, glitchIntensity = 1, className = '' }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const { transform } = useScrollParallax(0.2, 'x')

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const createGlitch = () => {
      const glitchX = (Math.random() - 0.5) * glitchIntensity * 4
      const glitchY = (Math.random() - 0.5) * glitchIntensity * 2
      const glitchDuration = 50 + Math.random() * 100

      element.style.transform = `
        translateX(${transform.x + glitchX}px)
        translateY(${glitchY}px)
        hue-rotate(${Math.random() * 30 - 15}deg)
      `

      setTimeout(() => {
        element.style.transform = `translateX(${transform.x}px)`
      }, glitchDuration)
    }

    // Random glitching
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance
        createGlitch()
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [transform, glitchIntensity])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transition: 'transform 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

export const RotatingOrb: React.FC<{
  size?: 'sm' | 'md' | 'lg'
  color?: 'cyan' | 'pink' | 'blue'
  className?: string
}> = ({ size = 'md', color = 'cyan', className = '' }) => {
  const { elementRef, transform } = useScrollParallax(0.5, 'y')

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const colorClasses = {
    cyan: 'border-electric-cyan bg-electric-cyan/10',
    pink: 'border-neon-pink bg-neon-pink/10',
    blue: 'border-digital-blue bg-digital-blue/10'
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `translateY(${transform.y}px) rotate(${transform.y * 0.2}deg)`,
        willChange: 'transform'
      }}
    >
      <div className={`
        ${sizeClasses[size]} ${colorClasses[color]}
        rounded-full border-2 relative
        animate-pulse-slow
      `}>
        <div className="absolute inset-2 rounded-full border border-current/30" />
        <div className="absolute inset-4 rounded-full border border-current/20" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-current/20 to-transparent animate-spin" />
      </div>
    </div>
  )
}

export const DataStream: React.FC<{
  direction?: 'up' | 'down'
  className?: string
}> = ({ direction = 'up', className = '' }) => {
  const streamRef = useRef<HTMLDivElement>(null)
  const { transform } = useScrollParallax(0.8, 'y')

  useEffect(() => {
    const stream = streamRef.current
    if (!stream) return

    const createDataStream = () => {
      const dataLine = document.createElement('div')
      dataLine.className = 'absolute w-px h-8 bg-gradient-to-b from-transparent via-electric-cyan to-transparent'
      dataLine.style.left = `${Math.random() * 100}%`
      dataLine.style.animation = `data-flow ${1 + Math.random() * 2}s linear ${direction === 'up' ? 'reverse' : 'normal'}`
      stream.appendChild(dataLine)

      setTimeout(() => {
        dataLine.remove()
      }, 3000)
    }

    const interval = setInterval(createDataStream, 200)
    createDataStream() // Start immediately

    return () => clearInterval(interval)
  }, [direction])

  return (
    <div
      ref={streamRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        transform: `translateY(${transform.y}px)`,
        willChange: 'transform'
      }}
    />
  )
}