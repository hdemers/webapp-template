/* Author: Hugues Demers
 * Copyrights 2013
*/
require({
  baseUrl: "static/js",
  paths: {
    "jquery": "other/jquery-1.9.1.min",
    "knockout": "other/knockout-2.2.1",
    "underscore": "other/underscore-min",
    "domReady": "other/domReady",
    "bootstrap": "//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min",
    "leaflet": "http://cdn.leafletjs.com/leaflet-0.6.4/leaflet",
    "usermarker": "other/leaflet.usermarker",
    "peerjs": "http://cdn.peerjs.com/0/peer",
    "md5": "http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5"
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'knockout': {
      exports: 'ko'
    },
    'bootstrap': {
      exports: 'bootstrap',
      deps: ['jquery']
    },
    'leaflet': {
      exports: 'leaflet',
    },
    'usermarker': {
      exports: 'usermarker',
      deps: ['leaflet']
    },
    'peerjs': {
      exports: 'peerjs'
    },
    'md5': {
      exports: 'md5'
    }
  }
});

require(['domReady', 'whereami/app', 'bootstrap'],
function (domReady, app) {
  domReady(function () {
    console.log("DOM ready.");
    app.initialize();
  });
});



