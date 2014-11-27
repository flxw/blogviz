'use strict';

var app = angular.module('postPopupPage', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/', {
    controller:  'LandingController',
    templateUrl: '/popup/views/landing.html'
  })
  .otherwise({
    redirectTo: '/'
  })
}])