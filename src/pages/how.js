import * as React from "react";
import { Link } from "gatsby";
import { Seo } from "../components/seo";
import { FaGithubSquare } from "react-icons/fa";

import socialCard from "!!raw-loader!../api/social-card.js";
import downloadAssets from "!!raw-loader!../api/download-assets.js";
import { Header } from "../components/header";
import { Highlight } from "../components/highlight";
import { Container } from "../components/container";

import { main, uiWrapper, resultWrapper, prose } from "./index.module.css";
import * as styles from "./how.module.css";

const CodeTitle = ({ title, ...props }) => (
  <h3 className={styles.codeTitle} {...props}>
    <pre className={styles.pre}>{title}</pre>
    <a
      href={`https://github.com/gatsby-inc/team-lightning/blob/main/src/${title}`}
    >
      <FaGithubSquare size={24} /> Source
    </a>
  </h3>
);

function How() {
  return (
    <>
      <Seo
        title="How this was built | Release Notes Generator"
        description="Gatsby's release notes generator to generate our social sharing cards, powered by Gatsby Cloud Functions"
        image="/api/social-card?text=Release%20Notes%20Generator&format=landscape"
      />
      <Header />
      <Container>
        <Link to="/">&larr; Back to the generator</Link>
        <h1>How this was built</h1>
      </Container>
      <main className={main}>
        <div className={uiWrapper}>
          <div className={prose}>
            <h2>Powered by ⚡ Gatsby Cloud Functions</h2>
            <p>
              We leverag the dynamic power of{" "}
              <a href="https://gatsbyjs.com/functions">
                Gatsby Cloud Functions
              </a>{" "}
              to generate an <code>og-image</code> and social sharing cards for
              the Gatsby Marketing team.
            </p>
            <h3>Tech stack</h3>
            <p>Quite simple, really! We're using a few tools, notably:</p>
            <ul>
              <li>
                <a href="https://www.npmjs.com/package/jimp">
                  <pre className={styles.pre}>Jimp</pre>
                </a>
                , an amazing image transformation tool that we use to load in
                the image, add custom text, and generate the final image.
              </li>
              <li>
                <a href="https://www.npmjs.com/package/yup">
                  <pre className={styles.pre}>yup</pre>
                </a>{" "}
                to validate the schema and display helpful messages to the
                consumers of this API.
              </li>
              <li>
                <a href="https://www.npmjs.com/package/archiver">
                  <pre className={styles.pre}>archiver</pre>
                </a>{" "}
                to generate a .zip of the bundled assets and return the stream
                to the user to download.
              </li>
            </ul>
          </div>
        </div>
        <div className={resultWrapper}>
          <div className={prose}>
            <h2>The code</h2>
            <p>There are two main pieces.</p>
            <ol>
              <li>
                <pre className={styles.pre}>api/social-card.js</pre>: An API
                that will generate a social card for OG images
              </li>
              <li>
                <pre className={styles.pre}>api/download-assets.js</pre>: An API
                to return a .zip file with bundled assets (for social sharing)
              </li>
            </ol>
            <CodeTitle title="api/social-card.js" />
            <p>
              A simple serverless function at{" "}
              <a href="https://github.com/gatsby-inc/team-lightning/blob/main/src/api/social-card.js">
                <pre className={styles.pre}>api/social-card.js</pre>
              </a>{" "}
              is all we need for a robust social sharing card service! The code
              is as follows:
            </p>

            <Highlight code={socialCard} />

            <CodeTitle title="api/download-assets.js" />
            <p>
              This function uses the library archiver to download a .zip of
              assets (invoking the previous service to generate the images).
              <a href="https://github.com/gatsby-inc/team-lightning/blob/main/src/api/download-assets.js">
                <pre className={styles.pre}>api/download-assets.js</pre>
              </a>
            </p>
            <Highlight code={downloadAssets} />
          </div>
        </div>
      </main>
    </>
  );
}

export default How;
