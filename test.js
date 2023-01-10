// import entire SDK
var AWS = require("aws-sdk");
// import AWS object without services
var AWS = require("aws-sdk/global");
// import individual service
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

AWS.config.update({ region: "us-west-2" });

async function read() {
  file = "C:/Users/epika/Pictures/Saved Pictures/Lucas/IMG_0047.PNG";
  fs = require("fs").promises;
  const data = await fs.readFile(file);
  return (data);
}
//How can I make it to where the file is opened when clicked on?
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

module.exports.upl = upload;