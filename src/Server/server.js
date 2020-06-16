const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');
const INDEX = path.join(process.cwd(), '/dist/index.html');

let port = 3000;
if ((process.argv[2]) && (process.argv[2] > 0)) {
  port = process.argv[2];
}
// server.use('/static', express.static('MicrobloggingWebapp/dist'));

// static SERVER
server.get('/', function (req, res) {
  res.sendFile(INDEX);
}).use(express.static(path.join(process.cwd(), '/dist/')));

// route SERVER put
server.post('/newBlogEntry', (req, res) => {
  console.log('data', req.body);
  fs.writeFile('./src/Server/database/blogEntries.txt', 'TEST', function (error) {
    if (error) {
      return console.log('Error while file saving' + error);
    }
    console.log('File saved');
  });

  return res.send('Received a PUT HTTP method');
});

server.listen(port, function () {
  console.log('server started on port: ' + port);
});
