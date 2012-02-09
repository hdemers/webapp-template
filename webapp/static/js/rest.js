define(["json2"],
function () {
  var ajax, 
    errorCallback,
    exports = {};

  exports.get = function (resource, query, callback) {
    ajax("GET", resource, query, callback, false);
  };

  exports.del = function (resource, query, callback) {
    ajax("DELETE", resource, query, callback, false);
  };

  exports.put = function (resource, data, callback) {
    ajax("PUT", resource, data, callback, true);
  };

  ajax = function (requestType, resource, queryOrData, callback, jsonData) {
    var contentType, processData;

    contentType = "application/x-www-form-urlencoded";
    processData = true;
    if (jsonData) {
      queryOrData = JSON.stringify(queryOrData);
      contentType = "application/json";
      processData = false;
    }

    $.ajax({
      type:        requestType,
      url:         resource,
      data:        queryOrData,
      dataType:    "json",
      processData: processData,
      contentType: contentType,
      error:       errorCallback,
      success:     callback
    });
  };

  errorCallback = function (xmlHttpRequest, textStatus, errorThrown) {
    console.error("Error while connecting to server: ", xmlHttpRequest);
  };

  return exports;
});


