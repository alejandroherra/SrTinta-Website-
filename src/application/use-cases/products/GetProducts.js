function createProductUseCases(productRepository) {
  return {
    getProducts: () => productRepository.getAll(),
    getProductById: (productId) => productRepository.findById(productId),
  }
}

export default createProductUseCases
