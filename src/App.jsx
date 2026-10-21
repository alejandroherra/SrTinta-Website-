import { LazyMotion, MotionConfig } from 'framer-motion'
import AppRouter from './app/routes/AppRouter.jsx'
import './App.css'

const loadMotionFeatures = () => import('./shared/utils/motionFeatures.js').then((module) => module.default)

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <AppRouter />
      </LazyMotion>
    </MotionConfig>
  )
}

export default App
