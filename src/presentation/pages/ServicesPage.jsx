import { Link } from 'react-router-dom'
import { services } from '../../domain/entities/services.js'

function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="page-container">
          <p className="eyebrow">Lo pensamos, lo hacemos, lo llevas</p>
          <h1>Tu idea merece<br /><span>un buen acabado.</span></h1>
          <p>Personalización textil y soluciones creativas para personas, equipos y marcas.</p>
          <Link className="button" to="/contacto">Hablemos de tu proyecto <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section className="page-container service-list-section">
        <div className="section-heading">
          <div><p className="eyebrow">Hecho en el taller</p><h2>Servicios para crear a tu manera.</h2></div>
          <p>Cuéntanos qué quieres producir y te ayudamos a encontrar la técnica y el acabado ideal.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <Link className={`service-card${service.pending ? ' service-card-pending' : ''}`} key={service.slug} to={`/servicios/${service.slug}`}>
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              {service.pending && <span className="pending-label">Próximamente</span>}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <EmbroideryHighlight />
    </>
  )
}

function EmbroideryHighlight() {
  return (
    <section className="embroidery-highlight">
      <div className="page-container embroidery-grid">
        <div className="embroidery-art" aria-hidden="true">
          <div className="embroidered-circle"><span>SR<br />&amp; SRA<br />TINTA</span></div>
          <span className="embroidery-stamp">Puntada<br />a puntada</span>
        </div>
        <div className="embroidery-copy">
          <p className="eyebrow">Detalle que se nota</p>
          <h2>Eleva tu marca<br />con bordado.</h2>
          <p>Bordados personalizados de alta definición para dar una imagen elegante, profesional y duradera a tus prendas.</p>
          <ul>
            <li>Camisetas de algodón y polos</li>
            <li>Gorras, mallas y mucho más</li>
            <li>Logos y diseños personalizados</li>
          </ul>
          <Link className="button" to="/servicios/bordado">Descubrir bordado <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
