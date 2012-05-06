'use strict';
/* App Controllers */

App.controller('StreamController',['$scope',function ($scope) {

    $scope.stream = [];

    //TODO figure out why the binding doesn't work in the traditional way
    $scope.refreshData = function(username){
        $.ajaxAsObservable({
            url: "https://api.github.com/users/" + username + "/received_events",
            dataType: "jsonp"
        })
            .select(function(payload){
                return payload.data.data;
            })
            .subscribe(function(data){
                if (data.message){
                    $scope.$apply(function(){
                        $scope.stream = [];
                        $scope.projects = [];
                    });
                }
                else{
                    $scope.$apply(function(){
                        $scope.stream = data;

                        $scope.projects =  _.chain(data)
                            .groupBy(function(item){
                                return item.repo.name;
                            })
                            .reduce(function(acc, groupedValues){
                                var name = groupedValues[0].repo.name;
                                acc[name] = {
                                    name: name,
                                    show: true
                                };
                                return acc;
                            }, {})
                            .value();
                    });
                }
            });
    };

    $scope.doFoo = function(){
        console.log($scope.test)
    };

    $scope.foo = "blubb";

    $scope.repositories = { emberJS: false};

    $scope.filterByProject = function(item){
        return $scope.projects[item.repo.name] && $scope.projects[item.repo.name].show;
    };

    $scope.showFilter = false;

    $scope.toggleFilter = function(){
        $scope.showFilter = !$scope.showFilter;
    };

}]);