import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../../presentation/layouts/AdminLayout.jsx'
import PublicLayout from '../../presentation/layouts/PublicLayout.jsx'
import AboutPage from '../../presentation/pages/AboutPage.jsx'
import CartPage from '../../presentation/pages/CartPage.jsx'
import ContactPage from '../../presentation/pages/ContactPage.jsx'
import FaqPage from '../../presentation/pages/FaqPage.jsx'
import GalleryPage from '../../presentation/pages/GalleryPage.jsx'
import HomePage from '../../presentation/pages/HomePage.jsx'
import NotFoundPage from '../../presentation/pages/NotFoundPage.jsx'
import ProductDetailPage from '../../presentation/pages/ProductDetailPage.jsx'
import QrPage from '../../presentation/pages/QrPage.jsx'
import ServiceDetailPage from '../../presentation/pages/ServiceDetailPage.jsx'
import ServicesPage from '../../presentation/pages/ServicesPage.jsx'
import ShopPage from '../../presentation/pages/ShopPage.jsx'
import AdminDashboardPage from '../../presentation/pages/admin/AdminDashboardPage.jsx'

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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
