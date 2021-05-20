import * as React from "react";
import { Link } from "gatsby";
import Logo from "!!raw-loader!../images/monogram.svg";

import * as styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>
        <Link to="/" className={styles.link}>
          <span
            className={styles.logo}
            dangerouslySetInnerHTML={{
              __html: Logo,
            }}
          />{" "}
          Image Generator
        </Link>
      </h1>
    </header>
  );
}

export { Header };
