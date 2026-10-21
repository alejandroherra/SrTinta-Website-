import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

function AboutPage() {
  return (
    <>
      <Reveal as="section" className="about-hero">
        <div className="page-container about-hero-grid">
          <div className="page-heading">
            <p className="eyebrow">Familia, oficio y creatividad</p>
            <h1>Un taller hecho con las manos y el corazón.</h1>
          </div>
          <div className="about-hero-note">
            <span className="about-year">Desde<br />2019</span>
            <p>Seis años transformando ideas en prendas que se sienten tan únicas como quienes las llevan.</p>
          </div>
        </div>
      </Reveal>
      <Reveal as="section" className="page-container about-story">
        <div className="about-story-aside">
          <p className="eyebrow">Nuestra historia</p>
          <span className="story-number">01—03</span>
        </div>
        <div className="about-story-copy">
          <p>Sr&amp;Sra Tinta es un taller dedicado al estampado serigráfico. Combinando técnicas artesanales con tecnología en diseño digital, se logra un estampado con acabado durable, vistoso y de insuperable calidad que a través de los años sigue siendo utilizado por las grandes marcas de la industria como Nike, Adidas, entre otras, eligiendo la técnica de serigrafía hoy día aun al pasar del tiempo y la historia.</p>
          <p>Apasionados desde noviembre de 2019 por esta forma de arte, decidimos iniciar un emprendimiento familiar donde todos apoyamos, hasta la pequeñita de la casa.</p>
          <p>Hoy día logramos estructurar el negocio y ya son 6 años dando servicio y creando confianza en los clientes, además de fortalecer el servicio por medio de capacitaciones, cursos e inversiones de equipo.</p>
          <p>Por eso, José Miguel Barquero y Hannia Quirós, orgullosamente Sr&amp;Sra Tinta, los invitamos a conocer más de nuestros productos y servicios. Será un gusto atenderles.</p>
          <div className="signature">José Miguel &amp; Hannia <span>Sr&amp;Sra Tinta</span></div>
          <Link className="button" to="/contacto">Conversemos <span aria-hidden="true">↗</span></Link>
        </div>
      </Reveal>
    </>
  )
}

export default AboutPage
