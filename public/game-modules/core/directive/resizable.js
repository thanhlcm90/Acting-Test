(function() {
	'use strict';

    angular.module('core').directive('resizable', resizableDirective);
    
    resizableDirective.$inject = ['$window', '$timeout'];

    function resizableDirective($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                resizable: '&',
                optTop: '@'
            },
            link: function($scope, iElement, iAttrs) {
                var extraTop = $scope.optTop ? parseInt($scope.optTop) : 30;
                $timeout(function() {
                    var top = iElement.offset().top;
                    var height = $window.innerHeight - top - extraTop;
                    iElement.height(height);
                    if ($scope.resizable) {
                        $scope.resizable({
                            '$height': height
                        });
                    }
                });
                return angular.element($window).bind('resize', function() {
                    var top = iElement.offset().top;
                    var height = $window.innerHeight - top - extraTop;
                    iElement.height(height);
                    if ($scope.resizable) {
                        $timeout(function() {
                            $scope.resizable({
                                '$height': height
                            });
                        });
                    }
                });
            }
        };
    }
})();