/* Author: Hugues Demers
 * Copyrights 2013
  
*/
define([
  "infomsg"
],
function (infomsg) {
  var exports = {}, connection;

  exports.initialize = function (endpoint, onmessage, onopen) {
    console.log("Initializing websocket.");
    connection = new WebSocket('ws://' + location.host + '/' + endpoint);

    // Callback on opening a connection
    connection.onopen = onopen;

    // Log errors
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
      infomsg.error("Websocket error",
        "There was an error connecting to our publish/subscribe channel." +
        " Sorry about that. Please try later.");
    };

    // Log messages from the server
    connection.onmessage = function (message) {
      console.log("Received websocket data");
      onmessage(JSON.parse(message.data));
    };
  };

  return exports;
});


