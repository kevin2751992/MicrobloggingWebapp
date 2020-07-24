const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// var multer = require('multer');

const INDEX = path.join(process.cwd(), '/dist/index.html');

let port = 8080;
if ((process.argv[2]) && (process.argv[2] > 0)) {
  port = process.argv[2];
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload());
server.use(express.static(path.join(process.cwd(), '/src/Server/database/blogPostImages')));
server.use(express.static(path.join(process.cwd(), '/src/Server/database/blogPostGeoJson')));
// server.use('/static', express.static('MicrobloggingWebapp/dist'));

// static SERVER
server.get('/', function (req, res) {
  res.sendFile(INDEX);
}).use(express.static(path.join(process.cwd(), '/dist/')));

server.get('/getBlogPosts', function (req, res) {
  let blogPosts;
  try {
    const DataBase = path.join(process.cwd(), '/src/Server/database/blogEntries.json');
    blogPosts = fs.readFileSync(DataBase, { encoding: 'utf8' });
  } catch (error) {
    res.status('500').send('Error while Reading JSONFile:', error);
  }

  res.status('200').send((blogPosts));
});

// route SERVER post
server.post('/postBlogPost', (req, res) => {
  const blogPost = req.body;
  var data = fs.readFileSync('./src/Server/database/blogEntries.json');
  var json = JSON.parse(data);

  json.push(blogPost);

  fs.writeFile('./src/Server/database/blogEntries.json', JSON.stringify(json), function (error) {
    if (error) {
      return console.log('Error while file saving' + error);
    }
    console.log('File saved');
  });

  return res.status(200).send('Your BlogPost was saved');
});
server.post('/uploadGeojson', (req, res) => {
  // Check if we received any Data send error if not
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // Create a id and append it to the filename
  const id = Math.floor(Math.random() * 999999);
  const name = req.files.geoJson.name.split('.')[0];
  const text = req.files.geoJson.name.split('.')[1];
  const fileName = name + id + '.' + text;

  req.files.geoJson.mv('./src/Server/database/blogPostGeoJson/' + fileName, function (err) {
    if (err) {
      console.log(err);
    }
  });
  return res.status(200).send({ id: fileName });
});
server.post('/uploadImage', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const id = Math.floor(Math.random() * 999999);
  const name = req.files.img.name.split('.')[0];
  const ext = req.files.img.name.split('.')[1];
  const imgName = name + id + '.' + ext;

  req.files.img.mv('./src/Server/database/blogPostImages/' + imgName, function (err) {
    if (err) {
      console.log(err);
    }
  });
  /* fs.writeFile('./src/Server/database/blogPostImages/' + req.files.img.name, req.files.img, function (error) {
    if (error) {
      return console.log('Error while file saving' + error);

    console.log('File saved');
  });} */

  return res.status(200).send({ id: imgName });
});

server.listen(port, function () {
  console.log('server started on port: ' + port);
});
