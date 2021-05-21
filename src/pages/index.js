import * as React from "react";
import debounce from "debounce";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { Copy } from "../components/copy/copy";
import { Header } from "../components/header";
import { Seo } from "../components/seo";

import * as styles from "./index.module.css";

const getUrl = (version, format) => {
  let base = `https://teamlightning.gatsbyjs.io`;
  if (process.env.NODE_ENV === "development") {
    base = `http://localhost:8000`;
  }
  return `${base}/api/social-card?text=${version}&format=${format}`;
};

// markup
const IndexPage = () => {
  const [version, setVersion] = React.useState("");
  const [isClient, setIsClient] = React.useState(false);
  const [activeFormat, setActiveFormat] = React.useState("landscape");
  const [imageVersion, setImageVersion] = React.useState("");
  const url = getUrl(version, activeFormat);

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

  const selectFormat = React.useCallback((e) => {
    setActiveFormat(e.target.value);
  }, []);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <Seo
        title="Release Notes Generator"
        description="Gatsby's release notes generator to generate our social sharing cards, powered by Gatsby Cloud Functions"
        image="/api/social-card?text=Release%20Notes%20Generator&format=landscape"
      />
      <Header />
      <main className={styles.main}>
        <div className={styles.uiWrapper}>
          <div className={styles.textFormat}>
            <label htmlFor="imageText">Text</label>
            <input
              className={styles.input}
              placeholder='E. g. "v3.5"'
              onChange={onChange}
              id="imageText"
              name="imageText"
            />
          </div>
          <fieldset className={styles.format}>
            <legend>Format</legend>
            <label className={styles.pointer}>
              <input
                type="radio"
                id="landscape"
                name="format"
                value="landscape"
                checked={activeFormat === "landscape"}
                onChange={selectFormat}
              />
              Landscape
            </label>
            <label className={styles.pointer}>
              <input
                type="radio"
                id="format-square"
                name="format"
                value="square"
                checked={activeFormat === "square"}
                onChange={selectFormat}
              />
              Square
            </label>
          </fieldset>

          <a
            disabled={!version}
            className={styles.button}
            {...(version && { href: `/api/download-assets?text=${version}` })}
          >
            Download Assets
          </a>
          <hr />
          <div className={styles.prose}>
            <h2 className={styles.heading}>What is this?</h2>
            <p>
              This service uses{" "}
              <a href="https://gatsbyjs.com/functions">
                Gatsby Cloud Functions
              </a>{" "}
              to generate social media images that can be used as{" "}
              <code>og:image</code> along the corresponding{" "}
              <code>&lt;meta&gt;</code> tags. Images can be downloaded or
              included via a simple URL API.
            </p>
            <p>
              <Link to="/how/">&rarr; Learn more about the details</Link>
            </p>
          </div>
        </div>
        <div className={styles.resultWrapper}>
          {version ? (
            <img
              className={styles.image}
              src={`/api/social-card?text=${
                imageVersion || " "
              }&format=${activeFormat}`}
              alt=""
            />
          ) : (
            <StaticImage
              src="https://teamlightning.gtsb.io/api/social-card?text=todo&amp;format=landscape"
              alt=""
              className={styles.image}
            />
          )}
          <div className={styles.url}>
            <label htmlFor="imageUrl" className="sr-only">
              Image URL
            </label>
            <input
              disabled={!version}
              className={[styles.input].concat(styles.urlInput).join(" ")}
              readOnly={true}
              value={url}
              id="imageUrl"
              name="imageUrl"
            />
            <Copy className={styles.copy} content={url} />
          </div>
          <div className={styles.url}>
            <label htmlFor="metaOgImage" className="sr-only">
              Image URL
            </label>
            <input
              disabled={!version}
              className={[styles.input].concat(styles.urlInput).join(" ")}
              readOnly={true}
              value={`<meta property="og:image" content="${url}" />`}
              id="metaOgImage"
              name="metaOgImage"
            />
            <Copy
              className={styles.copy}
              content={`<meta property="og:image" content="${url}" />`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
