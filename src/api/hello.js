export default async function hello(req, res) {
  const { name = 'World' } = req.query
  return res.status(200).json({
    message: `Hello ${name}`
  })
}