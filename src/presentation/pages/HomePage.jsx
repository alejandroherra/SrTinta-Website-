import { Link } from 'react-router-dom'
import { getProducts } from '../../app/services/productCatalog.js'
import { services } from '../../domain/entities/services.js'
import ProductCard from '../components/ProductCard.jsx'

const featuredProducts = getProducts().slice(0, 3)
const featuredServices = services.filter((service) => !service.pending).slice(0, 4)
const galleryImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=700&q=80',
]

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="page-container hero-grid">
          <div>
            <p className="eyebrow">Estampado, bordado y mucha creatividad</p>
            <h1>Ideas que se <span>visten.</span></h1>
            <p className="hero-copy">
              Damos vida a tus ideas con personalización textil hecha con detalle,
              experiencia y cariño de taller familiar.
            </p>
            <div className="hero-buttons">
              <Link className="button" to="/servicios">Conoce nuestros servicios <span aria-hidden="true">↗</span></Link>
              <Link className="button button-light" to="/tienda">Explorar tienda</Link>
            </div>
            <div className="hero-proof"><span className="proof-stars">✳ ✳ ✳</span><span>Un proyecto familiar desde 2019</span></div>
          </div>

          <div className="hero-art" aria-label="Ilustración de una pieza creativa estampada">
            <div className="hero-circle" />
            <div className="art-card">
              <div className="art-card-top"><span>Sr&Sra Tinta</span><span>01 / 25</span></div>
              <div className="art-card-graphic" aria-hidden="true">
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M29 6v46M6 29h46M13 13l32 32M45 13 13 45" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="29" cy="29" r="9" fill="#faf9f6" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
              <div className="art-card-caption">Hecho para destacar.</div>
            </div>
            <div className="art-sticker">Diseño<br />con intención</div>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <div className="page-container intro-inner">
          <p><strong>Un taller familiar, una pasión por crear.</strong> Técnicas artesanales y diseño digital para hacer piezas que cuentan tu historia.</p>
          <Link className="button button-light" to="/nosotros">Conoce nuestra historia <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="page-container home-section">
        <div className="section-heading">
          <div><p className="eyebrow">Lo que hacemos</p><h2>Hecho para tus ideas.</h2></div>
          <Link className="text-link" to="/servicios">Todos los servicios ↗</Link>
        </div>
        <div className="home-services">
          {featuredServices.map((service, index) => (
            <Link className="home-service" to={`/servicios/${service.slug}`} key={service.slug}>
              <span className="home-service-index">0{index + 1}</span>
              <span className="home-service-icon" aria-hidden="true">{service.icon}</span>
              <h3>{service.shortTitle}</h3>
              <p>{service.description}</p>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="embroidery-highlight home-embroidery">
        <div className="page-container embroidery-grid">
          <div className="embroidery-art" aria-hidden="true">
            <div className="embroidered-circle"><span>SR<br />&amp; SRA<br />TINTA</span></div>
            <span className="embroidery-stamp">Puntada<br />a puntada</span>
          </div>
          <div className="embroidery-copy">
            <p className="eyebrow">Detalle que se nota</p>
            <h2>Eleva tu marca<br />con bordado.</h2>
            <p>Bordados personalizados de alta definición para camisetas de algodón, polos, gorras, mallas y más.</p>
            <Link className="button" to="/servicios/bordado">Descubrir bordado <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="page-container home-section">
        <div className="section-heading">
          <div><p className="eyebrow">Desde el taller</p><h2>Pequeñas piezas, grandes ideas.</h2></div>
          <Link className="text-link" to="/tienda">Ver tienda completa ↗</Link>
        </div>
        <div className="product-grid home-product-grid">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="home-gallery-section">
        <div className="page-container">
          <div className="section-heading">
            <div><p className="eyebrow">Manos a la obra</p><h2>Un vistazo a lo que hacemos.</h2></div>
            <Link className="text-link" to="/galeria">Ver galería ↗</Link>
          </div>
          <div className="home-gallery-grid">
            {galleryImages.map((image, index) => <Link to="/galeria" key={image} aria-label={`Ver trabajo ${index + 1} en la galería`}><img src={image} alt="" loading="lazy" /></Link>)}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="page-container home-cta-inner">
          <div><p className="eyebrow">Tu idea empieza aquí</p><h2>¿Qué hacemos<br />para ti?</h2></div>
          <div className="home-cta-actions"><p>Cuéntanos sobre tu equipo, tu marca o esa idea que tienes rondando. Nos encantará ayudarte.</p><Link className="button" to="/contacto">Hablemos de tu proyecto <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </>
  )
}

export default HomePage
