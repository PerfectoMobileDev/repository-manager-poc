// __tests__/handler.test.js
const getUploadLinkHandler = require('../handlers/getUploadLink');
const https = require('https');

test('correct response code', done => {
    
    const getUploadLinkResponse = getUploadLinkHandler.getUploadLink("perfecto-repository-dev-us-east-1}","mytestfolder/mytestartifact");
    expect(getUploadLinkResponse.statusCode).toBe(200);
    const body = JSON.parse(getUploadLinkResponse.body)
    
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    };

    var req= https.request(body.url,options, (resp) => {
        expect(resp.statusCode).toBe(200);
        let data = '';
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data);
          done();
        });
      
      });
      
      req.on("error", (err) => {
        console.log("Error: " + err.message);
        //expect(true).toBe(false);
      });
      
      req.write("kuku");

      req.end();

    

});
