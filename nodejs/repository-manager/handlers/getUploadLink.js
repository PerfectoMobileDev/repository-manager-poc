'use strict';

module.exports.handle = (event, context, callback) => {

  var bucketName = process.env.BUCKET_NAME;
  var path=pathParameters.id;

  var params = {Bucket: bucketName, Key: path};
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