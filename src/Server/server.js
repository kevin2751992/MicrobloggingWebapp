const express = require('express');
const server = express();
let port = 3000;
if ((process.argv[2]) && (process.argv[2] > 0)) {
  port = process.argv[2];
}
server.use(express.static('MicrobloggingWebapp/dist'));

server.listen(port, function () {
  console.log('server started on port: ' + port);
});
server.get('/', function (req, res) {
  res.sendFile('index.html', { root: './dist' });
});
