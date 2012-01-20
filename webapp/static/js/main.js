/* Author: Hugues Demers
 * Copyrights 2012
*/
require({
    paths: {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min",
        "jquery-tmpl": "http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min",
        "knockout": "other/knockout-2.0.0",
        "json2": "other/json2",
        "underscore": "other/underscore-min",
        "domReady": "other/domReady"
    }
});

require(['domReady', 'app'], function (domReady, app) {
  domReady(function () {
      console.log("DOM ready.");
      app.initialize();
  });
});


