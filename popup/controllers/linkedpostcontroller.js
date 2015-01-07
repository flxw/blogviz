'use strict';

angular.module('postPopupPage').controller('LinkedPostController', ['$scope', '$location', 'PageDataService', function($scope, $location, dataService) {
  $scope.pageData = dataService.getPageData()

  $scope.goBack = function() {
    $location.path('/page')
  }
}])