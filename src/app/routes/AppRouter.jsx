import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../../presentation/layouts/AdminLayout.jsx'
import PublicLayout from '../../presentation/layouts/PublicLayout.jsx'
import PageLoader from '../../presentation/components/PageLoader.jsx'

const HomePage = lazy(() => import('../../presentation/pages/HomePage.jsx'))
const AboutPage = lazy(() => import('../../presentation/pages/AboutPage.jsx'))
const ShopPage = lazy(() => import('../../presentation/pages/ShopPage.jsx'))
const ProductDetailPage = lazy(() => import('../../presentation/pages/ProductDetailPage.jsx'))
const CartPage = lazy(() => import('../../presentation/pages/CartPage.jsx'))
const ServicesPage = lazy(() => import('../../presentation/pages/ServicesPage.jsx'))
const ServiceDetailPage = lazy(() => import('../../presentation/pages/ServiceDetailPage.jsx'))
const GalleryPage = lazy(() => import('../../presentation/pages/GalleryPage.jsx'))
const FaqPage = lazy(() => import('../../presentation/pages/FaqPage.jsx'))
const ContactPage = lazy(() => import('../../presentation/pages/ContactPage.jsx'))
const QrPage = lazy(() => import('../../presentation/pages/QrPage.jsx'))
const AdminDashboardPage = lazy(() => import('../../presentation/pages/admin/AdminDashboardPage.jsx'))
const NotFoundPage = lazy(() => import('../../presentation/pages/NotFoundPage.jsx'))

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="tienda" element={<ShopPage />} />
        <Route path="producto/:productId" element={<ProductDetailPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route path="servicios/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="galeria" element={<GalleryPage />} />
        <Route path="preguntas-frecuentes" element={<FaqPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="qr" element={<QrPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="*" element={<AdminDashboardPage />} />
      </Route>
      <Route
        path="*"
        element={(
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        )}
      />
    </Routes>
  )
}

export default AppRouter
