import { getWhatsAppUrl } from '../../shared/constants/contact.js'

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
      <span>Hablemos</span>
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.7 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.9 1.2 1.5 2.1 2 .2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.3.4.5 0 .4-.2 1.1-.7 1.4-.4.4-1 .6-1.6.5-1-.1-2.5-.7-4-2.1-1.2-1.1-2-2.5-2.2-3.5-.2-.8 0-1.5.4-1.9l.4-.4Z" fill="currentColor" />
    </svg>
  )
}

export default WhatsAppButton
