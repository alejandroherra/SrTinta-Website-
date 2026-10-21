import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../app/services/productCatalog.js'
import { getWhatsAppUrl } from '../../shared/constants/contact.js'
import formatPrice from '../../shared/utils/formatPrice.js'
import LazyImage from '../components/LazyImage.jsx'
import Reveal from '../components/Reveal.jsx'
import useCart from '../hooks/useCart.js'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const { addItem } = useCart()

  if (!product) {
    return (
      <section className="page-container page-content">
        <div className="page-heading">
          <p className="eyebrow">Tienda</p>
          <h1>No encontramos ese producto.</h1>
          <p className="page-description">Puede que ya no esté disponible o que el enlace haya cambiado.</p>
        </div>
        <Link className="button" to="/tienda">Volver a la tienda</Link>
      </section>
    )
  }

  return (
    <section className="page-container page-content">
      <Link className="text-link back-link" to="/tienda">← Volver a la tienda</Link>
      <Reveal className="product-detail">
        <div className="product-detail-image">
          <LazyImage src={product.image} alt={product.name} loading="eager" sizes="(max-width: 680px) 90vw, 50vw" />
          <span className="sample-notice">Producto de muestra</span>
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="page-description">{product.description}</p>
          <p className="detail-disclaimer">Precio de demostración. Las opciones, disponibilidad y precio final se confirman al cotizar.</p>
          <button className="button" type="button" onClick={() => addItem(product)}>Agregar al carrito <span aria-hidden="true">＋</span></button>
          <a className="text-link detail-wa" href={getWhatsAppUrl(`Hola, quisiera consultar por ${product.name}.`)} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a>
        </div>
      </Reveal>
    </section>
  )
}

export default ProductDetailPage
