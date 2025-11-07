import React, { useEffect } from 'react'
import { Layout } from './features/components/Layout'
import { BackgroundEffects } from './features/components/BackgroundEffects'
import { CustomCursor } from './features/components/CustomCursor'
import { Navbar } from './features/navbar'
import { Hero } from './features/hero'
import { About } from './features/about'
import { Story } from './features/story'
import { Footer } from './features/footer'

// Import feature-specific styles
import './features/navbar/styles/navbar.css'
import './features/hero/styles/hero.css'
import './features/about/styles/about.css'
import './features/story/styles/story.css'
import './features/footer/styles/footer.css'

// Import animation styles
import './shared/styles/animations.css'

export const App: React.FC = () => {
  useEffect(() => {
    // Set up page title and meta
    document.title = 'Cyberpunk: Edgerunners - Welcome to Night City'

    // Add meta description
    const metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    metaDescription.content = 'A futuristic anime-inspired website featuring Cyberpunk: Edgerunners aesthetics with immersive GSAP animations and responsive design.'
    document.head.appendChild(metaDescription)

    // Add theme-color meta for mobile browsers
    const themeColor = document.createElement('meta')
    themeColor.name = 'theme-color'
    themeColor.content = '#0a0a0a'
    document.head.appendChild(themeColor)

    // Performance optimization: Preload critical resources
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'video'
    preloadLink.href = '/videos/cyberpunk-background.mp4'
    document.head.appendChild(preloadLink)

    // Cleanup function
    return () => {
      // Remove dynamically added meta tags (optional)
    }
  }, [])

  return (
    <Layout>
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Story Section */}
        <Story />

        {/* Footer */}
        <Footer />
      </main>

      {/* Custom Cursor (for desktop) */}
      <CustomCursor />
    </Layout>
  )
}

export default App