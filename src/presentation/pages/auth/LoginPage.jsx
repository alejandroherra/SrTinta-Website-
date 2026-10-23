import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { DEMO_ADMIN_EMAIL } from '../../../app/services/authGateway.js'
import useAuth from '../../hooks/useAuth.js'

const initialLoginForm = { email: '', password: '' }
const initialSignupForm = { name: '', email: '', password: '', confirmPassword: '' }

// Contraseña fija de la cuenta de administración de demostración. El botón
// de acceso rápido intenta iniciar sesión con ella y, si la cuenta todavía
// no existe en Firebase, la crea en el momento (quedará como admin porque
// su correo ya está en la lista de DEMO_ADMIN_EMAIL / isAdminEmail).
const DEMO_ADMIN_PASSWORD = '123456789'
const MISSING_ACCOUNT_CODES = new Set(['auth/user-not-found', 'auth/invalid-credential'])

function LoginPage() {
  const { loginWithGoogle, loginWithFacebook, loginWithEmail, signUpWithEmail } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from ?? '/'

  const [mode, setMode] = useState('login')
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [signupForm, setSignupForm] = useState(initialSignupForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pendingProvider, setPendingProvider] = useState(null)
  const [formError, setFormError] = useState(null)

  function goToMode(nextMode) {
    if (nextMode === mode) return
    setFormError(null)
    setMode(nextMode)
  }

  function updateLoginField(event) {
    setLoginForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function updateSignupField(event) {
    setSignupForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function goToDestination() {
    navigate(redirectTo, { replace: true })
  }

  async function handleLoginSubmit(event) {
    event.preventDefault()
    setFormError(null)
    setIsSubmitting(true)

    const { success, error } = await loginWithEmail(loginForm.email, loginForm.password)

    setIsSubmitting(false)

    if (!success) {
      setFormError(error ?? 'No se pudo iniciar sesión. Intenta de nuevo.')
      return
    }

    goToDestination()
  }

  async function handleSignupSubmit(event) {
    event.preventDefault()
    setFormError(null)

    if (signupForm.password !== signupForm.confirmPassword) {
      setFormError('Las contraseñas no coinciden.')
      return
    }

    if (signupForm.password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setIsSubmitting(true)
    const { success, error } = await signUpWithEmail(signupForm.email, signupForm.password, signupForm.name)
    setIsSubmitting(false)

    if (!success) {
      setFormError(error ?? 'No se pudo crear tu cuenta. Intenta de nuevo.')
      return
    }

    goToDestination()
  }

  async function handleSocialLogin(providerName, loginFn) {
    setFormError(null)
    setPendingProvider(providerName)

    const { success, error } = await loginFn()

    setPendingProvider(null)

    if (!success) {
      setFormError('No se pudo iniciar sesión. Intenta de nuevo.')
      console.error(`Falló el inicio de sesión con ${providerName}.`, error)
      return
    }

    goToDestination()
  }

  async function handleAdminQuickAccess() {
    setFormError(null)
    setPendingProvider('admin')

    let result = await loginWithEmail(DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD)

    if (!result.success && MISSING_ACCOUNT_CODES.has(result.code)) {
      result = await signUpWithEmail(DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD, 'Administración Sr&Sra Tinta')
    }

    setPendingProvider(null)

    if (!result.success) {
      setFormError(result.error ?? 'No se pudo acceder con la cuenta de administración.')
      return
    }

    goToDestination()
  }

  return (
    <section className="auth-split">
      <motion.aside
        className="auth-visual"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="auth-visual-backdrop" aria-hidden="true" />

        <motion.div
          className="auth-visual-ring"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <span>SR<br />&amp; SRA<br />TINTA</span>
        </motion.div>

        <motion.span
          className="auth-visual-dot auth-visual-dot-1"
          aria-hidden="true"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="auth-visual-dot auth-visual-dot-2"
          aria-hidden="true"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />

        <motion.div
          className="auth-visual-badge"
          initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -10 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 16 }}
        >
          Diseño<br />con intención
        </motion.div>

        <motion.div
          className="auth-visual-content"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p className="eyebrow">Taller creativo</p>
          <h2>Tu cuenta,<br />tu taller.</h2>
          <p className="auth-visual-quote">
            “Cada prenda cuenta una historia; guardamos la tuya para que la retomes cuando quieras.”
          </p>
          <span className="auth-visual-signature">— Sr&amp;Sra Tinta, desde 2019</span>
        </motion.div>
      </motion.aside>

      <div className="auth-panel-wrap">
        <div className="auth-panel-inner">
          <p className="eyebrow">Bienvenido de vuelta</p>
          <h1>{mode === 'login' ? 'Inicia sesión.' : 'Crea tu cuenta.'}</h1>
          <p className="page-description">
            {mode === 'login'
              ? 'Entra para rastrear tus pedidos y finalizar tu compra.'
              : 'Regístrate para guardar tus pedidos y comprar más rápido la próxima vez.'}
          </p>

          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="auth-tabs" role="tablist" aria-label="Elige si quieres iniciar sesión o crear una cuenta">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`auth-tab${mode === 'login' ? ' is-active' : ''}`}
                onClick={() => goToMode('login')}
              >
                {mode === 'login' && (
                  <motion.span className="auth-tab-indicator" layoutId="auth-tab-indicator" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="auth-tab-label">Iniciar sesión</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`auth-tab${mode === 'signup' ? ' is-active' : ''}`}
                onClick={() => goToMode('signup')}
              >
                {mode === 'signup' && (
                  <motion.span className="auth-tab-indicator" layoutId="auth-tab-indicator" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="auth-tab-label">Crear cuenta</span>
              </button>
            </div>

            <AnimatePresence>
              {formError && (
                <motion.p
                  key={formError}
                  className="auth-form-error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto', x: [0, -8, 8, -5, 5, 0] }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {formError}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {mode === 'login' ? (
                <motion.form
                  key="login"
                  className="contact-form auth-form"
                  onSubmit={handleLoginSubmit}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.22 }}
                >
                  <label>Correo electrónico
                    <input name="email" type="email" value={loginForm.email} onChange={updateLoginField} autoComplete="email" required />
                  </label>
                  <label>Contraseña
                    <input name="password" type="password" value={loginForm.password} onChange={updateLoginField} autoComplete="current-password" required minLength={6} />
                  </label>
                  <motion.button
                    className="button auth-submit"
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  >
                    {isSubmitting ? 'Entrando…' : 'Iniciar sesión'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  className="contact-form auth-form"
                  onSubmit={handleSignupSubmit}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  <label>Nombre
                    <input name="name" type="text" value={signupForm.name} onChange={updateSignupField} autoComplete="name" required />
                  </label>
                  <label>Correo electrónico
                    <input name="email" type="email" value={signupForm.email} onChange={updateSignupField} autoComplete="email" required />
                  </label>
                  <label>Contraseña
                    <input name="password" type="password" value={signupForm.password} onChange={updateSignupField} autoComplete="new-password" required minLength={6} />
                  </label>
                  <label>Confirma tu contraseña
                    <input name="confirmPassword" type="password" value={signupForm.confirmPassword} onChange={updateSignupField} autoComplete="new-password" required minLength={6} />
                  </label>
                  <motion.button
                    className="button auth-submit"
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  >
                    {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="auth-divider"><span>o continúa con</span></div>

            <div className="auth-social-buttons">
              <motion.button
                type="button"
                className="auth-social-button auth-social-google"
                disabled={pendingProvider !== null}
                onClick={() => handleSocialLogin('Google', loginWithGoogle)}
                whileHover={{ y: pendingProvider ? 0 : -2 }}
                whileTap={{ scale: pendingProvider ? 1 : 0.97 }}
              >
                <GoogleIcon />
                {pendingProvider === 'Google' ? 'Conectando…' : 'Google'}
              </motion.button>
              <motion.button
                type="button"
                className="auth-social-button auth-social-facebook"
                disabled={pendingProvider !== null}
                onClick={() => handleSocialLogin('Facebook', loginWithFacebook)}
                whileHover={{ y: pendingProvider ? 0 : -2 }}
                whileTap={{ scale: pendingProvider ? 1 : 0.97 }}
              >
                <FacebookIcon />
                {pendingProvider === 'Facebook' ? 'Conectando…' : 'Facebook'}
              </motion.button>
            </div>

            {mode === 'login' && (
              <div className="auth-admin-access">
                <div className="auth-divider auth-divider-subtle"><span>uso interno</span></div>
                <motion.button
                  type="button"
                  className="auth-admin-button"
                  disabled={pendingProvider !== null}
                  onClick={handleAdminQuickAccess}
                  whileHover={{ y: pendingProvider ? 0 : -2 }}
                  whileTap={{ scale: pendingProvider ? 1 : 0.97 }}
                >
                  <AdminIcon />
                  {pendingProvider === 'admin' ? 'Accediendo…' : 'Acceso de administración (demo)'}
                </motion.button>
              </div>
            )}

            <p className="auth-switch-mode">
              {mode === 'login' ? '¿Aún no tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button type="button" className="text-link" onClick={() => goToMode(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Crea una aquí' : 'Inicia sesión'}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.6 0-14.2 4.3-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.2-5.6l-6.5-5.5C29.7 34.6 27 35.5 24 35.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.5C41.6 36.4 44 30.8 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.69 4.54-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  )
}

function AdminIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default LoginPage
