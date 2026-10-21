import { m } from 'framer-motion'
import { fadeUp, staggerChildren } from '../../shared/utils/motionVariants.js'

const motionElements = {
  div: m.div,
  section: m.section,
}

function Reveal({
  as = 'div',
  children,
  className,
  stagger = false,
  amount = 0.16,
}) {
  const MotionElement = motionElements[as]

  if (!MotionElement) {
    throw new Error(`Reveal no admite el elemento "${as}".`)
  }

  return (
    <MotionElement
      className={className}
      variants={stagger ? staggerChildren : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionElement>
  )
}

export default Reveal
