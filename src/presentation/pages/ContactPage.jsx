import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../../shared/constants/contact.js'

const initialForm = { name: '', email: '', service: '', message: '' }

function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [preparedMessage, setPreparedMessage] = useState('')

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setPreparedMessage('')
  }

  function prepareWhatsAppMessage(event) {
    event.preventDefault()
    const message = [
      `Hola, soy ${form.name}.`,
      `Mi correo es ${form.email}.`,
      form.service ? `Me interesa: ${form.service}.` : '',
      `Mi consulta: ${form.message}`,
    ].filter(Boolean).join('\n')
    setPreparedMessage(getWhatsAppUrl(message))
  }

  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Cuéntanos qué tienes en mente</p>
        <h1>Hagamos algo bonito.</h1>
        <p className="page-description">Escríbenos para cotizar una idea, resolver una duda o conversar sobre tu próximo proyecto.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-form-panel">
          <h2>Envíanos tu consulta</h2>
          <form className="contact-form" onSubmit={prepareWhatsAppMessage}>
            <label>Tu nombre<input name="name" value={form.name} onChange={updateField} autoComplete="name" required /></label>
            <label>Correo electrónico<input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required /></label>
            <label>¿Qué servicio te interesa?
              <select name="service" value={form.service} onChange={updateField}>
                <option value="">Selecciona una opción</option>
                <option>Serigrafía textil</option>
                <option>Bordado</option>
                <option>Uniformes y seguridad laboral</option>
                <option>Diseño</option>
                <option>Otro proyecto</option>
              </select>
            </label>
            <label>Cuéntanos un poco más<textarea name="message" rows="4" value={form.message} onChange={updateField} required /></label>
            <button className="button" type="submit">Preparar mensaje <span aria-hidden="true">↗</span></button>
          </form>
          {preparedMessage && (
            <div className="form-success" role="status">
              <p>Tu mensaje está listo para enviar por WhatsApp.</p>
              <a className="button button-light" href={preparedMessage} target="_blank" rel="noreferrer">Abrir WhatsApp</a>
            </div>
          )}
          <p className="form-note">El formulario prepara un mensaje y lo abre en WhatsApp; no guarda ni envía tus datos a un servidor.</p>
        </div>
        <aside className="contact-info-panel">
          <p className="eyebrow">Pasa a saludarnos</p>
          <h2>El taller te espera.</h2>
          <div className="contact-info-block"><span>Horario</span><strong>Lunes a viernes<br />9:00 a.m. – 6:00 p.m.</strong></div>
          <div className="contact-info-block"><span>Contacto</span><a href={getWhatsAppUrl('Hola, quisiera información sobre sus servicios.')} target="_blank" rel="noreferrer">Escríbenos por WhatsApp ↗</a></div>
          <div className="contact-info-block"><span>Ubicación</span><strong>Encuéntranos en el mapa</strong></div>
          <div className="map-frame">
            <iframe
              title="Ubicación de Sr&Sra Tinta en Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.551425855364!2d-84.14026797928418!3d9.916819091653572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fcf528183619%3A0xb1b1ed4f863ce374!2sEbarjim!5e0!3m2!1ses!2scr!4v1792514282006!5m2!1ses!2scr"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <Link className="text-link" to="/qr">Abrir menú rápido y QR ↗</Link>
        </aside>
      </div>
    </section>
  )
}

export default ContactPage
