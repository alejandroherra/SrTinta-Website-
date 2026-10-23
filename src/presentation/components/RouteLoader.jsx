import { motion } from 'framer-motion'

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-label="Cargando contenido">
      <motion.span
        className="route-loader-dot"
        animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="route-loader-dot"
        animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
      />
      <motion.span
        className="route-loader-dot"
        animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </div>
  )
}

export default RouteLoader
