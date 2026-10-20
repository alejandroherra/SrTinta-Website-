class ProductRepository {
  getAll() {
    throw new Error('ProductRepository.getAll debe ser implementado por un adaptador.')
  }

  findById() {
    throw new Error('ProductRepository.findById debe ser implementado por un adaptador.')
  }
}

export default ProductRepository
