import AdminOrdersPanel from '../../components/admin/AdminOrdersPanel.jsx'
import useAuth from '../../hooks/useAuth.js'

function AdminDashboardPage() {
  const { user } = useAuth()

  return (
    <section className="page-content">
      <div className="page-heading">
        <p className="eyebrow">Sr&Sra Tinta · Módulo privado</p>
        <h1>Panel de administración</h1>
        <p className="page-description">
          Sesión activa como {user.displayName ?? user.email}. Desde aquí puedes revisar todas las
          órdenes creadas por los usuarios y avanzar su estado logístico.
        </p>
      </div>
      <AdminOrdersPanel />
    </section>
  )
}

export default AdminDashboardPage
