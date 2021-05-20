export default () => {
  if (process.env.HOST) {
    return process.env.HOST
  }
  return process.env.NODE_ENV === `production` ? `https://teamlightning.gatsbyjs.io` : `http://localhost:8000`
}
