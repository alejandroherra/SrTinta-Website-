import { Link, Outlet } from 'react-router-dom'
import BrandMark from '../components/BrandMark.jsx'

function AdminLayout() {
  return (
    <main className="admin-shell">
      <div className="page-container">
        <div className="admin-topbar">
          <Link className="brand" to="/">
            <BrandMark />
            <span className="brand-name">
              <span>Sr&Sra Tinta</span>
              <span>Administración</span>
            </span>
          </Link>
          <span className="admin-label">Módulo independiente</span>
        </div>
        <Outlet />
      </div>
    </main>
  )
}

export default AdminLayout
