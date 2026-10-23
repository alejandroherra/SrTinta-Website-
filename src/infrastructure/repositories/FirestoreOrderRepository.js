import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import OrderRepository from '../../domain/repositories/OrderRepository.js'
import { db } from '../firebase/firebaseFirestoreClient.js'

const ORDERS_COLLECTION = 'orders'

// Adaptador que traduce el contrato de OrderRepository a Firestore. El orderId
// generado en el dominio se reutiliza como id de documento para poder
// rastrear una orden directamente por ese código.
class FirestoreOrderRepository extends OrderRepository {
  async create(order) {
    const orderRef = doc(db, ORDERS_COLLECTION, order.orderId)

    await setDoc(orderRef, {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return order
  }

  async findById(orderId) {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId)
    const snapshot = await getDoc(orderRef)

    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  }

  // Escucha en tiempo real las órdenes de un usuario específico, ordenadas
  // de la más reciente a la más antigua. Devuelve la función para desuscribirse.
  subscribeToUserOrders(userId, onChange, onError) {
    if (!db) {
      onError?.(new Error('Firestore no está configurado.'))
      return () => {}
    }

    const ordersQuery = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    )

    return onSnapshot(
      ordersQuery,
      (snapshot) => onChange(mapOrderDocs(snapshot)),
      (error) => {
        console.error('Falló la suscripción a las órdenes del usuario.', error)
        onError?.(error)
      },
    )
  }

  // Igual que la anterior, pero sin filtro: uso exclusivo del panel de administración.
  subscribeToAllOrders(onChange, onError) {
    if (!db) {
      onError?.(new Error('Firestore no está configurado.'))
      return () => {}
    }

    const ordersQuery = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'))

    return onSnapshot(
      ordersQuery,
      (snapshot) => onChange(mapOrderDocs(snapshot)),
      (error) => {
        console.error('Falló la suscripción al listado global de órdenes.', error)
        onError?.(error)
      },
    )
  }

  async updateStatus(orderId, status) {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId)
    await updateDoc(orderRef, { status, updatedAt: serverTimestamp() })
  }
}

function mapOrderDocs(snapshot) {
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }))
}

export default FirestoreOrderRepository
