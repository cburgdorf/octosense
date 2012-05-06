'use strict';
/* App Controllers */


function StreamController($scope, $browser) {

    $scope.stream = [];

    $scope.refreshData = function(username){
        $.ajaxAsObservable({
            url: "https://api.github.com/users/" + username + "/received_events",
            dataType: "jsonp"
        })
        .select(function(payload){
            return payload.data.data;
        })
        .subscribe(function(data){
            console.log(data);
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

}
StreamController.$inject = ['$scope', '$browser'];


function MyCtrl2() {
    this.foo = "blubb";
}
MyCtrl2.$inject = [];
