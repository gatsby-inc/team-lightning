import * as React from "react";
import { Link } from "gatsby";

import Logo from "!!raw-loader!../images/monogram.svg";

import { container } from "./container.module.css";
import * as styles from "./header.module.css";

function Header() {
  return (
    <header className={[container].concat(styles.container).join(" ")}>
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
      <p className={styles.plug}>
        Powered by{" "}
        <a href="https://gatsbyjs.com/functions">
          Gatsby Cloud{" "}
          <span role="img" aria-label="Flash">
            ⚡
          </span>{" "}
          Functions
        </a>
      </p>
    </header>
  );
}

export { Header };
