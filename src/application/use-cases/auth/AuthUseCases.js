function createAuthUseCases(authRepository) {
  return {
    loginWithGoogle: () => authRepository.loginWithGoogle(),
    loginWithFacebook: () => authRepository.loginWithFacebook(),
    loginWithEmail: (email, password) => authRepository.loginWithEmail(email, password),
    signUpWithEmail: (email, password, displayName) => authRepository.signUpWithEmail(email, password, displayName),
    logout: () => authRepository.logout(),
    subscribeToAuthChanges: (callback) => authRepository.onAuthStateChanged(callback),
  }
}

export default createAuthUseCases
