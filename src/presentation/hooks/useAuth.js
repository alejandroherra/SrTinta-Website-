import { useContext } from 'react'
import AuthContext from '../../app/providers/AuthContext.js'

function useAuth() {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return auth
}

export default useAuth
