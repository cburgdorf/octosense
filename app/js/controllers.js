'use strict';
/* App Controllers */


function MyCtrl1($scope, $browser) {

    $scope.stream = [{type:"foo"}];

    $.ajaxAsObservable({
        url: "https://api.github.com/users/cburgdorf/received_events",
        dataType: "jsonp"
    })
    .select(function(payload){
        return payload.data.data;
    })
/*    .select(function(data){
            return $.map(data, function(item){
                return {
                    repository: item.repo.name,
                    message: item.payload.comment ? item.payload.comment.body : ""
                }
            });
    })*/
    .subscribe(function(data){
        console.log(data);
        $scope.$apply(function(){
            $scope.stream = data;

            $scope.projects =  _.chain(data)
                                .groupBy(function(item){
                                    return item.repo.name;
                                })
                                .map(function(x) { return x[0].repo.name;})
                                .value();
        });
    });

/*    Rx.Observable
        .getJSONPRequest("https://api.github.com/users/cburgdorf/received_events")
        .subscribe(function(data){
            console.log(data);
        });*/

    $scope.doFoo = function(){
        console.log($scope.test)
    };

    $scope.foo = "blubb";

    $scope.repositories = { emberJS: false};

    $scope.filterByProject = function(item){

        if ($scope.repositories.emberJS)
            return item.repo.name.indexOf('ember') > -1;
        else
            return true;
    }

}
MyCtrl1.$inject = ['$scope', '$browser'];


function MyCtrl2() {
    this.foo = "blubb";
}
MyCtrl2.$inject = [];
