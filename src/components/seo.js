import React from "react";
import { Helmet } from "react-helmet";

function Seo({ title, image, description, url }) {
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      titleTemplate={`%s | Release Notes Generator`}
      meta={[
        {
          name: `description`,
          content: description,
        },

        /*
          @todo Schema.org tags
          @see https://github.com/jlengstorf/lengstorf.com/blob/master/src/components/SEO.js
        */

        /* OpenGraph tags */
        {
          property: `og:url`,
          content: url,
        },

        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          name: `twitter:creator`,
          content: "@gatsbyjs",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(
        image
          ? [
              {
                name: `image`,
                content: image,
              },
              {
                property: `og:image`,
                content: image,
              },

              /* Twitter Card tags */
              {
                name: `twitter:card`,
                content: `summary_large_image`,
              },
            ]
          : []
      )}
    />
  );
}

export { Seo };
