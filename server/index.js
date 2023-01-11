const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const bp = require('body-parser')

const {upl, getImg} = require('../test.js')

var multer = require('multer');
var upload = multer();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../imgccpy/build')));


app.get('/', (req, res) => {
  res.send('Hello World!') //placeholder
})

app.post('/create', upload.single('file'), (req, res) => {
  upl(req.file.buffer, req.file.originalname)
  res.sendStatus(200);

})

app.get('/retrieve', (req, res) => {
  
  send = '';
  getImg()
  .then((data) => {
    send = (data.Contents);
    console.log(send);
    res.send(send);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})