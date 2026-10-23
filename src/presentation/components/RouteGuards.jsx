import { Link, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

// Protege rutas que requieren una sesión iniciada (Google o Facebook),
// como el rastreador de pedidos del propio usuario.
export function RequireAuth() {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <GuardNotice title="Verificando tu sesión…" description="Un momento, por favor." />
  }

  if (!isAuthenticated) {
    return (
      <GuardNotice
        title="Inicia sesión para continuar"
        description="Esta sección es exclusiva para usuarios con una sesión activa. Usa los botones de Google o Facebook en el menú superior."
      />
    )
  }

  return <Outlet />
}

// Protege rutas exclusivas de administración: exige sesión iniciada y que
// el correo coincida con la lista de administradores configurada.
export function RequireAdmin() {
  const { isLoading, isAuthenticated, isAdmin } = useAuth()

  if (isLoading) {
    return <GuardNotice title="Verificando permisos…" description="Un momento, por favor." />
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <GuardNotice
        title="Acceso restringido"
        description="Esta sección es exclusiva para la cuenta de administración. Inicia sesión con esa cuenta desde el menú superior."
      />
    )
  }

  return <Outlet />
}

function GuardNotice({ title, description }) {
  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Sr&Sra Tinta</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <div className="placeholder-panel">
        <p className="page-action"><Link className="button button-light" to="/">Volver al sitio</Link></p>
      </div>
    </section>
  )
}
