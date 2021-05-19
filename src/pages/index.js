import * as React from "react"
import debounce from 'debounce';

import { Copy } from '../components/copy/copy'

import * as styles from './index.module.css'

const getUrl = version => {
  let base = `https://teamlightning.gatsbyjs.io`
  if (process.env.NODE_ENV === 'development') {
    base = `http://localhost:8000`
  }
  return `${base}/api/social-card?text=${version}`
}


// markup
const IndexPage = () => {
  const [version, setVersion] = React.useState('')
  const [imageVersion, setImageVersion] = React.useState('')
  const url = getUrl(version)

  const requestImage = React.useCallback(debounce((e) => {
    setImageVersion(e.target.value)
  }, 300), []);

  const onChange = React.useCallback(e => {
    setVersion(e.target.value)
    requestImage(e.target.value)
  }, [])
  
  return (
    <main className={styles.main}>
        <input className={styles.input} placeholder="Input a version number (e.g. 3.5)" onChange={onChange} />
        <div className={styles.url}>
          <input className={[styles.input].concat(styles.urlInput).join(' ')} readOnly={true} value={url} />
          <Copy className={styles.copy} content={url} />
        </div>
        {/* <input type="submit" className={styles.button} /> */}
        <img className={styles.image} src={`/api/social-card?text=${imageVersion}`} />
    </main>
  )
}

export default IndexPage
