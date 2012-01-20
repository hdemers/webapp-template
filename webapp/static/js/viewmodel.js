/* Author: Hugues Demers
 * Copyrights 2012
*/
define(["knockout"],
function () {
    var exports = {
        firstName: ko.observable("John"),
        lastName: ko.observable("Doe")
    };
    return exports;
});
