var botui = new BotUI('api-bot');

var socket = io.connect('http://localhost:8010');
// read the BotUI docs : https://docs.botui.org/

botui.message.add({
  content: 'Lets Start Talking...',
  delay: 1500,
}).then(function () {
  botui.action.text({
    action: {
      placeholder: 'Say Hello',
    }
  }).then(function (res) {
    socket.emit('fromClient', { client: res.value }); // sends the message typed to server
    console.log(res.value); // will print whatever was typed in the field.
  }).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      console.log(data.server);
      try {
        if (data.server.include("_BTN_:")) {
          console.log("TEST");
        }
      }
      catch (error) {
        console.log(error);
      }
      newMessage(data);
    })
  });
})

function newMessage(response) {
  try {
    console.log(response);
    if (response.result.metadata.endConversation === true) {
      console.log("Conversation ended"); //TODO: Handle if required
    }
  }
  catch (error) {
    console.log("Some exception");
    console.error(error);
  }

  botui.message.add({
    content: response.server,
    delay: 0,
  });

  addAction();
}

function newButton(response) {
  var val = response.server.slice(5).trimStart();
  console.log("bt " + val);
  try {
    console.log(response);
    if (response.result.metadata.endConversation === true) {
      console.log("Conversation ended"); //TODO: Handle if required
    }
  }
  catch (error) {
    console.log("Some exception");
    console.error(error);
  }

  botui.action.button({
    action: [
      { // show only one button
        text: val,
        value: val
      }
    ]
  }).then(function (res) { // will be called when a button is clicked.
    console.log(res.value); // will print "one" from 'value'
    botui.message.add({
      content: res.value,
      delay: 0,
    });
  });

  //addAction();
}

function addAction() {
  botui.action.text({
    action: {
      placeholder: 'enter response...',
    }
  }).then(function (res) {
    console.log(res);
    socket.emit('fromClient', { client: res.value });
    console.log('client response: ', res.value);
  })
}