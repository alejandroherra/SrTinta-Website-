import { Link } from 'react-router-dom'
import { getProducts } from '../../app/services/productCatalog.js'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'

const products = getProducts()

function ShopPage() {
  return (
    <section className="page-container page-content">
      <div className="shop-intro">
        <div className="page-heading">
          <p className="eyebrow">Piezas hechas para acompañarte</p>
          <h1>La tienda del taller.</h1>
          <p className="page-description">Explora una pequeña selección de productos de muestra. Agrega tus favoritos al carrito y arma tu pedido.</p>
        </div>
        <span className="sample-notice">Catálogo de demostración</span>
      </div>
      <Reveal className="product-grid" stagger>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </Reveal>
      <div className="shop-bottom">
        <p>¿Buscas algo personalizado para tu marca o equipo?</p>
        <Link className="button button-light" to="/contacto">Cuéntanos tu idea <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

export default ShopPage
