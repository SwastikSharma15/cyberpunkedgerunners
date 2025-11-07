import React from 'react'
import { useRevealAnimation } from '../../../shared/hooks/useGSAPAnimations'
import { CONTENT } from '../../../shared/utils/constants'
import { RevealCard } from './RevealCard'

export const About: React.FC = () => {
  const headingRef = useRevealAnimation('heading', 'fadeInLeft', {
    delay: 0,
    scrollTrigger: true
  })

  const subtitleRef = useRevealAnimation('subtitle', 'fadeInRight', {
    delay: 0.2,
    scrollTrigger: true
  })

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>

      {/* Section content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-responsive-4xl font-display font-bold text-electric-cyan neon-glow-cyan mb-6"
          >
            {CONTENT.ABOUT.HEADLINE}
          </h2>

          <p
            ref={subtitleRef}
            className="text-responsive-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {CONTENT.ABOUT.SUBTITLE}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTENT.ABOUT.CARDS.map((card: typeof CONTENT.ABOUT.CARDS[0], index: number) => (
            <RevealCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              delay={0.3 + (index * 0.2)} // Staggered delays
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 z-0">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neon-pink/30" />
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-electric-cyan/20" />
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-electric-cyan/30" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-neon-pink/20" />
        </div>
      </div>

      {/* Floating particles for atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-cyan/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Data visualization lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff006e" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q150,50 300,150 T600,100"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse-slow"
          />
          <path
            d="M100,0 Q50,200 200,300 T100,600"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,7"
            className="animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>
    </section>
  )
}