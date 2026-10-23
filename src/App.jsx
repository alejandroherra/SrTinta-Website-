import { MotionConfig } from 'framer-motion'
import AppRouter from './app/routes/AppRouter.jsx'
import './App.css'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppRouter />
    </MotionConfig>
  )
}

export default App
