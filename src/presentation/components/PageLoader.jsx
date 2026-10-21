function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader-mark" aria-hidden="true" />
      <span>Preparando el taller…</span>
    </div>
  )
}

export default PageLoader
