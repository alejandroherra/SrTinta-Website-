import { getFirestore } from 'firebase/firestore'
import firebaseApp, { safeInitialize } from './firebaseClient.js'

// Separado de firebaseClient.js a propósito: este módulo solo lo alcanzan
// los repositorios de órdenes (carrito, rastreo de pedidos, panel admin),
// que ya cargan con React.lazy(). Así el SDK de Firestore no viaja en el
// bundle inicial de páginas que no lo necesitan, como Inicio o Tienda.
export const db = safeInitialize(() => getFirestore(firebaseApp), 'Firestore')
