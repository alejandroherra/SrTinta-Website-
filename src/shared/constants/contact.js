export const WHATSAPP_PHONE = ''
export const CONTACT_EMAIL = ''

export function getWhatsAppUrl(message = 'Hola, quiero conocer más sobre los servicios de Sr&Sra Tinta.') {
  const phone = WHATSAPP_PHONE.replace(/\D/g, '')
  const recipient = phone ? `/${phone}` : '/'

  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`
}
