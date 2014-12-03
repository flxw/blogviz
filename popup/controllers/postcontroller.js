angular.module('postPopupPage').controller('PostController', ['$scope', '$location', function($scope, $location) {


  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.postData = tabData
    $scope.$apply()
  })
}])