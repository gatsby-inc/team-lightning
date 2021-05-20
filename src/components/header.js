import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"

import * as styles from './header.module.css'

function Header() {
  return (
    <header>
      <h1><StaticImage src="../images/icon.png" alt="Gatsby" /> Gatsby</h1>
    </header>
  )
}

export { Header }