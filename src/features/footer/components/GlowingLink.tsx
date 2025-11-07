import React from 'react'

interface GlowingLinkProps {
  href: string
  children: React.ReactNode
  color?: 'cyan' | 'pink' | 'blue' | 'magenta'
  external?: boolean
  className?: string
}

export const GlowingLink: React.FC<GlowingLinkProps> = ({
  href,
  children,
  color = 'cyan',
  external = false,
  className = ''
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'cyan':
        return 'text-electric-cyan hover:text-electric-cyan neon-glow-cyan'
      case 'pink':
        return 'text-neon-pink hover:text-neon-pink neon-glow-pink'
      case 'blue':
        return 'text-digital-blue hover:text-digital-blue'
      case 'magenta':
        return 'text-hot-magenta hover:text-hot-magenta'
      default:
        return 'text-electric-cyan hover:text-electric-cyan neon-glow-cyan'
    }
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    if (external) {
      e.preventDefault()
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <a
      href={href}
      onClick={handleLinkClick}
      className={`
        relative inline-flex items-center space-x-2 transition-all duration-300
        ${getColorClasses()}
        hover-glow hover-lift
        ${className}
      `}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span className="relative z-10">{children}</span>

      {/* Animated underline */}
      <span className="absolute bottom-0 left-0 h-px bg-current transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

      {/* Glow effect background */}
      <span className="absolute inset-0 bg-current/10 rounded scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
    </a>
  )
}

// Social media link component
export const SocialLink: React.FC<{
  platform: 'github' | 'twitter' | 'linkedin' | 'instagram'
  href: string
  label: string
  className?: string
}> = ({ platform, href, label, className = '' }) => {
  const getSocialInfo = () => {
    switch (platform) {
      case 'github':
        return {
          color: 'cyan' as const,
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          )
        }
      case 'twitter':
        return {
          color: 'cyan' as const,
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          )
        }
      case 'linkedin':
        return {
          color: 'blue' as const,
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          )
        }
      case 'instagram':
        return {
          color: 'magenta' as const,
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
            </svg>
          )
        }
      default:
        return {
          color: 'cyan' as const,
          icon: null
        }
    }
  }

  const socialInfo = getSocialInfo()

  return (
    <GlowingLink
      href={href}
      color={socialInfo.color}
      external={true}
      className={`
        group flex items-center justify-center w-12 h-12 rounded-full
        glass-dark border border-current/30
        hover:scale-110 hover:border-current/60
        transition-all duration-300
        ${className}
      `}
      aria-label={label}
    >
      <span className="text-current">
        {socialInfo.icon}
      </span>
    </GlowingLink>
  )
}