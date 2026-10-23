import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AuthContext from '../../app/providers/AuthContext.js'
import { RequireAdmin, RequireAuth } from './RouteGuards.jsx'

function renderGuarded(Guard, authValue) {
  return render(
    <MemoryRouter initialEntries={['/protegido']}>
      <AuthContext.Provider value={authValue}>
        <Routes>
          <Route element={<Guard />}>
            <Route path="/protegido" element={<p>Contenido protegido</p>} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

describe('RequireAuth', () => {
  it('muestra un aviso en vez del contenido si no hay sesión', () => {
    renderGuarded(RequireAuth, { isLoading: false, isAuthenticated: false })
    expect(screen.getByText('Inicia sesión para continuar')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  it('muestra el contenido cuando el usuario está autenticado', () => {
    renderGuarded(RequireAuth, { isLoading: false, isAuthenticated: true })
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('muestra un estado de carga mientras se verifica la sesión', () => {
    renderGuarded(RequireAuth, { isLoading: true, isAuthenticated: false })
    expect(screen.getByText('Verificando tu sesión…')).toBeInTheDocument()
  })
})

describe('RequireAdmin', () => {
  it('bloquea a usuarios autenticados que no son administradores', () => {
    renderGuarded(RequireAdmin, { isLoading: false, isAuthenticated: true, isAdmin: false })
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
  })

  it('permite el acceso a administradores autenticados', () => {
    renderGuarded(RequireAdmin, { isLoading: false, isAuthenticated: true, isAdmin: true })
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })
})
