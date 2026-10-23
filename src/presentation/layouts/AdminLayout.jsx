import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import BrandMark from '../components/BrandMark.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function AdminLayout() {
  const location = useLocation()
  const outlet = useOutlet()

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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default AdminLayout
