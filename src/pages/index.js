import * as React from "react";
import debounce from "debounce";
import { Link } from "gatsby";
import slugify from "@sindresorhus/slugify";

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
  const [activeFormat, setActiveFormat] = React.useState("landscape");
  const [imageVersion, setImageVersion] = React.useState(" todo ");
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
            />
          </div>
          <fieldset className={styles.format}>
            <legend>Format</legend>
            <input
              type="radio"
              id="landscape"
              name="format"
              value="landscape"
              selected={activeFormat === "landscape"}
              onChange={selectFormat}
            />
            <label htmlFor="landscape" className={styles.pointer}>
              Landscape
            </label>
            <input
              type="radio"
              id="format-square"
              name="format"
              value="square"
              selected={activeFormat === "square"}
              onChange={selectFormat}
            />
            <label htmlFor="format-square" className={styles.pointer}>
              Square
            </label>
          </fieldset>
          <div className={styles.description}>
            <h2 className={styles.heading}>What is this?</h2>
            <p>
              This service generates images that you can use as{" "}
              <code>og:image</code>s to use with the corresponding &lt;meta&gt;
              tags. It's using{" "}
              <a href="https://gatsbyjs.com/functions">
                Gatsby Cloud Functions
              </a>{" "}
              under the hood.
            </p>
            <p>
              Care about the details? We know you do, check 'em out the{" "}
              <Link to="/how/">full details</Link>.
            </p>
            <p>
              Find out how this works and deploy your own image generator by
              visiting GitHub.
            </p>
          </div>
        </div>
        <div className={styles.resultWrapper}>
          <img
            className={styles.image}
            src={`/api/social-card?text=${imageVersion}&format=${activeFormat}`}
          />
          <div className={styles.url}>
            <input
              className={[styles.input].concat(styles.urlInput).join(" ")}
              readOnly={true}
              value={url}
            />
            <Copy className={styles.copy} content={url} />
          </div>

          <a
            href={`/api/social-card?text=${imageVersion}`}
            download={`release-${slugify(imageVersion)}.png`}
          >
            download me
          </a>
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
    </div>
  );
};

export default IndexPage;
