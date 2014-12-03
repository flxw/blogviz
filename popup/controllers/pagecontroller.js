angular.module('postPopupPage').controller('PageController', ['$scope', '$location', function($scope, $location) {
  $scope.pageData = {}

  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.pageData = tabData
    $scope.$apply()
  })
}])