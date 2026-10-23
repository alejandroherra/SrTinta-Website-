import createAuthUseCases from '../../application/use-cases/auth/AuthUseCases.js'
import FirebaseAuthRepository from '../../infrastructure/repositories/FirebaseAuthRepository.js'

const authUseCases = createAuthUseCases(new FirebaseAuthRepository())

export const {
  loginWithGoogle,
  loginWithFacebook,
  loginWithEmail,
  signUpWithEmail,
  logout,
  subscribeToAuthChanges,
} = authUseCases

// Correo(s) con acceso al panel de administración. Se admite la cuenta de
// prueba fija pedida para el testeo, además de cualquier correo extra
// configurado en VITE_ADMIN_EMAILS (separados por comas) para no depender
// únicamente de una variable de entorno en despliegues de demostración.
const DEFAULT_ADMIN_EMAILS = ['senoraysenorcafetintacafetinta@gmail.com']

// Correo de la cuenta de administración de demostración, usado por el botón
// de acceso rápido en /login (ver LoginPage.jsx). Se expone aquí para que
// ambos lugares queden sincronizados con una sola fuente de verdad.
export const DEMO_ADMIN_EMAIL = DEFAULT_ADMIN_EMAILS[0]

const extraAdminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

const adminEmails = new Set([...DEFAULT_ADMIN_EMAILS, ...extraAdminEmails])

export function isAdminEmail(email) {
  return Boolean(email) && adminEmails.has(email.toLowerCase())
}
