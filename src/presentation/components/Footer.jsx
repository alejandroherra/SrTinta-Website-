import { Link } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand" to="/">
          <BrandMark />
          <span className="brand-name">
            <span>Sr&Sra Tinta</span>
            <span>Taller creativo</span>
          </span>
        </Link>
        <p className="footer-copy">Hecho con intención, desde 2019.</p>
        <nav className="footer-links" aria-label="Enlaces del pie de página">
          <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/qr">QR y menú rápido</Link>
          <Link to="/admin">Administración</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
