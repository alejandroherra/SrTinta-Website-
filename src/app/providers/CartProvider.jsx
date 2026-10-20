import { useEffect, useMemo, useReducer } from 'react'
import CartContext from './CartContext.js'

const STORAGE_KEY = 'srsratinta-cart'

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(STORAGE_KEY)
    const parsedCart = storedCart ? JSON.parse(storedCart) : []

    if (!Array.isArray(parsedCart)) {
      throw new TypeError('El contenido guardado del carrito no es una lista.')
    }

    return parsedCart.filter((item) => (
      item
      && typeof item.id === 'string'
      && typeof item.name === 'string'
      && Number.isFinite(item.price)
      && Number.isInteger(item.quantity)
      && item.quantity > 0
    ))
  } catch (error) {
    console.error('No se pudo recuperar el carrito guardado.', error)
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existingItem = state.find((item) => item.id === action.product.id)

      if (existingItem) {
        return state.map((item) => (
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }

      return [...state, { ...action.product, quantity: 1 }]
    }
    case 'remove':
      return state.filter((item) => item.id !== action.productId)
    case 'set-quantity':
      if (action.quantity < 1) {
        return state.filter((item) => item.id !== action.productId)
      }
      return state.map((item) => (
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      ))
    case 'clear':
      return []
    default:
      return state
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readStoredCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('No se pudo guardar el carrito en este dispositivo.', error)
    }
  }, [items])

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem: (product) => dispatch({ type: 'add', product }),
    removeItem: (productId) => dispatch({ type: 'remove', productId }),
    setQuantity: (productId, quantity) => dispatch({
      type: 'set-quantity',
      productId,
      quantity: Number(quantity),
    }),
    clearCart: () => dispatch({ type: 'clear' }),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
