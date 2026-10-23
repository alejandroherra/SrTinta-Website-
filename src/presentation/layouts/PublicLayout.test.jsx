import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AuthContext from '../../app/providers/AuthContext.js'
import CartContext from '../../app/providers/CartContext.js'
import PublicLayout from './PublicLayout.jsx'

const cartValue = { items: [], itemCount: 0, subtotal: 0, addItem: jest.fn(), removeItem: jest.fn(), setQuantity: jest.fn(), clearCart: jest.fn() }

function renderLayout(isAuthenticated) {
  const authValue = {
    user: isAuthenticated ? { displayName: 'Ana', email: 'ana@example.com', photoURL: null } : null,
    isLoading: false,
    isAuthenticated,
    isAdmin: false,
    loginWithGoogle: jest.fn(),
    loginWithFacebook: jest.fn(),
    logout: jest.fn(),
  }

  return render(
    <MemoryRouter initialEntries={['/']}>
      <CartContext.Provider value={cartValue}>
        <AuthContext.Provider value={authValue}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<p>Contenido</p>} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </CartContext.Provider>
    </MemoryRouter>,
  )
}

describe('PublicLayout', () => {
  it('no muestra el botón de WhatsApp antes de iniciar sesión', () => {
    renderLayout(false)
    expect(screen.queryByRole('link', { name: /Escríbenos por WhatsApp/ })).not.toBeInTheDocument()
  })

  it('muestra el botón de WhatsApp una vez que el usuario inició sesión', () => {
    renderLayout(true)
    expect(screen.getByRole('link', { name: /Escríbenos por WhatsApp/ })).toBeInTheDocument()
  })
})
