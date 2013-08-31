/* Author: Hugues Demers
 * Copyrights 2013
  
*/
/*global Peer:false, appConfig:false, CryptoJS:false*/
define([
  "jquery",
  "underscore",
  "knockout",
  "map",
  "viewmodel",
  "md5",
  "peerjs"
],
function ($, _, ko, map, viewmodel) {
  var exports = {}, mapElement = 'map',
    myId = "hdemersgmailcom", peerId = "huguesdemersgmailcom",
    peer = null,
    addUser;

  exports.initialize = function () {
    console.log("Initializing 'whereami' app.");
    
    ko.applyBindings(viewmodel);

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
    var conn = peer.connect(myId, {serialization: "json"});
    conn.on('open', function () {
      console.log("Peer connection opened.");
      conn.send('Hello world!');
      // Build our map.
      map.initialize(mapElement);
      
      map.on('locationfound', function (location) {
        console.log("Received location data.");
        var data = {
          latlng: location.latlng.lat,
          sender: myId
        };
        conn.send(data);
        $.ajax({
          url: '/report',
          data: data
        });
      });

    });
  };

  viewmodel.connect = function () {
    console.log("Locate");
  };


  addUser = function (location, email) {
    var iconUrl = "http://www.gravatar.com/avatar/" + CryptoJS.MD5(email);
    map.addMarker(location, iconUrl);
  };

  return exports;
});

