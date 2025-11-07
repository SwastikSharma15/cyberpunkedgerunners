import React from 'react'

interface NavItemProps {
  name: string
  href: string
  isActive: boolean
  onClick: () => void
  isMobile?: boolean
}

export const NavItem: React.FC<NavItemProps> = ({
  name,
  href,
  isActive,
  onClick,
  isMobile = false
}) => {
  const baseClasses = `
    relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md
    hover-glow cursor-pointer
  `

  const activeClasses = `
    text-neon-pink neon-glow-pink bg-white/5
    ${!isMobile ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neon-pink after:shadow-neon-pink' : ''}
  `

  const inactiveClasses = `
    text-electric-cyan hover:text-neon-pink hover:bg-white/5
  `

  const classes = `
    ${baseClasses}
    ${isActive ? activeClasses : inactiveClasses}
    ${isMobile ? 'block w-full text-left' : 'inline-block'}
  `

  return (
    <button
      onClick={onClick}
      className={classes}
      role="menuitem"
      aria-label={`Navigate to ${href}`}
    >
      {name}
    </button>
  )
}