import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface BackgroundEffectsProps {
  className?: string
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = `absolute w-1 h-1 bg-electric-cyan rounded-full opacity-60`
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        container.appendChild(particle)
        particlesRef.current.push(particle)

        // Animate particles
        gsap.to(particle, {
          y: -100 - Math.random() * 200,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: Math.random() * 3,
          ease: "none"
        })
      }
    }

    createParticles()

    return () => {
      particlesRef.current.forEach(particle => {
        gsap.killTweensOf(particle)
        particle.remove()
      })
      particlesRef.current = []
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      {/* Animated gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-neon-pink rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-electric-cyan rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-hot-magenta rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-near-black via-transparent to-near-black opacity-50" />
    </div>
  )
}

// Add blob animation to global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `
  document.head.appendChild(style)
}