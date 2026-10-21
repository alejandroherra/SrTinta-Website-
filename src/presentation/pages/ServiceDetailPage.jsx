import { Link, useParams } from 'react-router-dom'
import { getServiceBySlug } from '../../domain/entities/services.js'
import Reveal from '../components/Reveal.jsx'

function ServiceDetailPage() {
  const { serviceSlug } = useParams()
  const service = getServiceBySlug(serviceSlug)

  if (!service) {
    return (
      <section className="page-container page-content">
        <div className="page-heading"><p className="eyebrow">Nuestros servicios</p><h1>Servicio no encontrado.</h1></div>
        <Link className="button" to="/servicios">Ver servicios</Link>
      </section>
    )
  }

  return (
    <section className="service-detail-hero">
      <Reveal className="page-container service-detail-grid">
        <div className="service-detail-symbol" aria-hidden="true">{service.icon}</div>
        <div>
          <p className="eyebrow">{service.pending ? 'En preparación' : 'Servicios del taller'}</p>
          <h1>{service.title}</h1>
          <p className="page-description">{service.detail}</p>
          <div className="hero-buttons">
            <Link className="button" to="/contacto">Cotizar este servicio <span aria-hidden="true">↗</span></Link>
            <Link className="button button-light" to="/servicios">Ver todos los servicios</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default ServiceDetailPage
