import React from 'react'

interface ScrollSectionProps {
  title: string
  subtitle: string
  content: string
  type: 'intro' | 'showcase' | 'technical' | 'conclusion'
  visual: 'cityscape' | 'circuit' | 'glitch' | 'horizon'
  isActive: boolean
  index: number
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  title,
  subtitle,
  content,
  type,
  visual,
  isActive,
  index
}) => {
  const getVisualElement = () => {
    switch (visual) {
      case 'cityscape':
        return (
          <div className="relative h-48 bg-gradient-to-b from-cyber-blue to-deep-purple rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* City silhouette */}
              <div className="flex space-x-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-near-black w-8 rounded-t"
                    style={{ height: `${60 + Math.random() * 80}px` }}
                  />
                ))}
              </div>
            </div>
            {/* Neon lights */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-pink rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        )

      case 'circuit':
        return (
          <div className="relative h-48 bg-gradient-to-br from-dark-purple to-cyber-blue rounded-lg overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
              {/* Circuit paths */}
              <path
                d="M20,50 L60,50 L60,20 L100,20 L100,50 L180,50"
                stroke="#00ffff"
                strokeWidth="2"
                fill="none"
                className="animate-pulse-slow"
              />
              <path
                d="M20,80 L80,80 L80,30 L120,30 L120,80 L180,80"
                stroke="#ff006e"
                strokeWidth="2"
                fill="none"
                className="animate-pulse-slow"
                style={{ animationDelay: '1s' }}
              />
              {/* Connection points */}
              {[20, 60, 100, 180].map(x => (
                <circle key={x} cx={x} cy="50" r="3" fill="#00ffff" className="animate-pulse" />
              ))}
              {[20, 80, 120, 180].map(x => (
                <circle key={`b-${x}`} cx={x} cy="80" r="3" fill="#ff006e" className="animate-pulse" />
              ))}
            </svg>
          </div>
        )

      case 'glitch':
        return (
          <div className="relative h-48 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-display font-bold text-white/20 glitch-text" data-text="ERROR">
                ERROR
              </div>
            </div>
            {/* Glitch lines */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${50 + Math.random() * 100}px`,
                    animation: `glitch-line ${0.5 + Math.random() * 1}s linear infinite`
                  }}
                />
              ))}
            </div>
          </div>
        )

      case 'horizon':
        return (
          <div className="relative h-48 bg-gradient-to-b from-electric-cyan via-deep-purple to-near-black rounded-lg overflow-hidden">
            {/* Stars */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 70}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
            {/* Horizon line */}
            <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-cyan to-transparent opacity-50" />
            {/* Future glow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-electric-cyan/20 rounded-full filter blur-2xl animate-pulse-slow" />
          </div>
        )

      default:
        return null
    }
  }

  const getTypeClass = () => {
    switch (type) {
      case 'intro':
        return 'border-l-4 border-electric-cyan'
      case 'showcase':
        return 'border-l-4 border-neon-pink'
      case 'technical':
        return 'border-l-4 border-digital-blue'
      case 'conclusion':
        return 'border-l-4 border-hot-magenta'
      default:
        return ''
    }
  }

  return (
    <div
      className={`
        transition-all duration-1000 transform
        ${isActive
          ? 'opacity-100 translate-x-0 scale-100'
          : 'opacity-0 translate-x-full scale-95'
        }
        ${index % 2 === 0 ? 'origin-left' : 'origin-right'}
      `}
    >
      <div className={`
        glass p-8 rounded-lg ${getTypeClass()}
        ${isActive ? 'hover-glow' : ''}
      `}>
        {/* Visual Element */}
        <div className="mb-6">
          {getVisualElement()}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-display font-bold text-electric-cyan neon-glow-cyan mb-2">
              {title}
            </h3>
            <h4 className="text-lg font-semibold text-neon-pink/80">
              {subtitle}
            </h4>
          </div>

          <p className="text-white/90 leading-relaxed">
            {content}
          </p>

          {/* Interactive element for active section */}
          {isActive && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2 text-sm text-electric-cyan/60 font-mono">
                <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse" />
                <span>ACTIVE CHAPTER</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Add glitch line animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes glitch-line {
      0% { transform: translateY(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(100px); opacity: 0; }
    }
  `
  document.head.appendChild(style)
}