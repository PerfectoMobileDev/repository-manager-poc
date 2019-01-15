// __tests__/handler.test.js
const getUploadLinkHandler = require('../handlers/getUploadLink');
var fs = require('fs');
var req = require('request');

test('upload link', done => {

    const bucketName = "perfecto-repository-dev-us-east-1";
    const objectPath = "mytestfolder/mytestartifact";
    
    // get upload link
    const getUploadLinkResponse = getUploadLinkHandler.getUploadLink(bucketName,objectPath);
    expect(getUploadLinkResponse.statusCode).toBe(200);
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
            done();
        })
      });

      // check object exists
});
