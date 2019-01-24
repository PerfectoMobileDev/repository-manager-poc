'use strict';

const AWS = require('aws-sdk');

const PUT_OBJECT_OPERATION = 'putObject'
const GET_OBJECT_OPERATION = 'getObject';

function getUploadLink(bucketName, path) {
  let operation = PUT_OBJECT_OPERATION;
  return getSignedUrl(bucketName, path, operation);
}

function getDownloadLink(bucketName, path) {
  let operation = GET_OBJECT_OPERATION;
  return getSignedUrl(bucketName, path, operation);
}

module.exports.getUploadLink = getUploadLink;
module.exports.getDownloadLink = getDownloadLink;

function getSignedUrl(bucketName, path, operation) {
  let s3 = new AWS.S3({
    signatureVersion: 'v4',
  });
  var params = {
    Bucket: bucketName,
    Key: path
  };
  if (operation === PUT_OBJECT_OPERATION){
    params.ContentType = 'application/octet-stream';
  }
  var url = s3.getSignedUrl(operation, params);
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

