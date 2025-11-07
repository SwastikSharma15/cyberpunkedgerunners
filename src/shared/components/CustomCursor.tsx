import React, { useEffect, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Update dot position immediately
      dot.style.transform = `translate(${clientX}px, ${clientY}px)`

      // Update ring position with slight delay for smooth following
      cursor.style.transform = `translate(${clientX - 15}px, ${clientY - 15}px)`
    }

    const handleMouseEnter = () => {
      cursor.style.scale = '1.5'
      dot.style.scale = '0.5'
    }

    const handleMouseLeave = () => {
      cursor.style.scale = '1'
      dot.style.scale = '1'
    }

    // Only show custom cursor on desktop
    if (window.innerWidth > 1024) {
      document.addEventListener('mousemove', handleMouseMove)

      // Add hover effects to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
      })

      // Hide default cursor
      document.body.style.cursor = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.body.style.cursor = 'auto'

      // Remove event listeners from interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="
          fixed pointer-events-none z-50 hidden lg:block
          w-8 h-8 border-2 border-electric-cyan rounded-full
          transition-transform duration-200 ease-out
          mix-blend-difference
        "
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        ref={dotRef}
        className="
          fixed pointer-events-none z-50 hidden lg:block
          w-2 h-2 bg-neon-pink rounded-full
          transition-transform duration-100 ease-out
        "
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}