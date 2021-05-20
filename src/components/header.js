import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"

import * as styles from './header.module.css'

function Header() {
  return (
    <header>
      <h1 className={styles.header}>
        <StaticImage src="../images/icon.png" alt="Gatsby" className={styles.logo} /> Gatsby
      </h1>
    </header>
  )
}

export { Header }