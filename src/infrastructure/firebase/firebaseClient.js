import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'

// Firestore se inicializa aparte, en ./firebaseFirestoreClient.js. Mantenerlo
// fuera de este archivo es lo que permite que Vite separe el SDK de
// Firestore (el más pesado de toda la app) del bundle inicial: este archivo
// lo importa FirebaseAuthRepository, que se usa en cada página; Firestore
// solo lo necesitan el carrito, el rastreo de pedidos y el panel admin, que
// ya cargan con React.lazy().

// Toda la configuración viene de variables de entorno de Vite para no exponer
// claves directamente en el código fuente versionado.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

// getAuth valida la apiKey de inmediato y lanza si falta o es inválida.
// Se atrapa aquí para que el resto del sitio (tienda, servicios, etc.)
// siga funcionando sin Firebase configurado; solo las acciones que
// realmente lo necesitan (login, checkout, rastreo) fallarán de forma
// controlada en vez de romper la carga de toda la aplicación.
function safeInitialize(factory, label) {
  try {
    return factory()
  } catch (error) {
    console.error(`Firebase no pudo inicializar ${label}. Revisa las variables VITE_FIREBASE_* en tu .env.`, error)
    return null
  }
}

export const auth = safeInitialize(() => getAuth(firebaseApp), 'Authentication')
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

export { safeInitialize }
export default firebaseApp
