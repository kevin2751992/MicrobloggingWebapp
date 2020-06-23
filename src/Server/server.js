const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');

const INDEX = path.join(process.cwd(), '/dist/index.html');

let port = 8080;
if ((process.argv[2]) && (process.argv[2] > 0)) {
  port = process.argv[2];
}
// server.use('/static', express.static('MicrobloggingWebapp/dist'));

// static SERVER
server.get('/', function (req, res) {
  res.sendFile(INDEX);
}).use(express.static(path.join(process.cwd(), '/dist/')));

server.get('/getBlogPosts', function (req, res) {
  console.log('return BlogPosts');
  const DataBase = path.join(process.cwd(), '/src/Server/database/blogEntries.json');
  const blogPost = fs.readFileSync(DataBase, { encoding: 'utf8' });
  console.log('data', blogPost);
  console.log('respone', (blogPost));

  res.send((blogPost));
});

// route SERVER post
server.post('/newBlogEntry', (req, res) => {
  console.log('data', JSON.stringify(req.body));
  fs.writeFile('./src/Server/database/blogEntries.txt', 'TEST', function (error) {
    if (error) {
      return console.log('Error while file saving' + error);
    }
    console.log('File saved');
  });

  return res.status(200).send('Received a PUT HTTP method');
});

server.listen(port, function () {
  console.log('server started on port: ' + port);
});
