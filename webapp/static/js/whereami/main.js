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
    "bootstrap": "other/bootstrap.min",
    "leaflet": "http://cdn.leafletjs.com/leaflet-0.6.4/leaflet",
    "usermarker": "other/leaflet.usermarker"
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
    }
  }
});

require(['domReady', 'whereami/app'],
function (domReady, app) {
  domReady(function () {
    console.log("DOM ready.");
    app.initialize();
  });
});



