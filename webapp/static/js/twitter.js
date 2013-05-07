/* Author: Hugues Demers
 * Copyrights 2013
*/
/*global Pusher:false, appConfig:false */
define([
  "jquery",
  "underscore",
  "pusher",
  "infomsg"
],
function ($, _, Pusher, infomsg) {
  var exports = {},
    pusher = new Pusher(appConfig.subscribeKey),
    channel = pusher.subscribe(appConfig.channel);


  /**
   * Subscribe to a Pusher channel.
   */
  exports.init = function () {

    pusher.connection.bind('error', function (msg) {
      if (msg.error.data.code === 4004) {
        infomsg.error("Connection error",
          "There was an error connecting to our publish/subscribe channel." +
          " Sorry about that. Please try later.");
      }
      console.error(msg);
    });
    
    channel.bind('pusher:subscription_error', function (status) {
      console.error("status");
      infomsg.error("Subscription error",
      "Could not subscribe to our pub/sub channel. Sorry about that. " +
      "Please come back later.");
    });

  };

  exports.bind = function (event, callback) {
    channel.bind(event, callback);
  };

  return exports;
});
