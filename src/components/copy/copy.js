import React from 'react';
import PropTypes from 'prop-types';
import { IoMdCopy } from 'react-icons/io';

import { copyToClipboard } from '../../utils/copy-to-clipboard';
import * as styles from './copy.module.css';

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

function Copy({
  className,
  content,
  icon = true,
  duration = 5000,
  fileName = '',
  trim = false,
}) {
  const [copied, setCopied] = React.useState(false);

  const label = copied
    ? `${fileName ? fileName + ` ` : ``}copied to clipboard`
    : `${fileName ? fileName + `: ` : ``}copy code to clipboard`;

  return (
    <button
      name={label}
      className={[styles.button].concat(className).join(' ')}
      disabled={copied}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content);

        setCopied(true);

        await delay(duration);

        setCopied(false);
      }}
    >
      {copied ? `Copied` : `Copy`}
      {icon && <IoMdCopy />}
      <span className="sr-only" aria-roledescription="status">
        {label}
      </span>
    </button>
  );
}

Copy.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trim: PropTypes.bool,
};

export { Copy };
