import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'

function PageA() {
  return (
    <div>
      <h1>Página A</h1>
      <Link to="/b">Ir a B</Link>
    </div>
  )
}

function PageB() {
  return <h1>Página B</h1>
}

function TestApp() {
  return (
    <MemoryRouter initialEntries={['/a']}>
      <ScrollToTop />
      <Routes>
        <Route path="/a" element={<PageA />} />
        <Route path="/b" element={<PageB />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ScrollToTop', () => {
  it('lleva el scroll al inicio apenas cambia la ruta', async () => {
    const user = userEvent.setup()
    render(<TestApp />)

    window.scrollTo.mockClear()

    await user.click(screen.getByText('Ir a B'))

    expect(await screen.findByText('Página B')).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })
  })

  it('también se ejecuta al montar en la ruta inicial', () => {
    render(<TestApp />)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })
  })
})
