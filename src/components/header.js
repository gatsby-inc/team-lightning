import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import * as styles from "./header.module.css";

function Header() {
  return (
    <header>
      <h1 className={styles.header}>
        <Link to="/" className={styles.link}>
          <StaticImage
            src="../images/icon.png"
            alt="Gatsby logo"
            className={styles.logo}
          />{" "}
          Gatsby
        </Link>
      </h1>
    </header>
  );
}

export { Header };
