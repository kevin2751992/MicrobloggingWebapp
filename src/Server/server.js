
const express = require('express');
const server = express();
// fs = require('fs');
const path = require('path');
const INDEX = path.join(process.cwd(), '/dist/index.html');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let port = 8080;
if ((process.argv[2]) && (process.argv[2] > 0)) {
  port = process.argv[2];
}

// static SERVER
server.get('/', function (req, res) {
  res.sendFile(INDEX);
}).use(express.static(path.join(process.cwd(), '/dist/')));

const users = {
  1: {
    id: '1',
    username: 'Robin Wieruch'
  },
  2: {
    id: '2',
    username: 'Dave Davids'
  }
};

server.get('/blogEntries', (req, res) => {
  return res.send(Object.values(users));
});

server.put('/blogEntries', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

server.delete('/blogEntries', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

server.listen(port, function () {
  console.log('server started on port: ' + port);
});
