import React from "react"
import { SEO } from "../components"
import { Button, Purchase } from "../styles/components"
import { Link } from "gatsby"

export default function gracias() {
  return (
    <div>
      <SEO title="Compra exitosa" />
      <Purchase>
        <h2>Compra exitosa</h2>
        <p>Espero que disfrutes tu swag</p>
        <p>Te esoeramos de vuelta, no pares de aprender</p>
        <span rol="img" aria-label="emoji">
          ❤️
        </span>
        <Link to="/">
          <Button>Volver al catágolo</Button>
        </Link>
      </Purchase>
    </div>
  )
}
