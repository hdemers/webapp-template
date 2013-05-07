/* Author: Hugues Demers
 * Copyrights 2013
 */
/*global Highcharts:false*/
define([
  "jquery",
  "underscore",
  "viewmodel",
  "highcharts"
],
function ($, _, viewmodel) {
  var exports = {}, chartOptions, serie, chart,
    subscribe,
    showDirect,
    showInverse,
    directSerie,
    inverseSerie,
    addSeries;

  exports.initialize = function () {
    console.log("Initializing graph.");
    subscribe();
    viewmodel.refresh();
  };

  addSeries = function (data) {
    console.log(data);
    _.each(data.data.series, function (serie) {
      chart.addSeries(serie);
    });
    chart.hideLoading();
  };

  viewmodel.refresh = function () {
    if (chart) {
      chart.destroy();
    }
    chart = new Highcharts.Chart(chartOptions);
    chart.showLoading();
    $.ajax({
      url: "/series",
      type: "GET",
      dataType: "json"
    }).done(addSeries);
  };

  subscribe = function () {
    viewmodel.direct.subscribe(showDirect);
    viewmodel.inverse.subscribe(showInverse);
  };

  showDirect = function (checked) {
    if (checked) {
      chart.addSeries(directSerie());
    }
    else {
      chart.get("direct").remove();
    }
  };

  showInverse = function (checked) {
    if (checked) {
      chart.addSeries(inverseSerie());
    }
    else {
      chart.get("inverse").remove();
    }
  };

  directSerie = function () {
    var x = [1, 2, 3, 4, 5, 6],
      y = [1, 2, 3, 4, 5, 6];
    return {
      name: "direct",
      id: "direct",
      data: _.zip(x, y)
    };
  };

  inverseSerie = function () {
    var x = [1, 2, 3, 4, 5, 6],
      y = [6, 5, 4, 3, 2, 1];
    return {
      name: "inverse",
      id: "inverse",
      data: _.zip(x, y)
    };
  };

    // Chart options.
  chartOptions = {
    chart: {
      renderTo: 'graphContainer1',
      zoomType: 'x',
      defaultSeriesType: 'line',
    },
    colors: ['#094b5c', '#238F00', '#ED561B', '#A4A300', '#24CBE5',
    '#1B6CFF', '#BE0000', '#00EF1D', '#AB00FE', '#00CCA0'],
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: false
    },
    loading: {
      labelStyle: {
        top: '50%',
        fontSize: '16px',
        left: '-5%'
      }
    },
    title: {
      text: "Example graph",
      style: {
        color: '#4f4f4f'
      }
    },
    subtitle: {
      text: "Linear",
      style: {
        color: '#4f4f4f'
      }
    },
    xAxis: {
      title: {
        text: 'X axis',
        style: {
          color: '#4f4f4f',
          fontSize: "12px"
        }
      },
      lineColor: '#c9c9c9'
    },
    yAxis: {
      title: {
        text: 'Y axis',
        style: {
          color: '#4f4f4f',
          fontSize: "12px"
        }
      },
      lineColor: '#c9c9c9'
    },
    legend: {
      enabled: true,
      itemStyle: {
        color: '#4e4e4e'
      },
      align: 'top',
      layout: 'horizontal',
      borderWidth: 0,
      verticalAlign: 'top',
    },
    plotOptions: {
      line: {
        visible: true,
        marker: {
          enabled: false
        }
      }
    }
  };

  return exports;
});

