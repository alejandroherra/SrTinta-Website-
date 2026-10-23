import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useCart from '../hooks/useCart.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import AuthControls from './AuthControls.jsx'
import BrandMark from './BrandMark.jsx'

const MOBILE_NAV_QUERY = '(max-width: 900px)'

const navigation = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Tienda' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/galeria', label: 'Galería' },
]

const navVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: { height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 }, when: 'beforeChildren', staggerChildren: 0.05 },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.26, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.16 }, when: 'afterChildren' },
  },
}

const navItemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -8 },
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  const isMobileNav = useMediaQuery(MOBILE_NAV_QUERY)
  const isNavVisible = isMobileNav ? menuOpen : true

  function closeMenu() {
    setMenuOpen(false)
  }

  // Si el usuario navega mientras el menú móvil está abierto (por ejemplo
  // con el botón "atrás" del navegador), nos asegura que no quede abierto
  // sobre la página siguiente.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      className="site-header"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Sr&Sra Tinta, inicio" onClick={closeMenu}>
          <BrandMark />
          <span className="brand-name">
            <span>Sr&Sra Tinta</span>
            <span>Taller creativo</span>
          </span>
        </Link>

        <motion.nav
          className="main-nav"
          aria-label="Navegación principal"
          variants={navVariants}
          animate={isNavVisible ? 'open' : 'closed'}
          initial={false}
        >
          {navigation.map(({ to, label, end }) => (
            <motion.div variants={navItemVariants} key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </motion.div>
          ))}
          <motion.div variants={navItemVariants}>
            <NavLink to="/carrito" onClick={closeMenu}>Carrito{itemCount > 0 ? ` (${itemCount})` : ''}</NavLink>
          </motion.div>
          <motion.div variants={navItemVariants}>
            <AuthControls onNavigate={closeMenu} />
          </motion.div>
        </motion.nav>

        <div className="header-actions">
          <Link className="button" to="/contacto">Cotizar proyecto <span aria-hidden="true">↗</span></Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <MenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

function MenuIcon({ isOpen }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.path
        d="M4 7h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={isOpen ? { d: 'M6 6l12 12', opacity: 1 } : { d: 'M4 7h16', opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      <motion.path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.path
        d="M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={isOpen ? { d: 'M18 6L6 18', opacity: 1 } : { d: 'M4 17h16', opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export default Header
