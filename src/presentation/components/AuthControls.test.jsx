import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../../app/providers/AuthContext.js'
import AuthControls from './AuthControls.jsx'

function renderWithAuth(authValue, initialEntries = ['/carrito']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthContext.Provider value={authValue}>
        <AuthControls />
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

describe('AuthControls', () => {
  it('muestra un único enlace para iniciar sesión cuando no hay usuario', () => {
    renderWithAuth({ isLoading: false, isAuthenticated: false, user: null, isAdmin: false, logout: jest.fn() })

    const link = screen.getByRole('link', { name: 'Iniciar sesión' })
    expect(link).toHaveAttribute('href', '/login')
  })

  it('recuerda la ruta actual para volver a ella tras iniciar sesión', () => {
    renderWithAuth({ isLoading: false, isAuthenticated: false, user: null, isAdmin: false, logout: jest.fn() }, ['/carrito'])

    const link = screen.getByRole('link', { name: 'Iniciar sesión' })
    expect(link.getAttribute('href')).toBe('/login')
  })

  it('muestra el menú de usuario cuando ya hay una sesión activa', () => {
    renderWithAuth({
      isLoading: false,
      isAuthenticated: true,
      user: { displayName: 'Ana', email: 'ana@example.com', photoURL: null },
      isAdmin: false,
      logout: jest.fn(),
    })

    expect(screen.getByText('Ana')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Rastrear pedido' })).toHaveAttribute('href', '/mis-pedidos')
    expect(screen.queryByRole('link', { name: 'Panel de Administración' })).not.toBeInTheDocument()
  })

  it('muestra el enlace de administración solo para administradores', () => {
    renderWithAuth({
      isLoading: false,
      isAuthenticated: true,
      user: { displayName: 'Admin', email: 'admin@example.com', photoURL: null },
      isAdmin: true,
      logout: jest.fn(),
    })

    expect(screen.getByRole('link', { name: 'Panel de Administración' })).toHaveAttribute('href', '/admin')
  })

  it('no muestra nada mientras se verifica la sesión', () => {
    const { container } = renderWithAuth({ isLoading: true, isAuthenticated: false, user: null, isAdmin: false, logout: jest.fn() })
    expect(container).toBeEmptyDOMElement()
  })
})
