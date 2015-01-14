angular.module('postPopupPage').controller('PostController', ['$scope', '$location', function($scope, $location) {
  $scope.postData = {}
  
  $scope.chartConfig = {
    title: {
      text: ''
    },
    options: {
      chart: {
        backgroundColor: null,
        type: 'pie'
      }
    },
    series: [{
      data: []
    }],
    loading: false
  }

  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.postData = tabData
    $scope.count = 0
    
    $scope.chartConfig.series = [{ type:'pie', name: 'Sentiments'}]

    var chartData = []
    for (var peter in tabData.sentiments) {
      chartData.push([peter, tabData.sentiments[peter].count])
    }
    
    $scope.chartConfig.series[0].data = chartData
    
  
    $scope.$apply()
  })
  
  $scope.openPageInNewTab = function(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }
 
}])