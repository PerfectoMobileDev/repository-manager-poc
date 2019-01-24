'use strict';

const AWS = require('aws-sdk');

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

