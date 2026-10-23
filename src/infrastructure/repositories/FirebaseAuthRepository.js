import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import AuthRepository from '../../domain/repositories/AuthRepository.js'
import { auth, facebookProvider, googleProvider } from '../firebase/firebaseClient.js'

// Firebase lanza códigos técnicos en inglés; los traducimos a los mensajes
// que de verdad le sirven a quien está llenando el formulario.
const EMAIL_AUTH_ERROR_MESSAGES = {
  'auth/invalid-email': 'Ese correo no parece válido.',
  'auth/missing-password': 'Escribe tu contraseña.',
  'auth/user-disabled': 'Esta cuenta fue deshabilitada.',
  'auth/user-not-found': 'No encontramos una cuenta con ese correo.',
  'auth/wrong-password': 'La contraseña no es correcta.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo. Intenta iniciar sesión.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento e intenta de nuevo.',
}

function toFriendlyMessage(error) {
  return EMAIL_AUTH_ERROR_MESSAGES[error.code] ?? 'Algo salió mal. Intenta de nuevo.'
}

// Adaptador que traduce el contrato de AuthRepository a llamadas concretas
// del SDK de Firebase Auth. Las funciones públicas nunca lanzan: devuelven
// { success, user, error } para que la capa de presentación no necesite try/catch.
class FirebaseAuthRepository extends AuthRepository {
  async loginWithGoogle() {
    return this.#loginWithPopup(googleProvider)
  }

  async loginWithFacebook() {
    return this.#loginWithPopup(facebookProvider)
  }

  async #loginWithPopup(provider) {
    try {
      const credential = await signInWithPopup(auth, provider)
      return { success: true, user: credential.user, error: null }
    } catch (error) {
      console.error('Falló el inicio de sesión con proveedor externo.', error)
      return { success: false, user: null, error: error.message }
    }
  }

  async loginWithEmail(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: credential.user, error: null, code: null }
    } catch (error) {
      console.error('Falló el inicio de sesión con correo.', error)
      return { success: false, user: null, error: toFriendlyMessage(error), code: error.code }
    }
  }

  async signUpWithEmail(email, password, displayName) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)

      if (displayName) {
        await updateProfile(credential.user, { displayName })
      }

      return { success: true, user: credential.user, error: null, code: null }
    } catch (error) {
      console.error('Falló el registro con correo.', error)
      return { success: false, user: null, error: toFriendlyMessage(error), code: error.code }
    }
  }

  async logout() {
    try {
      await signOut(auth)
      return { success: true, error: null }
    } catch (error) {
      console.error('Falló el cierre de sesión.', error)
      return { success: false, error: error.message }
    }
  }

  onAuthStateChanged(callback) {
    if (!auth) {
      callback(null)
      return () => {}
    }

    return onAuthStateChanged(auth, callback)
  }
}

export default FirebaseAuthRepository
