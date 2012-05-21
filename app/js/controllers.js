'use strict';
/* App Controllers */

App.controller('StreamController',['$window', '$defer', '$scope','scrollService', 'githubService' ,function ($window, $defer, $scope, scrollService, githubService) {

    var currentPage = 1;

    //https://github.com/angular/angular.js/issues/943
    $scope.username = {value: ""};

    scrollService.observe('EndReached').subscribe(function(){

        if($scope.showFilter){
            return;
        }

        currentPage++;
        githubService.fetchEventStream($scope.username.value, currentPage)
                     .subscribe(function(data){
                        $scope.$apply(function(){
                            angular.forEach(data, function(value){
                                $scope.stream.push(value);
                            });
                            $scope.project = angular.extend({}, githubService.extractProjects(data), $scope.projects);
                        });
                     })

    });

    $scope.stream = [];

    $scope.refreshData = function(){
        githubService
            .fetchEventStream($scope.username.value, 1)
            .subscribe(function(data){
                if (!resetDataIfInvalid(data)){
                    $scope.$apply(function(){
                        $scope.stream = data;
                        $scope.projects = githubService.extractProjects(data);
                    });
                }
            });
        currentPage = 1;
    };

    var resetDataIfInvalid = function(data){
        if (data.message){
            $scope.$apply(function(){
                $scope.stream = [];
                $scope.projects = [];
            });
            return true;
        }
        return false;
    };

    //object map of repositories for the filter to show
    $scope.repositories = { };

    $scope.filterByProject = function(item){
        return $scope.projects[item.repo.name] && $scope.projects[item.repo.name].show;
    };

    $scope.showFilter = false;

    $scope.toggleFilter = function(){

        if (!$scope.showFilter){
            $scope.scrollPosition = scrollService.getScrollPosition();
        }

        $scope.showFilter = !$scope.showFilter;

        if (!$scope.showFilter){
            $defer(function(){
                $window.scrollTo(0, $scope.scrollPosition);
            });
        }

    };

    $scope.scrollPosition = 0;

}]);