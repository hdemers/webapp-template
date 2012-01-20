/* Author: Hugues Demers
 * Copyrights 2012
*/
define(["jquery", "underscore", "viewmodel", "knockout"],
function ($, _, viewmodel) {
    var exports = {};

    exports.initialize = function () {
        console.log("Initializing app.");
        console.log(viewmodel, ko);
        ko.applyBindings(viewmodel);
    };
    return exports;
});
