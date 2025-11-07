import React, { useState, useEffect } from 'react'
import { useScrollDirection, useSmoothScroll } from '../../shared/hooks/useScrollEffects'
import { CONTENT } from '../../shared/utils/constants'
import { NavItem } from './NavItem'

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const scrollDirection = useScrollDirection()
  const { scrollToElement } = useSmoothScroll()

  const navItems = [
    { name: CONTENT.NAVIGATION.HOME, href: 'hero' },
    { name: CONTENT.NAVIGATION.ABOUT, href: 'about' },
    { name: CONTENT.NAVIGATION.STORY, href: 'story' },
    { name: CONTENT.NAVIGATION.CONTACT, href: 'footer' }
  ]

  // Hide/show navbar based on scroll direction
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Hide navbar when scrolling down, show when scrolling up
      if (scrollDirection === 'down' && scrollY > 100) {
        setIsVisible(false)
      } else if (scrollDirection === 'up') {
        setIsVisible(true)
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.href))
      const currentSection = sections.find(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
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
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollDirection, navItems])

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled
            ? 'glass-dark border-b border-neon-pink/30'
            : 'bg-transparent border-b border-white/10'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick('hero')}
                className="text-2xl font-display font-bold text-electric-cyan neon-glow-cyan hover-glow transition-all duration-300"
              >
                EDGE
                <span className="text-neon-pink ml-1">RUNNERS</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    isActive={activeSection === item.href}
                    onClick={() => handleNavClick(item.href)}
                  />
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="
                  inline-flex items-center justify-center p-2 rounded-md text-electric-cyan
                  hover:text-neon-pink hover:bg-white/10 focus:outline-none focus:ring-2
                  focus:ring-inset focus:ring-electric-cyan transition-all duration-300
                "
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <div className="w-6 h-6 relative flex flex-col justify-center">
                  <span
                    className={`
                      block absolute h-0.5 w-6 transform transition-all duration-300
                      ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}
                      ${isMobileMenuOpen ? 'bg-neon-pink' : 'bg-electric-cyan'}
                    `}
                  />
                  <span
                    className={`
                      block h-0.5 w-6 transition-all duration-300
                      ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                      ${isMobileMenuOpen ? 'bg-neon-pink' : 'bg-electric-cyan'}
                    `}
                  />
                  <span
                    className={`
                      block absolute h-0.5 w-6 transform transition-all duration-300
                      ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}
                      ${isMobileMenuOpen ? 'bg-neon-pink' : 'bg-electric-cyan'}
                    `}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`
            md:hidden transition-all duration-300 ease-in-out origin-top
            ${isMobileMenuOpen
              ? 'scale-y-100 opacity-100'
              : 'scale-y-0 opacity-0 h-0'
            }
          `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-dark border-t border-neon-pink/20">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                href={item.href}
                isActive={activeSection === item.href}
                onClick={() => handleNavClick(item.href)}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-near-black/70 backdrop-blur-sm" />
        </div>
      )}
    </>
  )
}