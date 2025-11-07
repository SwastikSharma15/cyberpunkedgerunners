import React, { useEffect, useRef } from 'react'
import { useHeroAnimation } from '../../shared/hooks/useGSAPAnimations'
import { CONTENT } from '../../shared/utils/constants'
import { BackgroundVideo } from './BackgroundVideo'
import { AnimatedText } from './AnimatedText'

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  const elements = {
    background: backgroundRef.current!,
    headline: headlineRef.current!,
    subtitle: subtitleRef.current!,
    cta: ctaRef.current!
  }

  useHeroAnimation(elements)

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <BackgroundVideo />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Headline */}
        <div className="mb-6">
          <h1
            ref={headlineRef}
            className="text-responsive-5xl font-display font-bold text-electric-cyan neon-glow-cyan mb-4"
          >
            <AnimatedText
              text={CONTENT.HERO.HEADLINE}
              typewriter={true}
              glitch={true}
              delay={500}
            />
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <p
            ref={subtitleRef}
            className="text-responsive-lg font-light text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            {CONTENT.HERO.SUBTITLE}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <button
            ref={ctaRef}
            onClick={scrollToAbout}
            className="
              group relative px-8 py-4 bg-transparent border-2 border-neon-pink
              text-neon-pink font-display font-semibold text-lg rounded-md
              hover-glow hover-lift transition-all duration-300
              before:absolute before:inset-0 before:bg-neon-pink before:rounded-md
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-20 before:z-[-1]
            "
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>{CONTENT.HERO.CTA}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-electric-cyan/60 text-sm font-mono">SCROLL</span>
          <div className="w-6 h-10 border-2 border-electric-cyan/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-electric-cyan rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-1/4 right-10 z-10 hidden lg:block">
        <div className="w-20 h-20 border border-electric-cyan/30 rounded-full flex items-center justify-center animate-pulse-slow">
          <div className="w-10 h-10 bg-electric-cyan/20 rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-1/4 left-10 z-10 hidden lg:block">
        <div className="w-16 h-16 border border-neon-pink/30 rounded-lg transform rotate-45 animate-float" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 z-10">
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-electric-cyan/50" />
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-neon-pink/30" />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 z-10">
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-electric-cyan/50" />
        <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-neon-pink/30" />
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 z-10">
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-electric-cyan/50" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-neon-pink/30" />
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 z-10">
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-electric-cyan/50" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-neon-pink/30" />
      </div>
    </section>
  )
}