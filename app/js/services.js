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

    return self;

}]);

App.factory('githubService', ['$window', function($window){

    self.fetchEventStream = function(username, page){
        return $.ajaxAsObservable({
            url: "https://api.github.com/users/" + username + "/received_events?page=" + page,
            dataType: "jsonp"
        })
        .select(function(payload){
            return payload.data.data;
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