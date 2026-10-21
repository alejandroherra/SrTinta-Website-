function LazyImage({
  alt,
  className,
  loading = 'lazy',
  sizes = '(max-width: 900px) 46vw, 280px',
  src,
  srcSet,
  ...imageProps
}) {
  const responsiveSrcSet = srcSet ?? createResponsiveSrcSet(src)

  return (
    <img
      {...imageProps}
      src={src}
      srcSet={responsiveSrcSet}
      sizes={sizes}
      className={className ? `lazy-image ${className}` : 'lazy-image'}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={loading === 'eager' ? 'high' : 'low'}
    />
  )
}

function createResponsiveSrcSet(src) {
  if (!src?.startsWith('https://images.unsplash.com/')) return undefined

  const imageUrl = new URL(src)
  const sourceWidth = Number(imageUrl.searchParams.get('w')) || 1200
  const widths = [320, 480, 640, 900, 1200].filter((width) => width < sourceWidth)

  widths.push(sourceWidth)

  return widths
    .map((width) => {
      const candidateUrl = new URL(imageUrl)
      candidateUrl.searchParams.set('w', String(width))
      candidateUrl.searchParams.set('q', '75')
      return `${candidateUrl.href} ${width}w`
    })
    .join(', ')
}

export default LazyImage
