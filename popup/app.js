'use strict';

var app = angular.module('postPopupPage', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/page', {
      controller:  'PageController',
      templateUrl: '/popup/views/page.html'
    })
    .when('/post', {
      controller:  'PostController',
      templateUrl: '/popup/views/post.html'
    })
    .otherwise({
      redirectTo: '/page'
    })
}])