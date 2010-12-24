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
        });
    });

/*    Rx.Observable
        .getJSONPRequest("https://api.github.com/users/cburgdorf/received_events")
        .subscribe(function(data){
            console.log(data);
        });*/

    $scope.foo = "blubb";

}
MyCtrl1.$inject = ['$scope', '$browser'];


function MyCtrl2() {
    this.foo = "blubb";
}
MyCtrl2.$inject = [];
