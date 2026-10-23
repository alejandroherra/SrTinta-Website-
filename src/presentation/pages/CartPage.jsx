import { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkoutCart } from '../../app/services/orderCatalog.js'
import { getWhatsAppUrl } from '../../shared/constants/contact.js'
import formatPrice from '../../shared/utils/formatPrice.js'
import useAuth from '../hooks/useAuth.js'
import useCart from '../hooks/useCart.js'

function CartPage() {
  const { items, subtotal, removeItem, setQuantity, clearCart } = useCart()
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)
  const [completedOrder, setCompletedOrder] = useState(null)

  const orderMessage = [
    'Hola, quiero consultar este pedido:',
    ...items.map((item) => `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`),
    `Subtotal de referencia: ${formatPrice(subtotal)}`,
  ].join('\n')

  // Genera la orden en Firestore, dispara el correo de confirmación por
  // EmailJS y limpia el carrito. Todo el try/catch vive en la capa de
  // casos de uso; aquí solo se interpreta el resultado { success, order, error }.
  async function handleCheckout() {
    setIsCheckingOut(true)
    setCheckoutError(null)

    const { success, order, error } = await checkoutCart({
      user,
      items,
      subtotal,
      trackingBaseUrl: `${window.location.origin}/mis-pedidos`,
    })

    setIsCheckingOut(false)

    if (!success) {
      setCheckoutError(error ?? 'No se pudo generar tu pedido. Intenta de nuevo.')
      return
    }

    setCompletedOrder(order)
    clearCart()
  }

  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Tu selección</p>
        <h1>Carrito.</h1>
        <p className="page-description">Revisa tus productos y ajusta las cantidades antes de finalizar tu compra.</p>
      </div>

      {completedOrder && (
        <div className="order-success-banner">
          <strong>¡Pedido {completedOrder.orderId} creado con éxito!</strong>
          <p>Te enviamos la confirmación a {completedOrder.userEmail}.</p>
          <Link className="text-link" to="/mis-pedidos">Ver el estado de tu pedido</Link>
        </div>
      )}

      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">＋</span>
          <h2>Tu carrito está esperando ideas.</h2>
          <p>Cuando encuentres algo que te guste, agrégalo aquí.</p>
          <Link className="button" to="/tienda">Explorar tienda</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <h2>{item.name}</h2>
                  <span className="product-price">{formatPrice(item.price)}</span>
                </div>
                <label className="quantity-control">
                  <span className="sr-only">Cantidad de {item.name}</span>
                  <button type="button" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button>
                  <input type="number" min="1" value={item.quantity} onChange={(event) => setQuantity(item.id, event.target.value)} />
                  <button type="button" aria-label={`Agregar una unidad de ${item.name}`} onClick={() => setQuantity(item.id, item.quantity + 1)}>＋</button>
                </label>
                <strong className="cart-line-total">{formatPrice(item.price * item.quantity)}</strong>
                <button className="remove-button" type="button" onClick={() => removeItem(item.id)}>Quitar</button>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <p className="product-category">Resumen del pedido</p>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p className="summary-note">El subtotal es una referencia para productos de muestra.</p>

            {checkoutError && <p className="auth-error">{checkoutError}</p>}

            {!isAuthLoading && !isAuthenticated && (
              <div className="checkout-login-prompt">
                <p>Inicia sesión para finalizar tu compra y poder rastrear tu pedido.</p>
                <Link className="button button-light" to="/login" state={{ from: '/carrito' }}>
                  Iniciar sesión o crear cuenta
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <button type="button" className="button cart-checkout" disabled={isCheckingOut} onClick={handleCheckout}>
                {isCheckingOut ? 'Procesando…' : 'Finalizar compra'}
              </button>
            )}

            <a className="text-link cart-whatsapp-link" href={getWhatsAppUrl(orderMessage)} target="_blank" rel="noreferrer">
              Prefiero consultar este pedido por WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link continue-shopping" to="/tienda">Seguir explorando</Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default CartPage
