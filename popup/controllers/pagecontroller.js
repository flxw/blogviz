'use strict';

angular.module('postPopupPage').controller('PageController', ['$scope', '$location', 'PageDataService', function($scope, $location, dataService) {
  $scope.dataService = dataService
  $scope.pageData = null
  $scope.chartConfig = {
    series: [],
    options: {
      title: '',
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

  var sentimentColors = {
    'StrongNegativeSentiment': '#b1063a',
    'WeakNegativeSentiment': '#dd6108',
    'NeutralSentiment': '#5a6065',
    'WeakPositiveSentiment': '#f6a800',
    'StrongPositiveSentiment': '#007a9e'
  }

  $scope.showSimilarPages = function() {
    $location.path('/page/similarPages')
  }

  $scope.$watch('dataService.getPageData()', function(pageData) {
    if (pageData === null) {
      return
    }

    var sentimentSeries = {
      name: 'Count',
      data: []
    }

    for (var peter in pageData.sentiments) {
      sentimentSeries.data.push({
        name: peter,
        y: pageData.sentiments[peter].count,
        color: sentimentColors[peter]
      })
    }

    $scope.chartConfig.series.push(sentimentSeries)
    $scope.pageData = pageData
    $scope.chartConfig.loading = false
  })
}])