export const CONFIG = {
  // Feature toggles
  features: {
    showOracle: true,
    showGallery: true,
    showTimeline: true,
    showPatchRequest: true,
  },
  
  // Animation preferences
  animations: {
    enabled: true,
    reduceMotion: false,
    scrollReveal: true,
  },
  
  // Performance
  performance: {
    lazyLoadImages: true,
    preloadHeroImage: true,
    debounceMs: 100,
  },
  
  // Oracle settings
  oracle: {
    maxHistoryLength: 20,
    typingSpeedMs: 30,
  },
  
  // Gallery settings
  gallery: {
    itemsPerPage: 12,
    enableLightbox: true,
  },
}

export function getReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}