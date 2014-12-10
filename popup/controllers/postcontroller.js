angular.module('postPopupPage').controller('PostController', ['$scope', '$location', function($scope, $location) {

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
    $scope.postData = tabData
    
    $scope.chartConfig.series = [{ type:'pie', name: 'Sentiments'}]

    var chartData = []
    for (var peter in tabData.sentiments) {
      chartData.push([peter, tabData.sentiments[peter].count])
    }
    
    chartData.push("Peter",1112)
    chartData.push("Sabine",2)
    chartData.push("Thomas",12)
    chartData.push("Goerttler",2)
    chartData.push("Felix",12)
    chartData.push("Spaten",2)
    chartData.push("Hallo",12)
    chartData.push("Sibne",2)
    
    $scope.chartConfig.series[0].data = chartData
    
    
    $scope.$apply()
  })
}])