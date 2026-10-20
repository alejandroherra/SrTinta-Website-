import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page-container not-found">
      <p className="eyebrow">Esta página no está estampada</p>
      <h1>404</h1>
      <p>No encontramos lo que buscas. Volvamos al taller.</p>
      <Link className="button" to="/">Ir al inicio</Link>
    </section>
  )
}

export default NotFoundPage
