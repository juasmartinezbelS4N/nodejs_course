import http from "http"
import url from "url"

const port = 4000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  //res.end("Hello World")
  const { query } = url.parse(req.url, true);
  const date = query.year + " " + query.month;
  // go to: http://localhost:4000/?year=2017&month=July
  res.end(date);
})

server.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}/`)
})
