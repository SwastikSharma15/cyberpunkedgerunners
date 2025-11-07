import React, { ReactNode } from 'react'
import { useScrollProgress } from '../hooks/useScrollEffects'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const { progress } = useScrollProgress()

  return (
    <div className={`min-h-screen bg-near-black text-white ${className}`}>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon-pink to-electric-cyan z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Background Effects Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-purple/20 via-transparent to-cyber-blue/20" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full filter blur-3xl animate-pulse-slow" />
        </div>
      </div>
    </div>
  )
}