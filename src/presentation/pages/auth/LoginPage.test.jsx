jest.mock('../../../app/services/authGateway.js', () => ({
  DEMO_ADMIN_EMAIL: 'senoraysenorcafetintacafetinta@gmail.com',
}))

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AuthContext from '../../../app/providers/AuthContext.js'
import LoginPage from './LoginPage.jsx'

function DestinationStub({ label }) {
  return <p>{label}</p>
}

function renderLoginPage({ authOverrides = {}, initialEntries = ['/login'] } = {}) {
  const authValue = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
    loginWithGoogle: jest.fn().mockResolvedValue({ success: true }),
    loginWithFacebook: jest.fn().mockResolvedValue({ success: true }),
    loginWithEmail: jest.fn().mockResolvedValue({ success: true }),
    signUpWithEmail: jest.fn().mockResolvedValue({ success: true }),
    logout: jest.fn(),
    ...authOverrides,
  }

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthContext.Provider value={authValue}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DestinationStub label="Inicio" />} />
          <Route path="/carrito" element={<DestinationStub label="Carrito" />} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  )

  return authValue
}

describe('LoginPage', () => {
  it('muestra el formulario de inicio de sesión por defecto', () => {
    renderLoginPage()

    expect(screen.getByRole('heading', { name: 'Inicia sesión.' })).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.queryByLabelText('Nombre')).not.toBeInTheDocument()
  })

  it('cambia a crear cuenta y muestra los campos adicionales', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    await user.click(screen.getByRole('tab', { name: 'Crear cuenta' }))

    expect(await screen.findByRole('heading', { name: 'Crea tu cuenta.' })).toBeInTheDocument()
    expect(await screen.findByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirma tu contraseña')).toBeInTheDocument()
  })

  it('inicia sesión con correo y redirige al inicio por defecto', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage()

    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'secreta123')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(authValue.loginWithEmail).toHaveBeenCalledWith('ana@example.com', 'secreta123')
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })

  it('redirige a la ruta de origen (p. ej. el carrito) tras iniciar sesión', async () => {
    const user = userEvent.setup()
    renderLoginPage({ initialEntries: [{ pathname: '/login', state: { from: '/carrito' } }] })

    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'secreta123')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(await screen.findByText('Carrito')).toBeInTheDocument()
  })

  it('muestra el error cuando el inicio de sesión falla', async () => {
    const user = userEvent.setup()
    renderLoginPage({
      authOverrides: { loginWithEmail: jest.fn().mockResolvedValue({ success: false, error: 'Correo o contraseña incorrectos.' }) },
    })

    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'mala-clave')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  })

  it('valida que las contraseñas coincidan antes de registrar', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage()

    await user.click(screen.getByRole('tab', { name: 'Crear cuenta' }))
    await user.type(await screen.findByLabelText('Nombre'), 'Ana')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'secreta123')
    await user.type(screen.getByLabelText('Confirma tu contraseña'), 'otra-clave')
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Las contraseñas no coinciden.')
    expect(authValue.signUpWithEmail).not.toHaveBeenCalled()
  })

  it('registra una cuenta nueva con correo', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage()

    await user.click(screen.getByRole('tab', { name: 'Crear cuenta' }))
    await user.type(await screen.findByLabelText('Nombre'), 'Ana')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'secreta123')
    await user.type(screen.getByLabelText('Confirma tu contraseña'), 'secreta123')
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(authValue.signUpWithEmail).toHaveBeenCalledWith('ana@example.com', 'secreta123', 'Ana')
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })

  it('permite iniciar sesión con Google', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage()

    await user.click(screen.getByRole('button', { name: /Google/ }))

    expect(authValue.loginWithGoogle).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })

  it('permite iniciar sesión con Facebook', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage()

    await user.click(screen.getByRole('button', { name: /Facebook/ }))

    expect(authValue.loginWithFacebook).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })

  it('solo muestra el acceso de administración en el modo de inicio de sesión', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    expect(screen.getByRole('button', { name: /Acceso de administración/ })).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Crear cuenta' }))

    expect(screen.queryByRole('button', { name: /Acceso de administración/ })).not.toBeInTheDocument()
  })

  it('el acceso de administración inicia sesión directo cuando la cuenta demo ya existe', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage()

    await user.click(screen.getByRole('button', { name: /Acceso de administración/ }))

    expect(authValue.loginWithEmail).toHaveBeenCalledWith('senoraysenorcafetintacafetinta@gmail.com', '123456789')
    expect(authValue.signUpWithEmail).not.toHaveBeenCalled()
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })

  it('el acceso de administración crea la cuenta demo si todavía no existe', async () => {
    const user = userEvent.setup()
    const authValue = renderLoginPage({
      authOverrides: {
        loginWithEmail: jest.fn().mockResolvedValue({ success: false, error: 'No encontramos una cuenta con ese correo.', code: 'auth/user-not-found' }),
        signUpWithEmail: jest.fn().mockResolvedValue({ success: true }),
      },
    })

    await user.click(screen.getByRole('button', { name: /Acceso de administración/ }))

    expect(authValue.loginWithEmail).toHaveBeenCalledWith('senoraysenorcafetintacafetinta@gmail.com', '123456789')
    expect(authValue.signUpWithEmail).toHaveBeenCalledWith(
      'senoraysenorcafetintacafetinta@gmail.com',
      '123456789',
      'Administración Sr&Sra Tinta',
    )
    expect(await screen.findByText('Inicio')).toBeInTheDocument()
  })

  it('el acceso de administración muestra un error si ambos intentos fallan', async () => {
    const user = userEvent.setup()
    renderLoginPage({
      authOverrides: {
        loginWithEmail: jest.fn().mockResolvedValue({ success: false, error: 'No encontramos una cuenta con ese correo.', code: 'auth/user-not-found' }),
        signUpWithEmail: jest.fn().mockResolvedValue({ success: false, error: 'La contraseña debe tener al menos 6 caracteres.', code: 'auth/weak-password' }),
      },
    })

    await user.click(screen.getByRole('button', { name: /Acceso de administración/ }))

    expect(await screen.findByRole('alert')).toHaveTextContent('La contraseña debe tener al menos 6 caracteres.')
  })
})
