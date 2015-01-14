angular.module('postPopupPage').controller('PostController', ['$scope', '$location', function($scope, $location) {
  $scope.postData = {}

  $scope.chartConfig = {
    title: {
      text: ''
    },
    series: [],
    options: {
      chart: {
        backgroundColor: null,
        type: 'pie'
      },
      yAxis: {
        min: 0
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth:0,
        lineColor: 'transparent',
        labels: {
          enabled: false
        },
        minorTickLength: 0,
        tickLength: 0
      }
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