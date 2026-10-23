import { useEffect, useState } from 'react'
import { subscribeToAllOrders, updateOrderStatus } from '../../../app/services/orderCatalog.js'
import { ORDER_STATUS_LABELS, getNextOrderStatus } from '../../../domain/entities/order.js'
import formatPrice from '../../../shared/utils/formatPrice.js'

// Panel administrativo de testeo: lista en tiempo real todas las órdenes y
// permite avanzar su estado logístico (procesando → enviado → entregado).
function AdminOrdersPanel() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [updatingOrderId, setUpdatingOrderId] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToAllOrders(
      (allOrders) => {
        setOrders(allOrders)
        setIsLoading(false)
      },
      () => {
        setLoadError('No se pudo cargar el listado global de órdenes.')
        setIsLoading(false)
      },
    )

    return unsubscribe
  }, [])

  async function handleAdvanceStatus(order) {
    const nextStatus = getNextOrderStatus(order.status)
    if (!nextStatus) return

    setUpdatingOrderId(order.orderId)
    const { success } = await updateOrderStatus(order.orderId, nextStatus)
    setUpdatingOrderId(null)

    if (!success) {
      setLoadError(`No se pudo actualizar el pedido ${order.orderId}.`)
    }
  }

  if (isLoading) {
    return <p>Cargando órdenes…</p>
  }

  return (
    <div className="admin-orders-panel">
      {loadError && <p className="auth-error">{loadError}</p>}

      {orders.length === 0 ? (
        <p>Todavía no hay órdenes registradas.</p>
      ) : (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const nextStatus = getNextOrderStatus(order.status)

                return (
                  <tr key={order.id}>
                    <td>{order.orderId}</td>
                    <td>
                      {order.userName}
                      <span className="order-user-email">{order.userEmail}</span>
                    </td>
                    <td>{formatPrice(order.subtotal)}</td>
                    <td>
                      <span className={`order-status order-status-${order.status}`}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td>
                      {nextStatus ? (
                        <button
                          type="button"
                          className="button button-light"
                          disabled={updatingOrderId === order.orderId}
                          onClick={() => handleAdvanceStatus(order)}
                        >
                          {updatingOrderId === order.orderId
                            ? 'Actualizando…'
                            : `Marcar como ${ORDER_STATUS_LABELS[nextStatus]}`}
                        </button>
                      ) : (
                        <span className="order-complete-note">Completado</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminOrdersPanel
