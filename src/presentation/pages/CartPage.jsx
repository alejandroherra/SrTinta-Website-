import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../../shared/constants/contact.js'
import formatPrice from '../../shared/utils/formatPrice.js'
import LazyImage from '../components/LazyImage.jsx'
import Reveal from '../components/Reveal.jsx'
import useCart from '../hooks/useCart.js'

function CartPage() {
  const { items, subtotal, removeItem, setQuantity } = useCart()
  const orderMessage = [
    'Hola, quiero consultar este pedido:',
    ...items.map((item) => `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`),
    `Subtotal de referencia: ${formatPrice(subtotal)}`,
  ].join('\n')

  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Tu selección</p>
        <h1>Carrito.</h1>
        <p className="page-description">Revisa tus productos y ajusta las cantidades antes de consultar tu pedido.</p>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">＋</span>
          <h2>Tu carrito está esperando ideas.</h2>
          <p>Cuando encuentres algo que te guste, agrégalo aquí.</p>
          <Link className="button" to="/tienda">Explorar tienda</Link>
        </div>
      ) : (
        <Reveal className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <LazyImage src={item.image} alt="" sizes="80px" />
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
            <p className="summary-note">El subtotal es una referencia para productos de muestra. Precio final y entrega se confirman por WhatsApp.</p>
            <a className="button cart-checkout" href={getWhatsAppUrl(orderMessage)} target="_blank" rel="noreferrer">Consultar pedido por WhatsApp <span aria-hidden="true">↗</span></a>
            <Link className="text-link continue-shopping" to="/tienda">Seguir explorando</Link>
          </aside>
        </Reveal>
      )}
    </section>
  )
}

export default CartPage
