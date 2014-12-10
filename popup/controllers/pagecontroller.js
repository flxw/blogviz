angular.module('postPopupPage').controller('PageController', ['$scope', '$location', function($scope, $location) {
  $scope.pageData = {}

  $scope.chartConfig = {
    title: {
      text: ''
    },
    series: [{
      type: 'pie',  
      data: []
    }],
    loading: false
  }


  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.pageData = tabData

    $scope.chartConfig.series = [{ type:'pie', name: 'Sentiments'}]

    var chartData = []
    for (var peter in tabData.sentiments) {
      chartData.push([peter, tabData.sentiments[peter].count])
    }
    
    $scope.chartConfig.series[0].data = chartData

    $scope.$apply()
  })
}])