'use strict';

var app = angular.module('postPopupPage', ['ngRoute', 'highcharts-ng']);

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
    .when('/page/similarPosts', {
      controller:  'SimilarPostController',
      templateUrl: '/popup/views/linkedposts.html'
    })
    .when('/post', {
      controller:  'PostController',
      templateUrl: '/popup/views/post.html'
    })
}])