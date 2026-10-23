jest.mock('../firebase/firebaseClient.js', () => ({
  auth: { currentUser: null },
  googleProvider: { providerId: 'google.com' },
  facebookProvider: { providerId: 'facebook.com' },
}))

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}))

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import FirebaseAuthRepository from './FirebaseAuthRepository.js'

describe('FirebaseAuthRepository', () => {
  let repository

  beforeEach(() => {
    repository = new FirebaseAuthRepository()
    jest.clearAllMocks()
  })

  it('loginWithEmail devuelve el usuario cuando Firebase responde bien', async () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: { uid: '1', email: 'ana@example.com' } })

    const result = await repository.loginWithEmail('ana@example.com', 'secreta123')

    expect(result).toEqual({ success: true, user: { uid: '1', email: 'ana@example.com' }, error: null, code: null })
  })

  it('loginWithEmail traduce el código de error de Firebase a un mensaje amigable', async () => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/wrong-password' })

    const result = await repository.loginWithEmail('ana@example.com', 'mala-clave')

    expect(result.success).toBe(false)
    expect(result.error).toBe('La contraseña no es correcta.')
    expect(result.code).toBe('auth/wrong-password')
  })

  it('loginWithEmail usa un mensaje genérico para códigos desconocidos', async () => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/algo-raro' })

    const result = await repository.loginWithEmail('ana@example.com', 'clave')

    expect(result.error).toBe('Algo salió mal. Intenta de nuevo.')
  })

  it('signUpWithEmail crea la cuenta y actualiza el nombre si se proporciona', async () => {
    const user = { uid: '2', email: 'nueva@example.com' }
    createUserWithEmailAndPassword.mockResolvedValue({ user })

    const result = await repository.signUpWithEmail('nueva@example.com', 'secreta123', 'Nueva Usuaria')

    expect(updateProfile).toHaveBeenCalledWith(user, { displayName: 'Nueva Usuaria' })
    expect(result).toEqual({ success: true, user, error: null, code: null })
  })

  it('signUpWithEmail no llama updateProfile si no se da nombre', async () => {
    const user = { uid: '3', email: 'sin-nombre@example.com' }
    createUserWithEmailAndPassword.mockResolvedValue({ user })

    await repository.signUpWithEmail('sin-nombre@example.com', 'secreta123')

    expect(updateProfile).not.toHaveBeenCalled()
  })

  it('signUpWithEmail traduce el error de correo ya registrado', async () => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' })

    const result = await repository.signUpWithEmail('ana@example.com', 'secreta123')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Ya existe una cuenta con ese correo. Intenta iniciar sesión.')
  })

  it('logout delega en signOut y responde success cuando todo va bien', async () => {
    signOut.mockResolvedValue(undefined)

    const result = await repository.logout()

    expect(signOut).toHaveBeenCalled()
    expect(result).toEqual({ success: true, error: null })
  })
})
