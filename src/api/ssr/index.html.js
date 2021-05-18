export default async function hello(req, res) {
  return res.status(200).json({
    path: req.baseUrl,
    realPath: req.path,
    query: req.query,
    headers: req.headers,
  });
}
