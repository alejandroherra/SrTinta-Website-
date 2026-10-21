import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import BrandMark from '../components/BrandMark.jsx'
import PageLoader from '../components/PageLoader.jsx'
import PageTransition from '../components/PageTransition.jsx'

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
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </div>
    </main>
  )
}

export default AdminLayout
