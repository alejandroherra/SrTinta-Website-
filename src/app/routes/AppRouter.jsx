import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../../presentation/layouts/AdminLayout.jsx'
import PublicLayout from '../../presentation/layouts/PublicLayout.jsx'
import RouteLoader from '../../presentation/components/RouteLoader.jsx'
import ScrollToTop from '../../presentation/components/ScrollToTop.jsx'
import { RequireAdmin, RequireAuth } from '../../presentation/components/RouteGuards.jsx'

// Cada página se carga en su propio chunk y solo se descarga cuando el
// usuario navega a esa ruta, en vez de ir todo en el bundle inicial.
const AboutPage = lazy(() => import('../../presentation/pages/AboutPage.jsx'))
const CartPage = lazy(() => import('../../presentation/pages/CartPage.jsx'))
const ContactPage = lazy(() => import('../../presentation/pages/ContactPage.jsx'))
const FaqPage = lazy(() => import('../../presentation/pages/FaqPage.jsx'))
const GalleryPage = lazy(() => import('../../presentation/pages/GalleryPage.jsx'))
const HomePage = lazy(() => import('../../presentation/pages/HomePage.jsx'))
const LoginPage = lazy(() => import('../../presentation/pages/auth/LoginPage.jsx'))
const NotFoundPage = lazy(() => import('../../presentation/pages/NotFoundPage.jsx'))
const OrderTrackerPage = lazy(() => import('../../presentation/pages/OrderTrackerPage.jsx'))
const ProductDetailPage = lazy(() => import('../../presentation/pages/ProductDetailPage.jsx'))
const QrPage = lazy(() => import('../../presentation/pages/QrPage.jsx'))
const ServiceDetailPage = lazy(() => import('../../presentation/pages/ServiceDetailPage.jsx'))
const ServicesPage = lazy(() => import('../../presentation/pages/ServicesPage.jsx'))
const ShopPage = lazy(() => import('../../presentation/pages/ShopPage.jsx'))
const AdminDashboardPage = lazy(() => import('../../presentation/pages/admin/AdminDashboardPage.jsx'))

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteLoader />}>
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
            <Route path="login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route path="mis-pedidos" element={<OrderTrackerPage />} />
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<RequireAdmin />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="*" element={<AdminDashboardPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRouter
