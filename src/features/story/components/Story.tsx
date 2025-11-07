import React, { useState, useEffect, useRef } from 'react'
import { useScrollTimeline } from '../../shared/hooks/useGSAPAnimations'
import { useScrollProgress } from '../../shared/hooks/useScrollEffects'
import { CONTENT } from '../../shared/utils/constants'
import { ScrollSection } from './ScrollSection'
import { ParallaxElement, FloatingData, RotatingOrb, DataStream } from './ParallaxElement'

export const Story: React.FC = () => {
  const [activePanel, setActivePanel] = useState(0)
  const { progress } = useScrollProgress()
  const storyRef = useRef<HTMLElement>(null)

  // Calculate active panel based on scroll progress
  useEffect(() => {
    const panelIndex = Math.floor(progress * CONTENT.STORY.PANELS.length)
    setActivePanel(Math.min(panelIndex, CONTENT.STORY.PANELS.length - 1))
  }, [progress])

  // Use scroll timeline for panel transitions
  const panelSelectors = CONTENT.STORY.PANELS.map((_, index) => `#story-panel-${index}`)
  useScrollTimeline('#story', panelSelectors, {
    scrub: true,
    pin: true,
    pinSpacing: false
  })

  return (
    <section
      id="story"
      ref={storyRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ minHeight: `${CONTENT.STORY.PANELS.length * 100}vh` }}
    >
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <ParallaxElement speed={0.3}>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-pink/10 rounded-full filter blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-electric-cyan/10 rounded-full filter blur-3xl animate-pulse-slow" />
          </div>
        </ParallaxElement>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingData className="absolute top-20 right-20">
          <RotatingOrb size="lg" color="cyan" />
        </FloatingData>

        <ParallaxElement speed={0.2}>
          <div className="absolute bottom-32 left-16">
            <RotatingOrb size="md" color="pink" />
          </div>
        </ParallaxElement>

        <ParallaxElement speed={0.6}>
          <div className="absolute top-1/2 right-32">
            <RotatingOrb size="sm" color="blue" />
          </div>
        </ParallaxElement>
      </div>

      {/* Data streams */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DataStream direction="up" className="absolute left-1/4 w-1 h-full" />
        <DataStream direction="down" className="absolute right-1/4 w-1 h-full" />
        <DataStream direction="up" className="absolute left-1/2 w-1 h-full" />
      </div>

      {/* Section header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-responsive-4xl font-display font-bold text-electric-cyan neon-glow-cyan mb-4">
          {CONTENT.STORY.HEADLINE}
        </h2>
        <p className="text-responsive-lg text-white/80 max-w-3xl mx-auto">
          {CONTENT.STORY.SUBTITLE}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="fixed top-1/2 right-8 z-30 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {CONTENT.STORY.PANELS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const panel = document.getElementById(`story-panel-${index}`)
                panel?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`
                w-3 h-3 rounded-full border-2 transition-all duration-300
                ${activePanel === index
                  ? 'bg-neon-pink border-neon-pink shadow-neon-pink'
                  : 'bg-transparent border-electric-cyan/50 hover:border-electric-cyan'
                }
              `}
              aria-label={`Go to story panel ${index + 1}`}
            >
              <span className="sr-only">Panel {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Story panels */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="story-container">
          {CONTENT.STORY.PANELS.map((panel, index) => (
            <div
              key={index}
              id={`story-panel-${index}`}
              className="story-panel min-h-screen flex items-center justify-center py-20"
            >
              <ScrollSection
                title={panel.title}
                subtitle={panel.subtitle}
                content={panel.content}
                type={panel.type}
                visual={panel.visual}
                isActive={activePanel === index}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-electric-cyan/30" />
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-neon-pink/20" />
      </div>

      <div className="fixed top-0 right-0 w-32 h-32 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-neon-pink/30" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-electric-cyan/20" />
      </div>

      <div className="fixed bottom-0 left-0 w-32 h-32 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-electric-cyan/30" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-neon-pink/20" />
      </div>

      <div className="fixed bottom-0 right-0 w-32 h-32 z-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-neon-pink/30" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-electric-cyan/20" />
      </div>
    </section>
  )
}