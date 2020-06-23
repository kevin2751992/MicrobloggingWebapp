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
  let blogPosts;
  try {
    const DataBase = path.join(process.cwd(), '/src/Server/database/blogEntries.json');
    blogPosts = fs.readFileSync(DataBase, { encoding: 'utf8' });
  } catch (error) {
    res.status('500').send('Error while Reading JSONFile:', error);
  }

  console.log('respone', (blogPosts));

  res.status('200').send((blogPosts));
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
