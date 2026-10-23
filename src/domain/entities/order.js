// Estados posibles del flujo logístico de una orden.
export const ORDER_STATUS = {
  PROCESSING: 'procesando',
  SHIPPED: 'enviado',
  DELIVERED: 'entregado',
}

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PROCESSING]: 'Procesando',
  [ORDER_STATUS.SHIPPED]: 'Enviado',
  [ORDER_STATUS.DELIVERED]: 'Entregado',
}

// El siguiente estado disponible para avanzar el flujo logístico, en orden.
const STATUS_SEQUENCE = [ORDER_STATUS.PROCESSING, ORDER_STATUS.SHIPPED, ORDER_STATUS.DELIVERED]

export function getNextOrderStatus(currentStatus) {
  const currentIndex = STATUS_SEQUENCE.indexOf(currentStatus)
  return STATUS_SEQUENCE[currentIndex + 1] ?? null
}

// Genera un identificador de orden corto y aleatorio usando la API criptográfica
// del navegador en lugar de Math.random, que no es apta para fines de seguridad.
export function generateOrderId() {
  const randomValues = new Uint32Array(1)
  crypto.getRandomValues(randomValues)
  const fiveDigitNumber = (randomValues[0] % 90000) + 10000

  return `ORD-${fiveDigitNumber}`
}

export function createOrder({ orderId, userId, userEmail, userName, items, subtotal }) {
  return {
    orderId,
    userId,
    userEmail,
    userName,
    items,
    subtotal,
    status: ORDER_STATUS.PROCESSING,
  }
}
