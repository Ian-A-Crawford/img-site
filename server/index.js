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

async function upload(file, name) {
  img = file;


  var params = {
    Body: img,
    Bucket: "fucketbuckets",
    ContentType: 'image/png',
    Key: name,
  };
  s3.putObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful responseS
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!') //placeholder, will hold UI
})

app.post('/create', upload.single('file'), (req, res) => {
  upl(req.file.buffer, req.file.originalname)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})