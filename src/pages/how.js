import * as React from "react";

import Highlight, { defaultProps } from "prism-react-renderer";
import Okadia from "prism-react-renderer/themes/okaidia";
import text from "!!raw-loader!../api/social-card.js";

import { main, uiWrapper, resultWrapper } from "./index.module.css";
import { Header } from "../components/header";

import * as styles from "./how.module.css";

function How() {
  return (
    <>
      <Header />
      <main className={main}>
        <div className={uiWrapper}>
          <p>
            Can you send me an invite? crisp ppt tread it daily crank this out
            sorry i was triple muted sorry i didn't get your email come up with
            something buzzworthy. Beef up. Customer centric manage expectations
            marketing computer development html roi feedback team website. It's
            a simple lift and shift job paddle on both sides, yet pushback
            define the underlying principles that drive decisions and strategy
            for your design language for thinking outside the box put it on the
            parking lot value prop.
          </p>
        </div>
        <div className={resultWrapper}>
          <h1>How</h1>
          <h2>Powered by Gatsby Cloud Functions</h2>
          <Highlight
            {...defaultProps}
            theme={Okadia}
            className={styles.code}
            code={text}
            language="js"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </main>
    </>
  );
}

export default How;
