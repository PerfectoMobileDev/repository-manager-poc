'use strict';

const AWS = require('aws-sdk');

// Example for using a layer
//const KeyCloakAuthentication = require('keycloak-authentication')

module.exports.handle = (event, context, callback) => {

  // example for using a layer
  console.log("Calling KeyCloak...");
  KeyCloakAuthentication.printMsg();

  var bucketName = process.env.BUCKET_NAME;
  var path = event.pathParameters.id;

  const response = getUploadLink(bucketName, path);
  callback(null, response);
}

function getUploadLink(bucketName, path) {
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
    url: url
  };
  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
}
// to allow unit testing
module.exports.getUploadLink = getUploadLink;