import http from "http"
import fs from "fs"
import os from 'os'


const port = 4000;

const server = http.createServer((req, res) => {
  fs.readFile('page.html', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    console.log(data.toString());
    console.log(os.arch());
    console.log(os.constants);
    console.log(os.cpus);
    console.log(os.endianness);
    console.log(os.EOL);
    console.log(os.freemem);
    console.log(os.hostname);
    return res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}/`);
});