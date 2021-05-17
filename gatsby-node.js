exports.createPages = async function createPages( { actions }) {
  actions.createRedirect({
    fromPath: '/api/ssr/*',
    toPath: '/ssr'
  })
}
