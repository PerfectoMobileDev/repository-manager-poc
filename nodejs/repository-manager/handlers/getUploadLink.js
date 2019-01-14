'use strict';

const AWS = require('aws-sdk');

module.exports.handle = (event, context, callback) => {

  var bucketName = process.env.BUCKET_NAME;
  var path = event.pathParameters.id;

  let s3 = new AWS.S3({
    signatureVersion: 'v4',
  });

  var params = {
    Bucket: bucketName, 
    Key: path,
    ContentType: 'application/octet-stream'
  };
  var url = s3.getSignedUrl('putObject', params);


  var responseBody = {
    event: event,
    url: url
  }

  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  callback(null, response);
}