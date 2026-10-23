import ProductRepository from '../../domain/repositories/ProductRepository.js'

const products = [
  {
    id: 'camiseta-esencial',
    name: 'Camiseta esencial',
    category: 'Prendas personalizadas',
    price: 8500,
    description: 'Camiseta de algodón con estampado original hecho en nuestro taller.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    color: 'verde',
  },
  {
    id: 'tote-creativa',
    name: 'Bolsa tote creativa',
    category: 'Accesorios',
    price: 6500,
    description: 'Bolsa reutilizable para llevar tus ideas a todas partes.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    color: 'rosa',
  },
  {
    id: 'polo-bordado',
    name: 'Polo bordado',
    category: 'Bordado',
    price: 12500,
    description: 'Un acabado clásico y duradero para tu marca o equipo.',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80',
    color: 'arena',
  },
  {
    id: 'gorra-personalizada',
    name: 'Gorra personalizada',
    category: 'Accesorios',
    price: 9500,
    description: 'Dale vida a tu diseño con bordado personalizado.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    color: 'azul',
  },
]

class MockProductRepository extends ProductRepository {
  constructor() {
    super()
  }

  getAll() {
    return products
  }

  findById(productId) {
    return products.find((product) => product.id === productId) ?? null
  }
}

export default MockProductRepository
