class OrderRepository {
  create() {
    throw new Error('OrderRepository.create debe ser implementado por un adaptador.')
  }

  findById() {
    throw new Error('OrderRepository.findById debe ser implementado por un adaptador.')
  }

  subscribeToUserOrders() {
    throw new Error('OrderRepository.subscribeToUserOrders debe ser implementado por un adaptador.')
  }

  subscribeToAllOrders() {
    throw new Error('OrderRepository.subscribeToAllOrders debe ser implementado por un adaptador.')
  }

  updateStatus() {
    throw new Error('OrderRepository.updateStatus debe ser implementado por un adaptador.')
  }
}

export default OrderRepository
