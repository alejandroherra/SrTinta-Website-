import { useEffect, useMemo, useState } from 'react'
import { subscribeToUserOrders } from '../../app/services/orderCatalog.js'
import { ORDER_STATUS_LABELS } from '../../domain/entities/order.js'
import formatPrice from '../../shared/utils/formatPrice.js'
import useAuth from '../hooks/useAuth.js'

function OrderTrackerPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Suscripción en tiempo real: si el admin cambia el estado de un pedido,
    // esta vista se actualiza sola sin que el usuario recargue la página.
    const unsubscribe = subscribeToUserOrders(
      user.uid,
      (userOrders) => {
        setOrders(userOrders)
        setIsLoading(false)
      },
      () => {
        setLoadError('No se pudieron cargar tus pedidos. Intenta de nuevo más tarde.')
        setIsLoading(false)
      },
    )

    return unsubscribe
  }, [user.uid])

  const filteredOrders = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toUpperCase()
    return normalizedSearch
      ? orders.filter((order) => order.orderId.includes(normalizedSearch))
      : orders
  }, [orders, searchTerm])

  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Hola, {user.displayName ?? user.email}</p>
        <h1>Rastrea tus pedidos.</h1>
        <p className="page-description">Consulta el estado de tus compras o busca un pedido por su código.</p>
      </div>

      <label className="order-search">
        <span className="sr-only">Buscar pedido por código</span>
        <input
          type="search"
          placeholder="Buscar por código, ej. ORD-98421"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>

      {isLoading && <p>Cargando tus pedidos…</p>}
      {loadError && <p className="auth-error">{loadError}</p>}

      {!isLoading && !loadError && filteredOrders.length === 0 && (
        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">＋</span>
          <h2>Todavía no tienes pedidos.</h2>
          <p>Cuando finalices una compra en el carrito, aparecerá aquí.</p>
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="order-list">
          {filteredOrders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-header">
                <strong>{order.orderId}</strong>
                <span className={`order-status order-status-${order.status}`}>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.id}>{item.name} x{item.quantity}</li>
                ))}
              </ul>
              <div className="order-card-footer">
                <span>Total: {formatPrice(order.subtotal)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default OrderTrackerPage
