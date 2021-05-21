import * as React from "react";
import { graphql } from 'gatsby'
import { Seo } from "../components/seo";
import { FaGithub } from "react-icons/fa";

import socialCard from "!!raw-loader!../api/social-card.js";
import downloadAssets from "!!raw-loader!../api/download-assets.js";
import { Header } from "../components/header";
import { Highlight } from "../components/highlight";
import { Container } from "../components/container";
import { Team } from '../components/team'

import { main, uiWrapper, resultWrapper, prose } from "./index.module.css";
import * as styles from "./how.module.css";

const CodeTitle = ({ title, ...props }) => (
  <h3 className={styles.codeTitle} {...props}>
    <code>{title}</code>
    <a
      href={`https://github.com/gatsby-inc/team-lightning/blob/main/src/${title}`}
    >
      <FaGithub size={16} /> Source
    </a>
  </h3>
);

function How({ data: { team }}) {
  return (
    <>
      <Seo
        title="How this was built | Release Notes Generator"
        description="Gatsby's release notes generator to generate our social sharing cards, powered by Gatsby Cloud Functions"
        image="/api/social-card?text=Release%20Notes%20Generator&format=landscape"
      />
      <Header />
      <Container>
        <h1>How this was built</h1>
      </Container>
      <main className={main}>
        <div className={uiWrapper}>
          <div className={prose}>
            <h2>The stack</h2>
            <p>
              We leverage the dynamic power of{" "}
              <a href="https://gatsbyjs.com/functions">
                Gatsby Cloud Functions
              </a>{" "}
              to generate an <code>og-image</code> and social sharing cards for
              the Gatsby Marketing team.
            </p>
            <h3>What else?</h3>
            <p>We're using a few tools, notably:</p>
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
            <h2>The team</h2>
            <p>This project was built by <strong>{team.totalCount}</strong> team members in a <strong>four hour period</strong> as part of an internal hackathon. It goes to show you can achieve pretty sophisticated results with the power of Gatsby Functions.</p>
            <Team mates={team.nodes} />
            <h2>Build it yourself</h2>
            <p>Want to try it out yourself? Go for it! Tweak to your heart's content, and customize to <em>your</em> needs!</p>
            <p>
              <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsby-inc/team-lightning" title="Deploy to Gatsby Cloud" className={styles.deploy}><img src="https://camo.githubusercontent.com/fda7a8fe64d0351d9eb4aff4446b92368c7d5d9a55889fd16041eb393c5a697d/68747470733a2f2f7777772e6761747362796a732e636f6d2f6465706c6f796e6f772e737667" /></a>
            </p>
          </div>
        </div>
        <div className={resultWrapper}>
          <div className={prose}>
            <h2>The code</h2>
            <p>There are two main pieces.</p>
            <ol>
              <li>
                <code>api/social-card.js</code>: An API that will generate a
                social card for OG images
              </li>
              <li>
                <code>api/download-assets.js</code>: An API to return a .zip
                file with bundled assets (for social sharing)
              </li>
            </ol>
            <CodeTitle title="api/social-card.js" />
            <p>
              A simple serverless function at{" "}
              <a href="https://github.com/gatsby-inc/team-lightning/blob/main/src/api/social-card.js">
                <code className={styles.pre}>api/social-card.js</code>
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
                <code className={styles.pre}>api/download-assets.js</code>
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

export const query = graphql`
  {
    team: allTeamJson(sort: {fields: name, order: ASC}) {
      totalCount
      nodes {
        ...TeamDetails
      }
    }
  }
`