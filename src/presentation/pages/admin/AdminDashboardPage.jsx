import { Link } from 'react-router-dom'

function AdminDashboardPage() {
  return (
    <section className="page-content">
      <div className="page-heading">
        <p className="eyebrow">Sr&Sra Tinta · Módulo privado</p>
        <h1>Panel de administración</h1>
        <p className="page-description">
          La base del área administrativa queda separada de la experiencia de tienda.
          En una siguiente fase se conectarán la gestión de productos, servicios,
          galería y preguntas frecuentes.
        </p>
      </div>
      <div className="placeholder-panel">
        <p>El panel todavía no tiene autenticación ni administración de contenido. Esas funciones se incorporarán en la fase 5.</p>
        <p className="page-action"><Link className="button button-light" to="/">Volver al sitio</Link></p>
      </div>
    </section>
  )
}

export default AdminDashboardPage
