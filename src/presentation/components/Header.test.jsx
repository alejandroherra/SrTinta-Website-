import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../../app/providers/AuthContext.js'
import CartContext from '../../app/providers/CartContext.js'
import Header from './Header.jsx'

const cartValue = { items: [], itemCount: 2, subtotal: 17000, addItem: jest.fn(), removeItem: jest.fn(), setQuantity: jest.fn(), clearCart: jest.fn() }
const authValue = { user: null, isLoading: false, isAuthenticated: false, isAdmin: false, loginWithGoogle: jest.fn(), loginWithFacebook: jest.fn(), logout: jest.fn() }

function renderHeader() {
  return render(
    <MemoryRouter>
      <CartContext.Provider value={cartValue}>
        <AuthContext.Provider value={authValue}>
          <Header />
        </AuthContext.Provider>
      </CartContext.Provider>
    </MemoryRouter>,
  )
}

function mockMobileViewport() {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === '(max-width: 900px)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

describe('Header', () => {
  it('muestra los enlaces principales de navegación', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Tienda' })).toHaveAttribute('href', '/tienda')
    expect(screen.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/servicios')
    expect(screen.getByRole('link', { name: 'Nosotros' })).toHaveAttribute('href', '/nosotros')
    expect(screen.getByRole('link', { name: 'Galería' })).toHaveAttribute('href', '/galeria')
  })

  it('muestra la cantidad de artículos en el enlace del carrito', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Carrito (2)' })).toHaveAttribute('href', '/carrito')
  })

  it('el botón de menú alterna su estado accesible al hacer click', async () => {
    const user = userEvent.setup()
    renderHeader()

    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Cerrar menú' }))
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('en viewport móvil, el menú inicia colapsado y se expande al abrirlo', async () => {
    mockMobileViewport()
    const user = userEvent.setup()
    renderHeader()

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    await waitFor(() => expect(nav).toHaveStyle({ opacity: 0 }))

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    await waitFor(() => expect(nav).toHaveStyle({ opacity: 1 }))
  })
})
