// __tests__/handler.test.js
const getUploadLinkHandler = require('../handlers/getUploadLink');

test('correct response code', () => {
  expect(getUploadLinkHandler.getUploadLink("perfecto-repository-dev-us-esat-1}","mytestfolder/mytestartifact").statusCode).toBe(200);
});
