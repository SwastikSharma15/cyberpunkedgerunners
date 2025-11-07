// Color Constants
export const COLORS = {
  NEON_PINK: '#ff006e',
  ELECTRIC_CYAN: '#00ffff',
  DEEP_PURPLE: '#7209b7',
  CYBER_BLUE: '#3a0ca3',
  HOT_MAGENTA: '#c77dff',
  DIGITAL_BLUE: '#4361ee',
  DARK_PURPLE: '#240046',
  NEAR_BLACK: '#0a0a0a',
  PURE_WHITE: '#ffffff',
  GLASS_WHITE: 'rgba(255, 255, 255, 0.1)',
  NEON_GLOW: 'rgba(255, 0, 110, 0.3)'
}

// Breakpoint Constants
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280
}

// Animation Duration Constants
export const DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
  VERY_SLOW: 2.0
}

// Z-index Layer Constants
export const Z_INDEX = {
  BACKGROUND: -1,
  BASE: 1,
  NAVBAR: 10,
  CONTENT: 5,
  OVERLAY: 20,
  MODAL: 30,
  TOOLTIP: 40
}

// Section Constants
export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  STORY: 'story',
  FOOTER: 'footer'
}

// Animation Delay Constants
export const DELAYS = {
  NONE: 0,
  SHORT: 0.1,
  NORMAL: 0.2,
  LONG: 0.5,
  VERY_LONG: 1.0
}

// Easing Constants
export const EASING = {
  SMOOTH: 'power2.inOut',
  SHARP: 'power4.inOut',
  BOUNCY: 'back.out(1.7)',
  ELASTIC: 'elastic.out(1, 0.5)'
}

// Media Query Constants
export const MEDIA_QUERIES = {
  IS_MOBILE: `(max-width: ${BREAKPOINTS.MD - 1}px)`,
  IS_TABLET: `(min-width: ${BREAKPOINTS.MD}px) and (max-width: ${BREAKPOINTS.LG - 1}px)`,
  IS_DESKTOP: `(min-width: ${BREAKPOINTS.LG}px)`,
  PREFER_REDUCED_MOTION: '(prefers-reduced-motion: reduce)'
}

// Scroll Constants
export const SCROLL = {
  BEHAVIOR: 'smooth' as ScrollBehavior,
  OFFSET: 80, // Account for navbar height
  DURATION: 800
}

// Text Content Constants
export const CONTENT = {
  HERO: {
    HEADLINE: 'WELCOME TO NIGHT CITY',
    SUBTITLE: 'Where technology meets humanity in the neon-drenched streets of the future',
    CTA: 'ENTER THE EDGE'
  },
  NAVIGATION: {
    HOME: 'Home',
    ABOUT: 'About',
    STORY: 'Story',
    CONTACT: 'Contact'
  },
  ABOUT: {
    HEADLINE: 'DISCOVER THE EDGE',
    SUBTITLE: 'An immersive journey into the cyberpunk universe where every pixel tells a story',
    CARDS: [
      {
        title: 'THE VISION',
        description: 'A groundbreaking fusion of anime aesthetics and interactive web technology, creating an experience that blurs the line between art and functionality.',
        icon: 'vision'
      },
      {
        title: 'THE AESTHETIC',
        description: 'Drawing inspiration from Cyberpunk: Edgerunners, we combine neon-soaked visuals with smooth animations to create a truly immersive digital experience.',
        icon: 'aesthetic'
      },
      {
        title: 'THE EXPERIENCE',
        description: 'Built with cutting-edge web technologies, every interaction is crafted to deliver performance and visual impact in perfect harmony.',
        icon: 'experience'
      }
    ]
  },
  STORY: {
    HEADLINE: 'THE CHRONICLES',
    SUBTITLE: 'Navigate through a narrative shaped by technology, rebellion, and the human spirit',
    PANELS: [
      {
        title: 'ORIGINS',
        subtitle: 'The Beginning of the Edge',
        content: 'In the neon-drenched streets of Night City, where technology and humanity collide, a new form of digital storytelling emerges. This is where the journey begins.',
        type: 'intro',
        visual: 'cityscape'
      },
      {
        title: 'TECHNOLOGY',
        subtitle: 'Code Meets Consciousness',
        content: 'Advanced algorithms and creative vision merge to create experiences that transcend traditional web design. Every line of code tells a story.',
        type: 'showcase',
        visual: 'circuit'
      },
      {
        title: 'REBELLION',
        subtitle: 'Breaking Digital Boundaries',
        content: 'We challenge conventions and push the limits of what\'s possible on the web. Innovation happens when we dare to be different.',
        type: 'technical',
        visual: 'glitch'
      },
      {
        title: 'EVOLUTION',
        subtitle: 'The Next Frontier',
        content: 'The journey continues as we explore new horizons in digital experiences. Join us as we shape the future of web interaction.',
        type: 'conclusion',
        visual: 'horizon'
      }
    ]
  },
  FOOTER: {
    COPYRIGHT: `© ${new Date().getFullYear()} Cyberpunk Edgerunners. All rights reserved.`,
    BACK_TO_TOP: 'Back to Top'
  }
}

// Performance Constants
export const PERFORMANCE = {
  THROTTLE_DELAY: 16, // 60fps
  DEBOUNCE_DELAY: 150,
  LAZY_LOAD_THRESHOLD: 200
}