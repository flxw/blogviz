angular.module('postPopupPage').factory('PageDataService', ['$rootScope', function($rootScope) {
  var pageData = null

  chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    pageData = tabData
    $rootScope.$apply()
  })

  return {
    getPageData: function() { return pageData }
  }
}])