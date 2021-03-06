import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Button, StyledCart } from "../styles/components"
import priceFormat from "../utils/priceFormat"
import { CartContext } from "../context"

export default function Cart() {
  const { cart } = useContext(CartContext)
  const [total, setTotal] = useState(0)
  const [stripe, setStripe] = useState()

  const getTotal = () => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + current.unit_amount * current.quantity,
        0
      )
    )
  }

  useEffect(() => {
    setStripe(window.Stripe(process.env.STRIPE_PK))
    getTotal()
  }, [])

  const handleBuy = async event => {
    event.preventDefault()
    let item = cart.map(({ id, quantity }) => ({
      price: id,
      quantity: quantity,
    }))

    const { error } = await stripe.redirectToCheckout({
      lineItems: item,
      mode: "payment",
      successUrl: process.env.SUCCESS_REDIRECT,
      cancelUrl: process.env.CANCEL_REDIRECT,
    })
    if (error) {
      throw error
    }
  }

  return (
    <>
      <StyledCart>
        <h2>Carrito de compras</h2>
        <table>
          <tbody>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.metadata.img} alt={item.name} />
                </td>
                <td>USD {priceFormat(item.unit_amount)} </td>
                <td>{item.quantity}</td>
                <td>{priceFormat(item.quantity * item.unit_amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <div>
            <h3>Subtotal: </h3>
            <small>USD {priceFormat(total)}</small>
          </div>
          <div>
            <Link to="/">
              <Button type="outline">Volver</Button>
            </Link>
            <Button onClick={handleBuy} disabled={cart.length === 0}>
              Comprar
            </Button>
          </div>
        </nav>
      </StyledCart>
    </>
  )
}
