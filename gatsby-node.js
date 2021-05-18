exports.onCreatePage = ({ actions }) => {
  actions.createPage({
    path: `/api/ssr/`,
    component: require.resolve("./src/dummy.js"),
    matchPath: "/trickster/",
  });
};
