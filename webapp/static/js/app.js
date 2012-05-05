/* Author: Hugues Demers
 * Copyrights 2012
*/
/*global appConfig:false */
define([
  "jquery",
  "underscore",
  "knockout",
  "viewmodel",
  "graph",
  "viz",
  "bootstrap"
],
function ($, _, ko, viewmodel, graph, viz) {
  var exports = {};

  exports.initialize = function () {
    console.log("Initializing app.");
    graph.initialize("graphContainer1");
    viz.initialize();
    ko.applyBindings(viewmodel);
  };
  return exports;
});
