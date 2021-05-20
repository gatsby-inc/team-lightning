import * as React from 'react'
import { Link } from 'gatsby'
import Highlight, { defaultProps } from "prism-react-renderer";
import Okadia from 'prism-react-renderer/themes/okaidia';
import text from '!!raw-loader!../api/social-card.js'

import {main } from "./index.module.css";
import * as styles from './how.module.css'

function How() {
  return (
    <main className={main}>
    <div>
      <Link to="/">Back to the generator</Link>
      <h1>How this was built</h1>
      <h2>Powered by ⚡ Gatsby Cloud Functions</h2>
      <p>We leveraged the dynamic power of Gatsby Cloud Functions to generate an og-image and social sharing cards for our internal Marketing team.</p>
      <h2>Tech stack</h2>
      <p>Quite simple, really! We're using a few tools, notably:</p>
      <ul>
        <li><a href="https://www.npmjs.com/package/jimp"><pre className={styles.pre}>Jimp</pre></a>. An amazing image transformation tool that we use to load in the image, and then position text on the generated image.</li>
        <li><a href="https://www.npmjs.com/package/yup"><pre className={styles.pre}>yup</pre></a>. We leveraged yup to validate the schema and display helpful messages to our consumers of this API.</li>
      </ul>
      <p>We leveraged the dynamic power of Gatsby Cloud Functions to generate an og-image and social sharing cards for our internal Marketing team.</p>

      <h2>The code</h2>
      <p>A simple serverless function at <a href="https://github.com/gatsby-inc/team-lightning/blob/main/src/api/social-card.js"><pre className={styles.pre}>api/social-card.js</pre></a> is all we need to do! The code is as follows:</p>
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