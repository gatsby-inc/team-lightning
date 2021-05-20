import * as React from 'react'

import Highlight, { defaultProps } from "prism-react-renderer";
import Okadia from 'prism-react-renderer/themes/okaidia';
import text from '!!raw-loader!../api/social-card.js'

import {main } from "./index.module.css";
import * as styles from './how.module.css'

function How() {
  return (
    <main className={main}>
    <div>test</div>
    <div>
      <h1>How</h1>
      <h2>Powered by Gatsby Cloud Functions</h2>
      <Highlight {...defaultProps} theme={Okadia} className={styles.code} code={text} language="js">
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
  )
}

export default How