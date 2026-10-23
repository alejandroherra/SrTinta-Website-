import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../../app/providers/AuthContext.js'
import CartContext from '../../app/providers/CartContext.js'
import { checkoutCart } from '../../app/services/orderCatalog.js'
import CartPage from './CartPage.jsx'

jest.mock('../../app/services/orderCatalog.js', () => ({
  checkoutCart: jest.fn(),
}))

const baseAuth = { user: null, isLoading: false, isAuthenticated: false, isAdmin: false, loginWithGoogle: jest.fn(), loginWithFacebook: jest.fn(), logout: jest.fn() }

function renderCartPage({ cart, auth } = {}) {
  const cartValue = {
    items: [],
    subtotal: 0,
    removeItem: jest.fn(),
    setQuantity: jest.fn(),
    clearCart: jest.fn(),
    ...cart,
  }
  const authValue = { ...baseAuth, ...auth }

  return render(
    <MemoryRouter>
      <CartContext.Provider value={cartValue}>
        <AuthContext.Provider value={authValue}>
          <CartPage />
        </AuthContext.Provider>
      </CartContext.Provider>
    </MemoryRouter>,
  )
}

describe('CartPage', () => {
  it('muestra el estado de carrito vacío con un enlace a la tienda', () => {
    renderCartPage()

    expect(screen.getByText('Tu carrito está esperando ideas.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explorar tienda' })).toHaveAttribute('href', '/tienda')
  })

  it('lista los productos agregados con su subtotal', () => {
    renderCartPage({
      cart: {
        items: [{ id: 'p1', name: 'Camiseta esencial', category: 'Ropa', price: 8500, quantity: 2, image: 'x.png' }],
        subtotal: 17000,
      },
    })

    expect(screen.getByText('Camiseta esencial')).toBeInTheDocument()
    expect(screen.getAllByText(/17/).length).toBeGreaterThan(0)
  })

  it('pide iniciar sesión antes de poder finalizar la compra', () => {
    renderCartPage({
      cart: { items: [{ id: 'p1', name: 'Camiseta esencial', category: 'Ropa', price: 8500, quantity: 1, image: 'x.png' }], subtotal: 8500 },
    })

    expect(screen.getByText('Inicia sesión para finalizar tu compra y poder rastrear tu pedido.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Finalizar compra' })).not.toBeInTheDocument()
  })

  it('permite finalizar la compra cuando el usuario está autenticado', async () => {
    checkoutCart.mockResolvedValue({
      success: true,
      order: { orderId: 'ABC123', userEmail: 'test@example.com' },
    })

    const user = userEvent.setup()
    renderCartPage({
      cart: { items: [{ id: 'p1', name: 'Camiseta esencial', category: 'Ropa', price: 8500, quantity: 1, image: 'x.png' }], subtotal: 8500 },
      auth: { isAuthenticated: true, user: { email: 'test@example.com' } },
    })

    await user.click(screen.getByRole('button', { name: 'Finalizar compra' }))

    expect(checkoutCart).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('¡Pedido ABC123 creado con éxito!')).toBeInTheDocument()
  })
})
