import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function PublicLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const { isAuthenticated } = useAuth()

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
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
      </main>
      <Footer />
      <AnimatePresence>
        {isAuthenticated && <WhatsAppButton />}
      </AnimatePresence>
    </div>
  )
}

export default PublicLayout
