// __tests__/handler.test.js
const getUploadLinkHandler = require('../handlers/getUploadLink');
const fs = require('fs');
const req = require('request');
const AWS = require('aws-sdk');


const bucketName = "perfecto-repository-dev-us-east-1";
const objectPath = "mytestfolder/mytestartifact";

var getUploadLinkResponse;

test('validate test object does not exist before test', done => {
    validateObjectExists(false,bucketName,objectPath, done)
});

test('create upload link', () => {
    // get upload link
    getUploadLinkResponse = getUploadLinkHandler.getUploadLink(bucketName,objectPath);
    expect(getUploadLinkResponse.statusCode).toBe(200);
});
    
test('use upload link', done => {
    
    const body = JSON.parse(getUploadLinkResponse.body);

    // use the link to upload artifact
    fs.readFile('./__tests__/test.png', function(err, data){
        if(err){
          return console.log(err);
        }
        req({
          method: "PUT",
          url: body.url,
          body: data
        }, function(err, res, body){
            expect(res.statusCode).toBe(200);
            console.log("err:" + JSON.stringify(err));
            console.log("res:" + JSON.stringify(res));
            console.log("body:" + JSON.stringify(body));
            // check object exists
            validateObjectExists(true,bucketName,objectPath, done)
        })
      });
});

// exists should be true or false, depending on whether you expect the object to exist or not
function validateObject(exists, bucketName, objectPath, done) {
    let s3 = new AWS.S3;
    var params = {
        Bucket: bucketName,
        Key: objectPath
    };
    var objectExists = false;
    s3.getObject(params, function (err, data) {
        if (err){
            console.log(err, err.stack); // an error occurred
        } else {
            objectExists = true;
            console.log(data);
        }
        expect(objectExists).toBe(exists);

        // this tells Jest that the asynchronous test has ended
        done();
    });
    
}

