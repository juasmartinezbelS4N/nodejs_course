import https from "https"
import fs from "fs"

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
}

const port = 4000

const server = https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end("Hello world")
})

server.listen(port, () => {
  console.log(`Server running 🚀 at https://localhost:${port}/`)
})


https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (response) => {
  let data = '';

  // A chunk of data has been received.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  response.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on('error', (error) => {
  console.log("Error: " + error.message);
});