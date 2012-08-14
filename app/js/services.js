'use strict';

App.factory('scrollService', ['$window', function($window){

    var self = {},
        throttledScroll = Rx.Observable
                       .fromEvent($window,'scroll')
                       .throttle(200),
        endReachedPredicate = function(){
            return $window.window.innerHeight + $window.document.body.scrollTop >= $window.document.body.offsetHeight;
        },
        topReachedPredicate = function() { throw "not implemented ";};

    self.observe = function(event){
        return event === "EndReached" ? throttledScroll.where(endReachedPredicate) : throttledScroll.where(topReachedPredicate);
    };

    self.getScrollPosition = function() {
        var yScroll;
        if ($window.pageYOffset) {
            yScroll = $window.pageYOffset;
        } else if ($window.documentElement && $window.documentElement.scrollTop) {
            yScroll = $window.document.documentElement.scrollTop;
        } else if ($window.document.body) {
            yScroll = $window.document.body.scrollTop;
        }
        return yScroll
    };

    return self;

}]);

App.factory('githubService', ['$http',function($http){

    var username = "", self = {};

    self.setUsername = function(user){
        //update the username in the localStorage
        localStorage.setItem('octosense_username',user);
        //but also cach it locally for further fast use
        username = user;
    };

    self.getUsername = function(){

        //Look if we already cached the username
        if (username.length > 0)
            return username;

        //if not look if we have it in the localStorage
        var tempUser = localStorage.getItem('octosense_username');
        if (tempUser !== undefined && tempUser !== null && tempUser.length > 0)
        {
            //cache it for further use
            username = tempUser;
        }
        return username;
    };

    self.fetchEventStream = function(page){
        return $http({
            method:"jsonp", url:"https://api.github.com/users/" + self.getUsername() + "/received_events?callback=JSON_CALLBACK&page=" + page
        })
        .then(function(value){
            return value.data.data;
        });
    };

    self.extractProjects = function(data){
        return _.chain(data)
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
    };

    return self;

}]);