import { render, screen } from '@testing-library/react'
import WhatsAppButton from './WhatsAppButton.jsx'

describe('WhatsAppButton', () => {
  it('renderiza un enlace flotante hacia WhatsApp que abre en una pestaña nueva', () => {
    render(<WhatsAppButton />)

    const link = screen.getByRole('link', { name: /Escríbenos por WhatsApp/ })
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })
})
