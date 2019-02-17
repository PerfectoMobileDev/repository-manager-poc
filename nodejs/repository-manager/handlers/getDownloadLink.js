'use strict';

const S3Utils = require('../util/s3Utils');

module.exports.handle = (event, context, callback) => {

  console.log("Authenticated user: " + event.requestContext.authorizer.principalId);

  var bucketName = process.env.BUCKET_NAME;
  var path = decodeURIComponent(event.pathParameters.id);

  const response = S3Utils.getDownloadLink(bucketName, path);
  callback(null, response);
}