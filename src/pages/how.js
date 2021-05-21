import * as React from "react";
import { Link } from "gatsby";
import { Seo } from "../components/seo";
import { FaGithubSquare } from "react-icons/fa";

import socialCard from "!!raw-loader!../api/social-card.js";
import downloadAssets from "!!raw-loader!../api/download-assets.js";
import { Header } from "../components/header";
import { Highlight } from "../components/highlight";
import { Container } from "../components/container";

import {
  main,
  uiWrapper,
  resultWrapper,
  description,
} from "./index.module.css";
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
          <div className={description}>
            <h2>Powered by ⚡ Gatsby Cloud Functions</h2>
            <p>
              We leveraged the dynamic power of Gatsby Cloud Functions to
              generate an <code>og-image</code> and social sharing cards for our
              internal Marketing team.
            </p>
            <h3>Tech stack</h3>
            <p>Quite simple, really! We're using a few tools, notably:</p>
            <ul>
              <li>
                <a href="https://www.npmjs.com/package/jimp">
                  <pre className={styles.pre}>Jimp</pre>
                </a>
                . An amazing image transformation tool that we use to load in
                the image, and then position text on the generated image.
              </li>
              <li>
                <a href="https://www.npmjs.com/package/yup">
                  <pre className={styles.pre}>yup</pre>
                </a>
                . We leveraged yup to validate the schema and display helpful
                messages to our consumers of this API.
              </li>
              <li>
                <a href="https://www.npmjs.com/package/archiver">
                  <pre className={styles.pre}>archiver</pre>
                </a>
                . We leveraged archiver to generate a .zip of the bundled assets
                and return the stream to the user.
              </li>
            </ul>
          </div>
        </div>
        <div className={resultWrapper}>
          <div>
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
