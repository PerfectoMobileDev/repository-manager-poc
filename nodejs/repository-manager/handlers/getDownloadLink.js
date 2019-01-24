'use strict';

const S3Utils = require('../util/s3Utils');

// Example for using a layer
//const KeyCloakAuthentication = require('keycloak-authentication')

module.exports.handle = (event, context, callback) => {

  // example for using a layer
  // console.log("Calling KeyCloak...");
  // KeyCloakAuthentication.printMsg();

  var bucketName = process.env.BUCKET_NAME;
  var path = decodeURIComponent(event.pathParameters.id);

  const response = S3Utils.getDownloadLink(bucketName, path);
  callback(null, response);
}