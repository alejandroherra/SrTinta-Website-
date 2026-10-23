import emailjs from '@emailjs/browser'
import formatPrice from '../../shared/utils/formatPrice.js'

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_VERIFICATION_CODE = import.meta.env.VITE_EMAILJS_TEMPLATE_VERIFICATION
const TEMPLATE_PASSWORD_RESET = import.meta.env.VITE_EMAILJS_TEMPLATE_PASSWORD_RESET
const TEMPLATE_ORDER_CONFIRMATION = import.meta.env.VITE_EMAILJS_TEMPLATE_ORDER_CONFIRMATION

emailjs.init({ publicKey: PUBLIC_KEY })

// Envoltorio común: cada función de envío solo construye los parámetros de
// la plantilla, mientras que esta función centraliza el try/catch y la
// respuesta homogénea { success, error } hacia la capa de aplicación.
async function sendTemplate(templateId, templateParams) {
  try {
    await emailjs.send(SERVICE_ID, templateId, templateParams)
    return { success: true, error: null }
  } catch (error) {
    console.error('Falló el envío de correo con EmailJS.', error)
    return { success: false, error: error?.text ?? error.message }
  }
}

export function sendVerificationCode(toEmail, userName, code) {
  return sendTemplate(TEMPLATE_VERIFICATION_CODE, {
    to_email: toEmail,
    to_name: userName,
    verification_code: code,
  })
}

export function sendPasswordResetEmail(toEmail, userName, resetLink) {
  return sendTemplate(TEMPLATE_PASSWORD_RESET, {
    to_email: toEmail,
    to_name: userName,
    reset_link: resetLink,
  })
}

// orderDetails: { orderId, userEmail, userName, items, subtotal, trackingUrl }
export function sendOrderConfirmation(orderDetails) {
  const { orderId, userEmail, userName, items, subtotal, trackingUrl } = orderDetails

  const itemsSummary = items
    .map((item) => `${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
    .join('\n')

  return sendTemplate(TEMPLATE_ORDER_CONFIRMATION, {
    to_email: userEmail,
    to_name: userName,
    order_id: orderId,
    items_summary: itemsSummary,
    order_total: formatPrice(subtotal),
    tracking_link: trackingUrl,
  })
}
