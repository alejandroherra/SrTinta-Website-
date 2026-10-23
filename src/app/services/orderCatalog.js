import createOrderUseCases from '../../application/use-cases/orders/OrderUseCases.js'
import FirestoreOrderRepository from '../../infrastructure/repositories/FirestoreOrderRepository.js'
import * as emailService from '../../infrastructure/services/emailService.js'

const orderUseCases = createOrderUseCases(new FirestoreOrderRepository(), emailService)

export const {
  checkoutCart,
  getOrderById,
  updateOrderStatus,
  subscribeToUserOrders,
  subscribeToAllOrders,
} = orderUseCases
