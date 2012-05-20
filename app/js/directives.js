App.directive('mobilecheckbox', function() {
    return {
        restrict: 'E',
        replace: true,
        template:
            '<div class="ui-checkbox">'+
                '<label class="ui-btn ui-btn-corner-all ui-btn-icon-left ui-btn-up-c" ng-class="{\'ui-icon-checkbox-on\': value(), \'ui-icon-checkbox-off\': !value()}">'+
                '<span class="ui-btn-inner ui-btn-corner-all">'+
                '<span class="ui-btn-text">{{title()}}</span>'+
                '<span class="ui-icon ui-icon-shadow" ng-class="{\'ui-icon-checkbox-on\': value(), \'ui-icon-checkbox-off\': !value()}"> </span>'+
                '</span>'+
                '</label>'+
                '</div>',

        link: function(scope, element, attrs, controller) {
            element.bind('click', function() {
                scope.$apply(function(){
                    scope.value(!scope.value());
                });
            });
        },
        scope: {
            value: 'accessor',
            title: 'accessor'
        }
    }
});
