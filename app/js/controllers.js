'use strict';
/* App Controllers */

App.controller('StreamController',['$scope','scrollService', 'githubService' ,function ($scope, scrollService, githubService) {

    var currentPage = 1;

    //https://github.com/angular/angular.js/issues/943
    $scope.username = {value: ""};

    scrollService.observe('EndReached').subscribe(function(){
        currentPage++;
        githubService.fetchEventStream($scope.username.value, currentPage)
                     .subscribe(function(data){
                        $scope.$apply(function(){
                            angular.forEach(data, function(value){
                                $scope.stream.push(value);
                            });
                            angular.extend($scope.projects, githubService.extractProjects(data));
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
        $scope.showFilter = !$scope.showFilter;
    };

}]);