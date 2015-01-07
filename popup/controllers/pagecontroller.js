'use strict';

angular.module('postPopupPage').controller('PageController', ['$scope', '$location', 'PageDataService', function($scope, $location, dataService) {
  $scope.dataService = dataService
  $scope.pageData = null
  $scope.chartConfig = {
    title: {
      text: ''
    },
    series: [{
      type:'pie',
      name: 'Sentiments'
    }],
    loading: true
  }

  $scope.showSimilarPages = function() {
    $location.path('/page/similarPages')
  }

  $scope.$watch('dataService.getPageData()', function(pageData) {
    if (pageData === null) {
      return
    }

    var chartData = []
    for (var peter in pageData.sentiments) {
      chartData.push([peter, pageData.sentiments[peter].count])
    }

    console.log(pageData)
    $scope.pageData = pageData
    $scope.chartConfig.loading = false
    $scope.chartConfig.series[0].data = chartData
  })
}])