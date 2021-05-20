import * as React from "react";
import debounce from "debounce";

import { Copy } from "../components/copy/copy";

import * as styles from "./index.module.css";

const getUrl = (version, social) => {
  let base = `https://teamlightning.gatsbyjs.io`;
  if (process.env.NODE_ENV === "development") {
    base = `http://localhost:8000`;
  }
  return `${base}/api/social-card?text=${version}&social=${social}`;
};

// markup
const IndexPage = () => {
  const [version, setVersion] = React.useState("");
  const [activeSocial, setActiveSocial] = React.useState("twitter");
  const [imageVersion, setImageVersion] = React.useState("");
  const url = getUrl(version, activeSocial);

  const requestImage = React.useCallback(
    debounce((value) => {
      setImageVersion(value);
    }, 300),
    []
  );

  const onChange = React.useCallback((e) => {
    setVersion(e.target.value);
    requestImage(e.target.value);
  }, []);

  const selectSocial = React.useCallback((e) => {
    setActiveSocial(e.target.value);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.uiWrapper}>
        <input
          className={styles.input}
          placeholder="Input a version number (e.g. 3.5)"
          onChange={onChange}
        />
        <div>
          <input
            type="radio"
            id="social-twitter"
            name="social"
            value="twitter"
            selected={activeSocial === "twitter"}
            onChange={selectSocial}
          />
          <label htmlFor="social-twitter" className={styles.pointer}>
            Twitter
          </label>

          <input
            type="radio"
            id="social-linkedin"
            name="social"
            value="linkedin"
            selected={activeSocial === "linkedin"}
            onChange={selectSocial}
          />
          <label htmlFor="social-linkedin" className={styles.pointer}>
            LinkedIn
          </label>
        </div>
      </div>
      <div className={styles.resultWrapper}>
        <img
          className={styles.image}
          src={`/api/social-card?text=${imageVersion}`}
        />
        <div className={styles.url}>
          <input
            className={[styles.input].concat(styles.urlInput).join(" ")}
            readOnly={true}
            value={url}
          />
          <Copy className={styles.copy} content={url} />
        </div>
        {/* <input type="submit" className={styles.button} /> */}
        <fieldset className={styles.ogCode}>
          <legend>OG Code</legend>
          <div className={styles.overflow}>
            <pre
              dangerouslySetInnerHTML={{
                __html: `&lt;meta property="og:image" content="${url}" /&gt;`,
              }}
            />
          </div>
        </fieldset>
      </div>
    </main>
  );
};

export default IndexPage;
