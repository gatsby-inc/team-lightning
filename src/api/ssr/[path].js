import * as React from 'react'
import * as ReactDOM from 'react-dom/server'

const App = ({ path = 'World' }) => (
  <h1>Hello from {path}</h1>
)

/*
 * TODO: this should probably dynamically render based on file path or something
 */
export default async function WildcardSSR(req, res) {
  const { path } = req.params
  const html = ReactDOM.renderToString(<App path={path} />)

  return res.write(html)
}