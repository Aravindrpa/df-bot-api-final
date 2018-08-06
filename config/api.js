var apiai = require('apiai');

// read the api.ai docs : https://api.ai/docs/

//Enter your API Key
var app = apiai('96f79321ccc14e288c604891d73c9daa');
//var app = apiai('ca7612c4853f47e7b99da21a7786e22e'); 



// Function which returns speech from api.ai
var getRes = function (query) {
  var request = app.textRequest(query, {
    sessionId: '<unique session id>'
  });
  const responseFromAPI = new Promise(
    function (resolve, reject) {
      request.on('error', function (error) {
        reject(error);
      });
      request.on('response', function (response) {
        resolve(response);
      });
    });
  request.end();
  return responseFromAPI;
};

// test the command :
//getRes('hello').then(function(res){console.log(res)});

module.exports = { getRes }
