'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['ngRoute', 'myApp.config', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'firebase']
   )

    // configure views; note the authRequired parameter for authenticated pages
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/survey', {
            templateUrl: 'partials/survey.html',
            controller: 'surveyCtrl'
        });

        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        });

        $routeProvider.when('/result', {
            authRequired: true,
            templateUrl: 'partials/result.html',
            controller: 'resultCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/survey'});

    }])

   // establish authentication
   .run(['angularFireAuth', 'FBURL', '$rootScope', function(angularFireAuth, FBURL, $rootScope) {
      angularFireAuth.initialize(FBURL, {scope: $rootScope, name: "auth", path: '/login'});
      $rootScope.FBURL = FBURL;
   }]);