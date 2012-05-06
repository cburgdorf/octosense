'use strict';
/*

var App = angular
            .module('myApp',[])
            .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/stream', {template: 'partials/streamview.html', controller: 'StreamController'});
            $routeProvider.otherwise({redirectTo: '/stream'});
          }]);
*/


var App = angular
    .module('App',[], function($routeProvider){
        $routeProvider.when('/stream', {template: 'partials/streamview.html', controller: 'StreamController'});
        $routeProvider.otherwise({redirectTo: '/stream'});
    });
