'use strict';

var App = angular
            .module('App',[])
            .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/stream', {template: 'streamview.html', controller: 'StreamController'});
            $routeProvider.otherwise({redirectTo: '/stream'});
          }]);
