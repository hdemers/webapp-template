/* Author: Hugues Demers
 * Copyrights 2012
*/
require({
  paths: {
    "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    "knockout": "other/knockout-latest",
    "knockout.mapping": "other/knockout.mapping",
    "json2": "other/json2",
    "underscore": "other/underscore-min",
    "domReady": "other/domReady",
    "highcharts": "other/highcharts",
    "bootstrap": "other/bootstrap.min",
    "moment": "other/moment.min",
    "d3": "http://d3js.org/d3.v2"
  }
});

require(['domReady', 'app'], 
function (domReady, app) {
  domReady(function () {
    console.log("DOM ready.");
    app.initialize();
  });
});


