'use strict';

angular.module('postPopupPage').controller('PostController', ['$scope', '$location', function($scope, $location) {
  $scope.postData = {}

  $scope.chartConfig = {
    series: [],
    options: {
      title: 'Sentiments',
      chart: {
        backgroundColor: null,
        type: 'pie',
        margin: 0
      },
      plotOptions: {
        pie: {
          slicedOffset: 0,
          size: '80%',
          dataLabels: {
              enabled: false
          }
        }
      }
    },
    size: {
      height: 150,
    }
  }

  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.chartConfig.series = []

    var sentimentSeries = {
      name: 'Score',
      data: []
    }
    for (var peter in tabData.sentiments) {
      sentimentSeries.data.push([peter, tabData.sentiments[peter].count])
    }

    $scope.chartConfig.series.push(sentimentSeries)
    $scope.postData = tabData
    $scope.$apply()
  })

  $scope.openPageInNewTab = function(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

}])