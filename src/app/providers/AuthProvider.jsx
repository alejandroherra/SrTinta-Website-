import { useEffect, useMemo, useState } from 'react'
import {
  isAdminEmail,
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogle,
  logout,
  signUpWithEmail,
  subscribeToAuthChanges,
} from '../services/authGateway.js'
import AuthContext from './AuthContext.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // onAuthStateChanged es la única fuente de verdad de la sesión: se
    // suscribe una vez al montar el proveedor y se desuscribe al desmontarlo.
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    isAdmin: isAdminEmail(user?.email),
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    signUpWithEmail,
    logout,
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
