import { useEffect, useState } from 'react'

// Permite que un componente sepa en qué lado de un breakpoint CSS está,
// para decidir cosas en JS (como qué animación de framer-motion aplicar)
// sin duplicar los breakpoints: el valor de `query` debe coincidir con el
// `@media` real usado en App.css.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false
  ))

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQueryList = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)

    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', handleChange)

    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

export default useMediaQuery
