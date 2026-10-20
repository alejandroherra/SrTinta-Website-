import createProductUseCases from '../../application/use-cases/products/GetProducts.js'
import MockProductRepository from '../../infrastructure/repositories/MockProductRepository.js'

const productCatalog = createProductUseCases(new MockProductRepository())

export const { getProducts, getProductById } = productCatalog
