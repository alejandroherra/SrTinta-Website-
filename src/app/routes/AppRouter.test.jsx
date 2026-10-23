import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../providers/AuthContext.js'
import CartContext from '../providers/CartContext.js'
import AppRouter from './AppRouter.jsx'

const cartValue = { items: [], itemCount: 0, subtotal: 0, addItem: jest.fn(), removeItem: jest.fn(), setQuantity: jest.fn(), clearCart: jest.fn() }
const authValue = { user: null, isLoading: false, isAuthenticated: false, isAdmin: false, loginWithGoogle: jest.fn(), loginWithFacebook: jest.fn(), logout: jest.fn() }

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartContext.Provider value={cartValue}>
        <AuthContext.Provider value={authValue}>
          <AppRouter />
        </AuthContext.Provider>
      </CartContext.Provider>
    </MemoryRouter>,
  )
}

describe('AppRouter', () => {
  it('renderiza la página de inicio en la ruta raíz', async () => {
    renderAt('/')
    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Ideas que se')
    expect(heading.textContent).toContain('visten.')
  })

  it('carga de forma perezosa la página de la tienda al navegar', async () => {
    renderAt('/tienda')
    expect(await screen.findByText('La tienda del taller.')).toBeInTheDocument()
  })

  it('carga de forma perezosa la página de servicios', async () => {
    renderAt('/servicios')
    expect(await screen.findByText('un buen acabado.')).toBeInTheDocument()
  })

  it('muestra la página 404 para una ruta desconocida', async () => {
    renderAt('/esto-no-existe')
    expect(await screen.findByText('404')).toBeInTheDocument()
  })
})
