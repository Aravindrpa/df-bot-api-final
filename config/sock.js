var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var api = require('./api');

var responseModels = require('../models/responses');

var conn = function () {
  server.listen(8010);

  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
};

var fromClient = function () {
  io.on('connection', function (socket) {
    socket.on('fromClient', function (data) {
      console.log(data.client);
      api.getRes(data.client).then(function (res) {
        console.log('response:\n', res.result.fulfillment);
        //TODO: Take multiple mesages from array and send as multiple responses
        //socket.emit('fromServer', { server: res.result.fulfillment });
        if ("messages" in res.result.fulfillment) {
          res.result.fulfillment.messages.forEach(element => {
            Process(element, socket);
          });
        }
        else if ("fulfillmentText" in res.result.fulfillment) {
          socket.emit('fromServer', { server: res.result.fulfillment.speech });
        }
        else {
          socket.emit('fromServer', { server: "Sorry, Cant reply now !!" });
        }
        //socket.emit('fromServer', { server: "Hey this is a dummy message from 'sock.js' ;-)" });
      });
    });
  });
}

function Process(message, socket) {

  // If simple speech response
  if ('speech' in message) {
    if (Array.isArray(message.speech)) {
      message.speech.forEach(element => {
        socket.emit('fromServer', { server: element });
      });
    }
    else {
      socket.emit('fromServer', { server: message.speech });
    }
  }
  

  //TODO: If something else
  
}

// HELPERS

function isArray(jobj) {
  return Object.prototype.toString.call(jobj) === '[object Array]';
}

//check if object keys are same
function isSame(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  if (JSON.stringify(aKeys) === JSON.stringify(bKeys)) {
    return true;
  }
  else { return false; }
}

module.exports = { conn, fromClient }
