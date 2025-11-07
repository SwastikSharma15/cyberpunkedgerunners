import React, { useRef, useEffect } from 'react'

interface BackgroundVideoProps {
  className?: string
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Try to autoplay video
    const playVideo = () => {
      video.play().catch(error => {
        console.log('Autoplay prevented:', error)
        // Fallback: show static background
        video.style.display = 'none'
      })
    }

    // Set video properties
    video.muted = true
    video.loop = true
    video.playsInline = true

    // Start playing when component mounts
    playVideo()

    // Handle visibility changes to optimize performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else {
        playVideo()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster="/videos/cyberpunk-background.mp4" // This will need to be created
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/cyberpunk-background.mp4" type="video/mp4" />
        {/* Fallback content */}
        <div className="w-full h-full bg-gradient-to-br from-dark-purple via-cyber-blue to-dark-purple" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-near-black/50 via-near-black/30 to-near-black/70" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 via-transparent to-electric-cyan/20 animate-pulse-slow" />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-cyan rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-near-black/50" />
    </div>
  )
}

// Add gradient utility
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .bg-radial-gradient {
      background: radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(10, 10, 10, 0.5) 100%);
    }
  `
  document.head.appendChild(style)
}