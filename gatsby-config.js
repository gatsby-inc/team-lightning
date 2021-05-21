const path = require('path')

module.exports = {
  flags: {
    FUNCTIONS: true,
  },
  siteMetadata: {
    title: "team-lightning",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-react-helmet",
    {
      "resolve": "gatsby-source-filesystem",
      "options": {
        "name": "team-assets",
        "path": path.join(__dirname, 'src', 'assets')
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json"
  ],
};
