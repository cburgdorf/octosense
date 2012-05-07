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