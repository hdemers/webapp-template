/* Author: Hugues Demers
 * Copyrights 2013
 *
 * Draw a world map and provide a method `dot` to add small circle on the map.
 *
 * Function `create` returns a worldmap object with a method `dot` for adding
 * circles.
 */
/*global d3:false topojson:false*/
define([
  "jquery",
  "topo",
  "d3",
  "projection"
],
function ($, topo, d3) {
  var exports = {};

  // Draw the world.
  exports.create = function (container) {
    var that = {},
      height, width,
      path, projection, svg, g,
      deferred;

    that.draw = function () {
      deferred = $.Deferred();
      that.promise = deferred.promise();

      width = $(container).width();
      height = $(container).height();

      projection = d3.geo.ginzburg5()
        .scale(width * 0.22)
        .center([0, 0])
        .rotate([0, 0])
        .translate([width / 2.1, height / 1.9]);

      path = d3.geo.path()
        .projection(projection);

      svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height);

      g = svg.append("g");

        // Load country data and draw.
      d3.json("/static/js/other/world-50m.json",
      function (error, world) {
        g.insert("path")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", "land")
          .attr("d", path);

        g.insert("path")
          .datum(
            topojson.mesh(world, world.objects.countries, function (a, b) {
              return a !== b;
            }))
              .attr("class", "boundary")
              .attr("d", path);
        deferred.resolve();
      });

      svg.call(d3.behavior.zoom()
        .on("zoom", function () {
          g.attr("transform", "translate(" +
            d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
          g.selectAll("path")
            .attr("d", path.projection(projection));
        }));
    };

    // Draw a dot on the world. Wait for the world to be drawn first.
    that.dot = function (data) {
      deferred.done(function () {
        g.selectAll("circle")
          .data(data)
          .enter()
            .append("circle")
            .attr("cx", function (d) {
              return projection([d.lng, d.lat])[0];
            })
            .attr("cy", function (d) {
              return projection([d.lng, d.lat])[1];
            })
            .attr("r", function (d) {return d.r; })
            .attr("class", "dot")
          .transition()
            .duration(200)
            .attr("r", function (d) {return d.r * 10; })
          .transition()
            .duration(200)
            .attr("r", function (d) {return d.r; });
      });

    };

    // Redraw the map
    that.redraw = function () {
      if ($(container).width() !== width) {
        // Remove everything under `container`.
        $(container).children().remove();
        that.draw();
      }
    };

    that.draw();
    return that;
  };


  return exports;
});

