import { Link } from 'react-router-dom'
import formatPrice from '../../shared/utils/formatPrice.js'
import LazyImage from './LazyImage.jsx'
import useCart from '../hooks/useCart.js'

function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
        <LazyImage className="product-image" src={product.image} alt={product.name} />
        <span className={`product-swatch swatch-${product.color}`} aria-hidden="true" />
      </Link>
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <Link className="product-name" to={`/producto/${product.id}`}>{product.name}</Link>
        <div className="product-buy-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="icon-button" type="button" aria-label={`Agregar ${product.name} al carrito`} onClick={() => addItem(product)}>
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 9H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.3" fill="currentColor" />
      <circle cx="18" cy="20" r="1.3" fill="currentColor" />
    </svg>
  )
}

export default ProductCard
