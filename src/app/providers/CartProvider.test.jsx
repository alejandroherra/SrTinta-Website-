import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCart from '../../presentation/hooks/useCart.js'
import CartProvider from './CartProvider.jsx'

const product = {
  id: 'camiseta-esencial',
  name: 'Camiseta esencial',
  category: 'Prendas personalizadas',
  price: 8500,
  image: 'img.png',
  color: 'verde',
}

function CartProbe() {
  const { items, itemCount, subtotal, addItem, removeItem, setQuantity, clearCart } = useCart()

  return (
    <div>
      <span data-testid="count">{itemCount}</span>
      <span data-testid="subtotal">{subtotal}</span>
      <ul>
        {items.map((item) => <li key={item.id}>{item.name} x{item.quantity}</li>)}
      </ul>
      <button onClick={() => addItem(product)}>add</button>
      <button onClick={() => removeItem(product.id)}>remove</button>
      <button onClick={() => setQuantity(product.id, 5)}>set-five</button>
      <button onClick={clearCart}>clear</button>
    </div>
  )
}

beforeEach(() => {
  window.localStorage.clear()
})

function renderCart() {
  return render(
    <CartProvider>
      <CartProbe />
    </CartProvider>,
  )
}

describe('CartProvider / useCart', () => {
  it('empieza vacío cuando no hay nada guardado en localStorage', () => {
    renderCart()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0')
  })

  it('agrega un producto y acumula cantidad al agregarlo otra vez', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('add'))
    expect(screen.getByText('Camiseta esencial x1')).toBeInTheDocument()
    expect(screen.getByTestId('subtotal')).toHaveTextContent('8500')

    await user.click(screen.getByText('add'))
    expect(screen.getByText('Camiseta esencial x2')).toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('2')
  })

  it('actualiza la cantidad con setQuantity', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('add'))
    await user.click(screen.getByText('set-five'))

    expect(screen.getByText('Camiseta esencial x5')).toBeInTheDocument()
    expect(screen.getByTestId('subtotal')).toHaveTextContent('42500')
  })

  it('elimina el producto cuando removeItem se invoca', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('add'))
    await user.click(screen.getByText('remove'))

    expect(screen.queryByText(/Camiseta esencial/)).not.toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('vacía el carrito con clearCart', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('add'))
    await user.click(screen.getByText('clear'))

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('persiste el carrito en localStorage entre renders', async () => {
    const user = userEvent.setup()
    const { unmount } = renderCart()

    await user.click(screen.getByText('add'))
    unmount()

    renderCart()
    expect(screen.getByText('Camiseta esencial x1')).toBeInTheDocument()
  })

  it('ignora un carrito guardado corrupto y arranca vacío', () => {
    window.localStorage.setItem('srsratinta-cart', '{ esto no es json válido')
    renderCart()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })
})
