import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { fadeUp } from '../../shared/utils/motionVariants.js'
import { m } from 'framer-motion'
import { faqs } from '../../domain/entities/faqs.js'

function FaqPage() {
  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Te ayudamos a resolverlo</p>
        <h1>Preguntas frecuentes.</h1>
        <p className="page-description">Si tienes otra consulta, escríbenos y con gusto conversamos sobre tu proyecto.</p>
      </div>
      <Reveal className="faq-list" stagger>
        {faqs.map((faq, index) => (
          <m.details className="faq-item" key={faq.question} open={index === 0} variants={fadeUp}>
            <summary>{faq.question}<span aria-hidden="true">＋</span></summary>
            <p>{faq.answer}</p>
          </m.details>
        ))}
      </Reveal>
      <div className="faq-contact">
        <p>¿No encontraste tu respuesta?</p>
        <Link className="button button-light" to="/contacto">Habla con el taller <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

export default FaqPage
