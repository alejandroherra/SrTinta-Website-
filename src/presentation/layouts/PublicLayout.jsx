import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import PageLoader from '../components/PageLoader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { Suspense } from 'react'

function PublicLayout() {
  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PublicLayout
