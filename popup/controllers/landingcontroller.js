angular.module('postPopupPage').controller('LandingController', ['$location', function($location) {
  $scope.pageData = {}

  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.pageData = tabData
  })
}])