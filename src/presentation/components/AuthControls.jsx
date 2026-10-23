import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

// Controles de sesión embebidos en la navegación principal (Header). Se
// muestran igual en escritorio y en el menú móvil porque viven dentro de
// `.main-nav`, que ya es responsive. El formulario real de inicio de sesión
// y registro vive en /login, con correo, Google y Facebook.
function AuthControls({ onNavigate }) {
  const { isLoading, isAuthenticated, user, isAdmin, logout } = useAuth()
  const location = useLocation()

  async function handleLogout() {
    await logout()
    onNavigate?.()
  }

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-controls">
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/login"
            state={{ from: location.pathname === '/login' ? '/' : location.pathname }}
            onClick={onNavigate}
            className="button auth-login-link"
          >
            Iniciar sesión
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="auth-controls auth-user-menu">
      <Link to="/mis-pedidos" onClick={onNavigate} className="auth-user-link">
        {user.photoURL ? (
          <img className="auth-avatar" src={user.photoURL} alt="" />
        ) : (
          <span className="auth-avatar auth-avatar-fallback" aria-hidden="true">
            {(user.displayName ?? user.email ?? '?').charAt(0).toUpperCase()}
          </span>
        )}
        <span className="auth-name">{user.displayName ?? user.email}</span>
      </Link>
      <Link to="/mis-pedidos" onClick={onNavigate}>Rastrear pedido</Link>
      {isAdmin && (
        <Link to="/admin" className="admin-link" onClick={onNavigate}>Panel de Administración</Link>
      )}
      <button type="button" className="text-link auth-logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default AuthControls
