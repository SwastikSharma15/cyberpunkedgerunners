import React from 'react'
import { useRevealAnimation } from '../../shared/hooks/useGSAPAnimations'

interface RevealCardProps {
  title: string
  description: string
  icon: string
  delay?: number
  className?: string
}

export const RevealCard: React.FC<RevealCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
  className = ''
}) => {
  const cardRef = useRevealAnimation('card', 'fadeInUp', {
    delay,
    scrollTrigger: true
  })

  const getIconSvg = (iconType: string) => {
    switch (iconType) {
      case 'vision':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )
      case 'aesthetic':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      case 'experience':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  return (
    <div
      ref={cardRef}
      className={`
        group relative p-6 rounded-lg glass border border-white/10
        hover-glow hover-lift transition-all duration-500 cursor-pointer
        ${className}
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-pink/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full glass-dark border border-neon-pink/30 text-electric-cyan group-hover:text-neon-pink transition-colors duration-300">
          {getIconSvg(icon)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-semibold text-electric-cyan mb-3 group-hover:text-neon-pink transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/80 leading-relaxed">
          {description}
        </p>

        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-electric-cyan/20 group-hover:border-electric-cyan/40 transition-colors duration-300" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-neon-pink/20 group-hover:border-neon-pink/40 transition-colors duration-300" />
      </div>

      {/* Data visualization effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}