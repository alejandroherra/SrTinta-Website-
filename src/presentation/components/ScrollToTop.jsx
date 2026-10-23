import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router no restaura el scroll entre rutas (a diferencia de una
// navegación de documento completo). Sin esto, si el usuario deja el
// carrito con scroll hasta el final y navega a Inicio, la nueva página
// aparece scrolleada hasta esa misma posición en vez de empezar arriba.
// `behavior: 'auto'` evita que lo anime (anula el scroll-behavior: smooth
// de index.css, que solo debe aplicar a saltos dentro de la misma página).
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default ScrollToTop
