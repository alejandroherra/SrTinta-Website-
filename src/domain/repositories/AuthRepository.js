class AuthRepository {
  loginWithGoogle() {
    throw new Error('AuthRepository.loginWithGoogle debe ser implementado por un adaptador.')
  }

  loginWithFacebook() {
    throw new Error('AuthRepository.loginWithFacebook debe ser implementado por un adaptador.')
  }

  loginWithEmail() {
    throw new Error('AuthRepository.loginWithEmail debe ser implementado por un adaptador.')
  }

  signUpWithEmail() {
    throw new Error('AuthRepository.signUpWithEmail debe ser implementado por un adaptador.')
  }

  logout() {
    throw new Error('AuthRepository.logout debe ser implementado por un adaptador.')
  }

  onAuthStateChanged() {
    throw new Error('AuthRepository.onAuthStateChanged debe ser implementado por un adaptador.')
  }
}

export default AuthRepository
