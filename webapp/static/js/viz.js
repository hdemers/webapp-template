/* Author: Hugues Demers
 * Copyrights 2012
 */
/*global */
define(["jquery", "underscore", "viewmodel", "d3"],
function ($, _, viewmodel) {
  var exports = {};

  // The following bar chart is taken from the D3 tutorial:
  // http://mbostock.github.com/d3/tutorial/bar-1.html
  exports.initialize = function () {
    console.log("Initializing viz.");
    var data = [4, 8, 15, 16, 23, 42],
      chart = d3.select(".viz")
        .attr("class", "chart viz")
        .attr("width", 420)
        .attr("height", 20 * data.length),
      x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]),
      y = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, 120]);

    chart.selectAll("rect")
        .data(data)
      .enter().append("rect")
        .attr("y", y)
        .attr("width", x)
        .attr("height", 20);

    chart.selectAll("text")
        .data(data)
      .enter().append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text(String);
  };


  return exports;
});


