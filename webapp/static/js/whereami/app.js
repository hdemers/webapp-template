/* Author: Hugues Demers
 * Copyrights 2013
  
*/
/*global Peer:false, appConfig:false*/
define([
  "jquery",
  "underscore",
  "knockout",
  "map",
  "viewmodel",
  "peerjs"
],
function ($, _, ko, map, viewmodel) {
  var exports = {}, mapElement = 'map',
    myId = "hdemersgmailcom", peerId = "huguesdemersgmailcom",
    peer = null;

  exports.initialize = function () {
    console.log("Initializing 'whereami' app.");
    
    ko.applyBindings(viewmodel);

    // Build our map.
    map.initialize(mapElement);

    // Connect to the PeerServer Cloud
    peer = new Peer(myId,
      {key: appConfig.peerserverApiKey}
    );
    
    peer.on('error', function (error) {
      console.log(error);
    });

    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        console.log('Got data:', data);
      });
    });

    peer = new Peer(peerId,
      {key: appConfig.peerserverApiKey}
    );
    var conn = peer.connect(myId);
    conn.on('open', function () {
      console.log("Peer connection opened.");
      conn.send('Hello world!');
    });
  };

  viewmodel.connect = function () {
    console.log("Locate");
  };
  return exports;
});

