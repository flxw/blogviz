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
        type: 'scatter'
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

    var i = 0
    for (var peter in pageData.sentiments) {
      $scope.chartConfig.series.push({
        name: peter,
        data: [[i++, pageData.sentiments[peter].count]]
      })
    }

    $scope.pageData = pageData
    $scope.chartConfig.loading = false
  })
}])