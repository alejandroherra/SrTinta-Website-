import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { getProducts } from '../../app/services/productCatalog.js'
import { services } from '../../domain/entities/services.js'
import LazyImage from '../components/LazyImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { fadeUp, staggerChildren } from '../../shared/utils/motionVariants.js'

const featuredProducts = getProducts().slice(0, 3)
const featuredServices = services.filter((service) => !service.pending).slice(0, 4)
const MotionLink = m.create(Link)
const galleryImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=700&q=80',
]

function HomePage() {
  return (
    <>
      <m.section className="home-hero" variants={staggerChildren} initial="hidden" animate="visible">
        <div className="page-container hero-grid">
          <m.div variants={staggerChildren}>
            <m.p className="eyebrow" variants={fadeUp}>Estampado, bordado y mucha creatividad</m.p>
            <m.h1 variants={fadeUp}>Ideas que se <span>visten.</span></m.h1>
            <m.p className="hero-copy" variants={fadeUp}>
              Damos vida a tus ideas con personalización textil hecha con detalle,
              experiencia y cariño de taller familiar.
            </m.p>
            <m.div className="hero-buttons" variants={fadeUp}>
              <Link className="button" to="/servicios">Conoce nuestros servicios <span aria-hidden="true">↗</span></Link>
              <Link className="button button-light" to="/tienda">Explorar tienda</Link>
            </m.div>
            <m.div className="hero-proof" variants={fadeUp}><span className="proof-stars">✳ ✳ ✳</span><span>Un proyecto familiar desde 2019</span></m.div>
          </m.div>

          <m.div className="hero-art" aria-label="Ilustración de una pieza creativa estampada" variants={fadeUp}>
            <m.div className="hero-circle" variants={fadeUp} />
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
            <m.div className="art-sticker" variants={fadeUp}>Diseño<br />con intención</m.div>
          </m.div>
        </div>
      </m.section>

      <section className="intro-strip">
        <div className="page-container intro-inner">
          <p><strong>Un taller familiar, una pasión por crear.</strong> Técnicas artesanales y diseño digital para hacer piezas que cuentan tu historia.</p>
          <Link className="button button-light" to="/nosotros">Conoce nuestra historia <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <Reveal as="section" className="page-container home-section">
        <div className="section-heading">
          <div><p className="eyebrow">Lo que hacemos</p><h2>Hecho para tus ideas.</h2></div>
          <Link className="text-link" to="/servicios">Todos los servicios ↗</Link>
        </div>
        <Reveal className="home-services" stagger>
          {featuredServices.map((service, index) => (
              <MotionLink className="home-service" to={`/servicios/${service.slug}`} key={service.slug} variants={fadeUp}>
                <span className="home-service-index">0{index + 1}</span>
                <span className="home-service-icon" aria-hidden="true">{service.icon}</span>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </MotionLink>
          ))}
        </Reveal>
      </Reveal>

      <Reveal as="section" className="embroidery-highlight home-embroidery">
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
      </Reveal>

      <Reveal as="section" className="page-container home-section">
        <div className="section-heading">
          <div><p className="eyebrow">Desde el taller</p><h2>Pequeñas piezas, grandes ideas.</h2></div>
          <Link className="text-link" to="/tienda">Ver tienda completa ↗</Link>
        </div>
        <Reveal className="product-grid home-product-grid" stagger>
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </Reveal>
      </Reveal>

      <Reveal as="section" className="home-gallery-section">
        <div className="page-container">
          <div className="section-heading">
            <div><p className="eyebrow">Manos a la obra</p><h2>Un vistazo a lo que hacemos.</h2></div>
            <Link className="text-link" to="/galeria">Ver galería ↗</Link>
          </div>
          <Reveal className="home-gallery-grid" stagger>
            {galleryImages.map((image, index) => <MotionLink className="home-gallery-item" variants={fadeUp} to="/galeria" key={image} aria-label={`Ver trabajo ${index + 1} en la galería`}><LazyImage src={image} alt="" sizes="(max-width: 680px) 30vw, 34vw" /></MotionLink>)}
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" className="home-cta">
        <div className="page-container home-cta-inner">
          <div><p className="eyebrow">Tu idea empieza aquí</p><h2>¿Qué hacemos<br />para ti?</h2></div>
          <div className="home-cta-actions"><p>Cuéntanos sobre tu equipo, tu marca o esa idea que tienes rondando. Nos encantará ayudarte.</p><Link className="button" to="/contacto">Hablemos de tu proyecto <span aria-hidden="true">↗</span></Link></div>
        </div>
      </Reveal>
    </>
  )
}

export default HomePage
