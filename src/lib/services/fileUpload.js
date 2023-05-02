import AWS from 'aws-sdk';

AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
AWS.config.region = process.env.REACT_APP_AWS_REGION;
var s3Obj = new AWS.S3({ params: { Bucket: process.env.REACT_APP_AWS_BUCKET } });

const FileUpload = {
  fileUpload: (file, cb) => {
    if(file) {
      //Update file name
      var fileName = file.name.split(".");
      var leftPart = fileName[0]
      var rightPart = fileName[1]
      const date = new Date()
      const time = date.getTime()
      fileName = leftPart + "-" + time + "." + rightPart
      //
      var params = { 'ACL': 'private', Key: fileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };
      s3Obj.upload(params, function(err, data, hey) {
        if(err) {
          // There Was An Error With Your S3 Config
          cb(err.message, null)
        } else {
          cb(null, data.Location)
        }
      })
    }
  }
}

export default FileUpload;
