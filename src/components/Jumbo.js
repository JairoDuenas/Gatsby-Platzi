import React from "react"
import { StyledJumbo } from "../styles/components"
import Image from "./image"

export default function Jumbo({ description }) {
  return (
    <StyledJumbo>
      <div>
        <h2>!Consigues el mejor swag exclusivo y especial de Platzi </h2>
        <small>{description}</small>
      </div>
      <Image name="icon" />
    </StyledJumbo>
  )
}
