import * as React from 'react'
import * as ReactDOM from 'react-dom/server'

const App = ({ name = 'World' }) => (
  <h1>Hello {name}</h1>
)

/*
 * This is a POC to render a React component via an API (SSR)
 * It takes dynamic data (e.g. a query param currently)
 * and returns dynamic HTML SSR'd via React
 * This is currently _actually_ static and does not hydrate on client
 */
export default async function SSR(req, res) {
  const { name } = req.query
  const html = ReactDOM.renderToString(<App name={name} />)

  return res.write(html)
}
