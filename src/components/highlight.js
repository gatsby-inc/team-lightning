import * as React from "react";

import Highlight, { defaultProps } from "prism-react-renderer";
import Okadia from "prism-react-renderer/themes/okaidia";

import { Copy } from './copy/copy'
import * as styles from './highlight.module.css'

function Highlighter({ code, language = "js", ...props }) {
  return (
    <Highlight
      {...defaultProps}
      theme={Okadia}
      code={code}
      language={language}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.highlight}>
          <pre
            className={[className].concat(styles.pre).join(' ')}
            style={style}
          >
            <Copy className={styles.copy} />
            <code className={styles.code}>{tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}</code>
          </pre>
        </div>
      )}
    </Highlight>
  );
}

export { Highlighter as Highlight };
