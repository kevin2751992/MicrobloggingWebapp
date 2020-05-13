const express = require("express");
let server = express();
let port = 8080;
if ((process.argv[2])&&(process.argv[2]>0))
{
    port = process.argv[2];
}
server.listen(port,function(){
    console.log('server started on port: ' + port);
  });

server.use(express.static("../FrontEnd/Dist"));


