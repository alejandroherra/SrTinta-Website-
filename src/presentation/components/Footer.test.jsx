import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer.jsx'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

describe('Footer', () => {
  it('muestra la marca y los enlaces de navegación secundaria', () => {
    renderFooter()

    expect(screen.getByText('Sr&Sra Tinta')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Preguntas frecuentes' })).toHaveAttribute('href', '/preguntas-frecuentes')
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/contacto')
    expect(screen.getByRole('link', { name: 'QR y menú rápido' })).toHaveAttribute('href', '/qr')
    expect(screen.getByRole('link', { name: 'Administración' })).toHaveAttribute('href', '/admin')
  })
})
