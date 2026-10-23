import { getWhatsAppUrl } from './contact.js'

describe('getWhatsAppUrl', () => {
  it('usa un mensaje por defecto cuando no se pasa ninguno', () => {
    const url = getWhatsAppUrl()
    expect(url).toContain('https://wa.me/')
    expect(url).toContain('text=')
  })

  it('codifica el mensaje personalizado en la URL', () => {
    const url = getWhatsAppUrl('Hola & gracias')
    expect(url).toContain(encodeURIComponent('Hola & gracias'))
  })

  it('apunta al destinatario genérico cuando no hay teléfono configurado', () => {
    const url = getWhatsAppUrl('hola')
    expect(url.startsWith('https://wa.me/?text=')).toBe(true)
  })
})
