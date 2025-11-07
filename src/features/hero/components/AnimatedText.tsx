import React, { useEffect, useRef, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  typewriter?: boolean
  glitch?: boolean
  delay?: number
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  typewriter = false,
  glitch = false,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typewriter) {
        let currentIndex = 0
        setDisplayText('')

        const typeInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex))
            currentIndex++
          } else {
            clearInterval(typeInterval)
            setIsComplete(true)
          }
        }, 100) // Adjust typing speed here

        return () => clearInterval(typeInterval)
      } else {
        setDisplayText(text)
        setIsComplete(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, typewriter, delay])

  // Glitch effect
  useEffect(() => {
    if (glitch && isComplete && containerRef.current) {
      const container = containerRef.current

      const createGlitch = () => {
        const glitchDuration = 200 + Math.random() * 300
        const glitchOffset = (Math.random() - 0.5) * 4

        container.style.transform = `translateX(${glitchOffset}px)`
        container.style.color = `hsl(${Math.random() * 60 + 300}, 100%, 70%)` // Random neon colors

        setTimeout(() => {
          container.style.transform = 'translateX(0)'
          container.style.color = ''
        }, glitchDuration)
      }

      // Random glitches
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
          createGlitch()
        }
      }, 3000)

      return () => clearInterval(glitchInterval)
    }
  }, [glitch, isComplete])

  const classes = `
    ${className}
    ${glitch ? 'glitch' : ''}
    ${typewriter && !isComplete ? 'border-r-2 border-electric-cyan animate-pulse' : ''}
  `

  return (
    <div ref={containerRef} className={classes} data-text={displayText}>
      {displayText}
    </div>
  )
}

// Split text for animation
export const SplitAnimatedText: React.FC<{
  text: string
  className?: string
  staggerDelay?: number
}> = ({ text, className = '', staggerDelay = 0.1 }) => {
  const words = text.split(' ')

  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${(wordIndex * words.length * staggerDelay) + (charIndex * staggerDelay)}s`
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}