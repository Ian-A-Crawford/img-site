const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const bp = require('body-parser')

const {upl} = require('../test.js')

var multer = require('multer');
var upload = multer();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../imgccpy/build')));

//app.use(upload.single());






async function upload(file, name) {
  img = file;//await read();


  var params = {
    Body: img,
    Bucket: "fucketbuckets",
    ContentType: 'image/png',
    Key: name,
  };
  s3.putObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    /*
    data = {
     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
     VersionId: "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
    }
    */
  });
}






app.get('/', (req, res) => {
  res.send('Hello World!')
})
let newImages = []

app.post('/create', upload.single('file'), (req, res) => {
  //  var newImg = {
  //     "url": req.body.url,
  //  }
  //  newImages.push(newImg);
  //  // Here will be a call to the read function in the test.js file, 
  //  // adding the image to S3
  //  console.log(newImages);
  console.log(req.file.buffer);
  upl(req.file.buffer, req.file.originalname)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})