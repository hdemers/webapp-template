/* Author: Hugues Demers
 * Copyrights 2012
*/
require({
  paths: {
    "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    "knockout": "http://cloud.github.com/downloads/SteveSanderson/knockout/knockout-2.1.0",
    "json2": "other/json2",
    "underscore": "other/underscore-min",
    "domReady": "other/domReady",
    "highcharts": "other/highcharts",
    "bootstrap": "other/bootstrap.min",
    "moment": "other/moment.min",
    "d3": "http://mbostock.github.com/d3/d3",
  },
  priority: [
    "jquery"
  ]
});

require(['domReady', 'app'], 
function (domReady, app) {
  domReady(function () {
    console.log("DOM ready.");
    app.initialize();
  });
});


