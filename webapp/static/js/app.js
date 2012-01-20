/* Author: Hugues Demers
 * Copyrights 2012
*/
define(["jquery", "underscore", "viewmodel", "graph", "knockout"],
function ($, _, viewmodel, graph) {
    var exports = {};

    exports.initialize = function () {
        console.log("Initializing app.");
        graph.initialize("graphContainer1");
        ko.applyBindings(viewmodel);
    };
    return exports;
});
