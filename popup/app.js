'use strict';

var app = angular.module('postPopupPage', ['ngRoute', 'highcharts-ng', 'ngAnimate']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/page', {
      controller:  'PageController',
      templateUrl: '/popup/views/page.html'
    })
    .when('/page/similarPages', {
      controller:  'SimilarPageController',
      templateUrl: '/popup/views/similarpages.html'
    })
    .when('/post', {
      controller:  'PostController',
      templateUrl: '/popup/views/post.html'
    })
}])