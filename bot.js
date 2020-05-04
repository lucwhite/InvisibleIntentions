const tmi = require('tmi.js');
const maxApi = require("max-api");

var colorVals = [0,0,0];

// Define configuration options
const opts = {
  identity: {
    username: {username},
    password: {oauthKey}
  },
  channels: [
    {channel}
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!info') {
    client.say(target, `Invisible Intentions is a live stream sound installation created by Lucas White using MaxMSP and Arduino. The sound you are hearing is generated from data collected off the plants on screen. The piece is an effort to grant sonic agency to plants. For documentation, please visit lucwhite.com.`);
    console.log(`* Executed ${commandName} command`);
  } if (commandName.includes('!color')) {
    var sliced = commandName.slice(7, 20);
    colorVals = sliced.split(" ");
    maxApi.outlet(colorVals);
    client.say(target, `changing color to RGB: ` + colorVals);
    console.log(`* Executed ${commandName} command`);
  } 
  else {
    console.log(`* Unknown command ${commandName}`);
  }
}
// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  maxApi.outlet(`* Connected to ${addr}:${port}`);
}
