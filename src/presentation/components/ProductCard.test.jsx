import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CartContext from '../../app/providers/CartContext.js'
import ProductCard from './ProductCard.jsx'

const product = {
  id: 'tote-creativa',
  name: 'Bolsa tote creativa',
  category: 'Accesorios',
  price: 6500,
  image: 'tote.png',
  color: 'rosa',
}

function renderCard(addItem = jest.fn()) {
  const cartValue = { items: [], itemCount: 0, subtotal: 0, addItem, removeItem: jest.fn(), setQuantity: jest.fn(), clearCart: jest.fn() }

  render(
    <MemoryRouter>
      <CartContext.Provider value={cartValue}>
        <ProductCard product={product} />
      </CartContext.Provider>
    </MemoryRouter>,
  )

  return { addItem }
}

describe('ProductCard', () => {
  it('muestra el nombre, categoría y precio del producto', () => {
    renderCard()

    expect(screen.getByText('Bolsa tote creativa')).toBeInTheDocument()
    expect(screen.getByText('Accesorios')).toBeInTheDocument()
    expect(screen.getByText(/₡6/)).toBeInTheDocument()
  })

  it('enlaza a la página de detalle del producto', () => {
    renderCard()

    const links = screen.getAllByRole('link', { name: /Bolsa tote creativa|Ver Bolsa tote creativa/ })
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => expect(link).toHaveAttribute('href', '/producto/tote-creativa'))
  })

  it('llama a addItem con el producto al hacer click en el botón de carrito', async () => {
    const user = userEvent.setup()
    const { addItem } = renderCard()

    await user.click(screen.getByRole('button', { name: /Agregar Bolsa tote creativa al carrito/ }))

    expect(addItem).toHaveBeenCalledTimes(1)
    expect(addItem).toHaveBeenCalledWith(product)
  })
})
