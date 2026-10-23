import { createOrder, generateOrderId } from '../../../domain/entities/order.js'

function createOrderUseCases(orderRepository, emailService) {
  // Orquesta el checkout completo: genera el id, persiste la orden y dispara
  // el correo de confirmación. El correo es una notificación secundaria, así
  // que si falla no se deshace la orden ya guardada; el error se reporta
  // por separado para que la interfaz pueda avisar sin bloquear la compra.
  async function checkoutCart({ user, items, subtotal, trackingBaseUrl }) {
    try {
      const order = createOrder({
        orderId: generateOrderId(),
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName ?? user.email,
        items,
        subtotal,
      })

      await orderRepository.create(order)

      const { success: emailSent, error: emailError } = await emailService.sendOrderConfirmation({
        ...order,
        trackingUrl: `${trackingBaseUrl}?orderId=${order.orderId}`,
      })

      return { success: true, order, emailSent, emailError, error: null }
    } catch (error) {
      console.error('Falló el checkout del carrito.', error)
      return { success: false, order: null, emailSent: false, emailError: null, error: error.message }
    }
  }

  async function getOrderById(orderId) {
    try {
      const order = await orderRepository.findById(orderId)
      return { success: true, order, error: null }
    } catch (error) {
      console.error('Falló la búsqueda de la orden.', error)
      return { success: false, order: null, error: error.message }
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      await orderRepository.updateStatus(orderId, status)
      return { success: true, error: null }
    } catch (error) {
      console.error('Falló la actualización del estado de la orden.', error)
      return { success: false, error: error.message }
    }
  }

  return {
    checkoutCart,
    getOrderById,
    updateOrderStatus,
    subscribeToUserOrders: (userId, onChange, onError) => (
      orderRepository.subscribeToUserOrders(userId, onChange, onError)
    ),
    subscribeToAllOrders: (onChange, onError) => (
      orderRepository.subscribeToAllOrders(onChange, onError)
    ),
  }
}

export default createOrderUseCases
