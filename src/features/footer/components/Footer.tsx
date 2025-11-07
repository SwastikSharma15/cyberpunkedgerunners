import React, { useState, useEffect } from 'react'
import { useScrollVisibility } from '../../shared/hooks/useScrollEffects'
import { useSmoothScroll } from '../../shared/hooks/useScrollEffects'
import { CONTENT } from '../../shared/utils/constants'
import { GlowingLink, SocialLink } from './GlowingLink'

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollToTop } = useSmoothScroll()
  const { isVisible: isScrollVisible } = useScrollVisibility(0.1)

  useEffect(() => {
    if (isScrollVisible) {
      const timer = setTimeout(() => setIsVisible(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isScrollVisible])

  const socialLinks = [
    {
      platform: 'github' as const,
      href: 'https://github.com',
      label: 'GitHub'
    },
    {
      platform: 'twitter' as const,
      href: 'https://twitter.com',
      label: 'Twitter'
    },
    {
      platform: 'linkedin' as const,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    },
    {
      platform: 'instagram' as const,
      href: 'https://instagram.com',
      label: 'Instagram'
    }
  ]

  return (
    <footer id="footer" className="relative py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/20 to-near-black/50" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-electric-cyan/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer content with fade-in animation */}
        <div
          className={`
            transition-all duration-1000 transform
            ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
            }
          `}
        >
          {/* Three-column layout on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand column */}
            <div className="text-center md:text-left">
              <div className="mb-4">
                <h3 className="text-2xl font-display font-bold text-electric-cyan neon-glow-cyan">
                  EDGE<span className="text-neon-pink ml-1">RUNNERS</span>
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed max-w-sm">
                A cyberpunk journey through the digital frontier, where technology and art collide in stunning visual harmony.
              </p>
            </div>

            {/* Quick links column */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-neon-pink mb-4">QUICK LINKS</h4>
              <nav className="space-y-2">
                <GlowingLink href="#hero" color="cyan">Home</GlowingLink>
                <div className="text-white/50">•</div>
                <GlowingLink href="#about" color="cyan">About</GlowingLink>
                <div className="text-white/50">•</div>
                <GlowingLink href="#story" color="cyan">Story</GlowingLink>
              </nav>
            </div>

            {/* Social links column */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-neon-pink mb-4">CONNECT</h4>
              <div className="flex justify-center md:justify-end space-x-3">
                {socialLinks.map((link) => (
                  <SocialLink
                    key={link.platform}
                    platform={link.platform}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-white/60 text-sm text-center sm:text-left">
              {CONTENT.FOOTER.COPYRIGHT}
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="
                group flex items-center space-x-2 px-4 py-2
                glass-dark border border-neon-pink/30 rounded-full
                text-neon-pink hover-glow hover-lift
                transition-all duration-300
              "
              aria-label="Back to top"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-sm font-medium">{CONTENT.FOOTER.BACK_TO_TOP}</span>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-2 h-20 bg-gradient-to-b from-neon-pink to-transparent opacity-30" />
          <div className="absolute top-0 right-1/4 w-2 h-20 bg-gradient-to-b from-electric-cyan to-transparent opacity-30" />
          <div className="absolute bottom-0 left-1/3 w-32 h-px bg-gradient-to-r from-transparent to-neon-pink/50" />
          <div className="absolute bottom-0 right-1/3 w-32 h-px bg-gradient-to-l from-transparent to-electric-cyan/50" />
        </div>
      </div>

      {/* Ambient background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pulsing orbs */}
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-pink/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-electric-cyan/5 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>
    </footer>
  )
}