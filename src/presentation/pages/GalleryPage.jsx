import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  { title: 'Color para todos los días', category: 'Serigrafía', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Una puntada con identidad', category: 'Bordado', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Tu marca, en movimiento', category: 'Marcas', image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Esenciales para llevar', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Hecho para el equipo', category: 'Serigrafía', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Detalles que cuentan', category: 'Bordado', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=85' },
]

const filters = ['Todos', 'Serigrafía', 'Bordado', 'Marcas', 'Accesorios']

function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const visibleProjects = useMemo(() => (
    activeFilter === 'Todos'
      ? projects
      : projects.filter((project) => project.category === activeFilter)
  ), [activeFilter])

  return (
    <section className="page-container page-content">
      <div className="page-heading">
        <p className="eyebrow">Ideas que ya tomaron forma</p>
        <h1>Hecho en el taller.</h1>
        <p className="page-description">Una mirada a las prendas, detalles y proyectos que hemos creado.</p>
      </div>
      <div className="gallery-filters" role="group" aria-label="Filtrar trabajos por categoría">
        {filters.map((filter) => (
          <button
            className={`filter-button${activeFilter === filter ? ' is-active' : ''}`}
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {visibleProjects.map((project, index) => (
          <article className={`gallery-card gallery-card-${index % 3}`} key={project.title}>
            <img src={project.image} alt={project.title} loading="lazy" />
            <div className="gallery-overlay">
              <span>{project.category}</span>
              <h2>{project.title}</h2>
            </div>
          </article>
        ))}
      </div>
      <div className="gallery-cta">
        <p>¿Te gustaría ver tu idea aquí?</p>
        <Link className="button" to="/contacto">Hagámosla realidad <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

export default GalleryPage
