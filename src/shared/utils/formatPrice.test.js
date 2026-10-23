import formatPrice from './formatPrice.js'

describe('formatPrice', () => {
  it('formatea un número como colones costarricenses sin decimales', () => {
    expect(formatPrice(8500)).toBe(`₡8${' '}500`)
  })

  it('redondea a cero decimales incluso con centavos', () => {
    expect(formatPrice(1234.56)).toBe(`₡1${' '}235`)
  })

  it('formatea cero como ₡0', () => {
    expect(formatPrice(0)).toBe('₡0')
  })

  it('siempre incluye el símbolo de colón', () => {
    expect(formatPrice(42)).toMatch(/^₡/)
  })
})
