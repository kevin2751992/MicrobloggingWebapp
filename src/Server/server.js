const express = require('express');
const server = express();
const path = require('path');
const INDEX = path.join(process.cwd(), '/dist/index.html');

let port = 8080;
if ((process.argv[2]) && (process.argv[2] > 0)) {
  port = process.argv[2];
}
// server.use('/static', express.static('MicrobloggingWebapp/dist'));

server.get('/', function (req, res) {
  res.sendFile(INDEX);
}).use(express.static(path.join(process.cwd(), '/dist/')));

server.listen(port, function () {
  console.log('server started on port: ' + port);
});
