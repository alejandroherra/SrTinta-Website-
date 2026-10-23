import createProductUseCases from './GetProducts.js'

function makeRepository(products) {
  return {
    getAll: () => products,
    findById: (id) => products.find((product) => product.id === id) ?? null,
  }
}

describe('createProductUseCases', () => {
  it('getProducts delega en productRepository.getAll', () => {
    const products = [{ id: '1' }, { id: '2' }]
    const useCases = createProductUseCases(makeRepository(products))

    expect(useCases.getProducts()).toBe(products)
  })

  it('getProductById devuelve el producto correcto', () => {
    const products = [{ id: 'a' }, { id: 'b' }]
    const useCases = createProductUseCases(makeRepository(products))

    expect(useCases.getProductById('b')).toEqual({ id: 'b' })
  })

  it('getProductById devuelve null si no existe', () => {
    const useCases = createProductUseCases(makeRepository([]))
    expect(useCases.getProductById('no-existe')).toBeNull()
  })
})
