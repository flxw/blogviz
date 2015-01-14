'use strict';

angular.module('postPopupPage').controller('PageController', ['$scope', '$location', 'PageDataService', function($scope, $location, dataService) {
  $scope.dataService = dataService
  $scope.pageData = null
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

 $scope.showSimilarPages = function() {
    $location.path('/page/similarPages')
  }

  $scope.showLinkedPosts = function() {
    $location.path('/page/linkedPosts')
  }

  $scope.$watch('dataService.getPageData()', function(pageData) {
    if (pageData === null) {
      return
    }

    var sentimentSeries = {
      name: 'Score',
      data: []
    }

    for (var peter in pageData.sentiments) {
      sentimentSeries.data.push([peter, pageData.sentiments[peter].count])
    }

    $scope.chartConfig.series.push(sentimentSeries)
    $scope.pageData = pageData
    $scope.chartConfig.loading = false
  })
}])