import { Link } from 'react-router-dom'
import { faqs } from '../../domain/entities/faqs.js'

function FaqPage() {
  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Te ayudamos a resolverlo</p>
        <h1>Preguntas frecuentes.</h1>
        <p className="page-description">Si tienes otra consulta, escríbenos y con gusto conversamos sobre tu proyecto.</p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details className="faq-item" key={faq.question} open={index === 0}>
            <summary>{faq.question}<span aria-hidden="true">＋</span></summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
      <div className="faq-contact">
        <p>¿No encontraste tu respuesta?</p>
        <Link className="button button-light" to="/contacto">Habla con el taller <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

export default FaqPage
