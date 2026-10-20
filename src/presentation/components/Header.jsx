import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useCart from '../hooks/useCart.js'
import BrandMark from './BrandMark.jsx'

const navigation = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Tienda' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/galeria', label: 'Galería' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Sr&Sra Tinta, inicio" onClick={closeMenu}>
          <BrandMark />
          <span className="brand-name">
            <span>Sr&Sra Tinta</span>
            <span>Taller creativo</span>
          </span>
        </Link>

        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
          {navigation.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <NavLink to="/carrito" onClick={closeMenu}>Carrito{itemCount > 0 ? ` (${itemCount})` : ''}</NavLink>
        </nav>

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
    </header>
  )
}

function MenuIcon({ isOpen }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {isOpen ? (
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  )
}

export default Header
