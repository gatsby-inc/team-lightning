import * as React from "react";

import Highlight, { defaultProps } from "prism-react-renderer";
import Theme from "prism-react-renderer/themes/shadesOfPurple";

function Highlighter({ code, language = "js", ...props }) {
  return (
    <Highlight
      {...defaultProps}
      theme={Theme}
      code={code}
      language={language}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: `var(--space-2xl)`,
            borderRadius: `var(--radius-md)`,
          }}
        >
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
  );
}

export { Highlighter as Highlight };
