import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../../shared/constants/contact.js'

function QrPage() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState('')
  const siteUrl = window.location.origin

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setCopyError('')
    } catch (error) {
      console.error('No se pudo copiar el enlace del sitio.', error)
      setCopied(false)
      setCopyError('No fue posible copiarlo desde este navegador. Puedes copiar el enlace de arriba manualmente.')
    }
  }

  return (
    <section className="page-container page-content qr-page">
      <div className="page-heading">
        <p className="eyebrow">Siempre cerca</p>
        <h1>Escanea, explora, conversemos.</h1>
        <p className="page-description">Comparte el sitio del taller o encuentra rápido lo que necesitas.</p>
      </div>
      <div className="qr-layout">
        <div className="qr-card">
          <div className="qr-code"><QRCodeSVG value={siteUrl} size={220} level="H" includeMargin /></div>
          <span className="product-category">Sitio web Sr&amp;Sra Tinta</span>
          <strong className="qr-url">{siteUrl}</strong>
          <button className="text-link copy-link" type="button" onClick={copyUrl}>{copied ? 'Enlace copiado ✓' : 'Copiar enlace'}</button>
          {copyError && <p className="qr-copy-error" role="status">{copyError}</p>}
        </div>
        <div className="quick-links">
          <h2>Accesos rápidos</h2>
          <Link className="quick-link-card" to="/tienda"><span>01</span><strong>Explorar la tienda</strong><b aria-hidden="true">↗</b></Link>
          <Link className="quick-link-card" to="/servicios"><span>02</span><strong>Ver servicios</strong><b aria-hidden="true">↗</b></Link>
          <Link className="quick-link-card" to="/galeria"><span>03</span><strong>Galería de trabajos</strong><b aria-hidden="true">↗</b></Link>
          <a className="quick-link-card" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><span>04</span><strong>Escribir por WhatsApp</strong><b aria-hidden="true">↗</b></a>
          <Link className="quick-link-card" to="/contacto"><span>05</span><strong>Ubicación y contacto</strong><b aria-hidden="true">↗</b></Link>
        </div>
      </div>
    </section>
  )
}

export default QrPage
