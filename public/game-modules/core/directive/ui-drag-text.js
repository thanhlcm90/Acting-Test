(function() {
    /**
     * Created by thanhle on 4/15/2015.
     */
    'use strict';

    /**
     * add directive loading container for DatePicker
     * options: 
     *  - opt-no-time: not show time picker
     * 
     */
    angular.module('core').directive('uiDragText', [function() {
        return {
            restrict: 'AE',
            scope: {
                uiDragText: '='
            },
            link: function($scope, $elm, $attrs) {
                $elm.attr('draggable', 'true');
                $elm[0].addEventListener('dragstart', function(event) {
                    event.dataTransfer.setData('text/plain', JSON.stringify($scope.uiDragText));
                });
            }
        }
    }]);

    angular.module('core').directive('uiDropText', ['$parse', function($parse) {
        return {
            restrict: 'AE',
            link: function($scope, $elm, $attrs) {
                /* events fired on the drop targets */
                $elm[0].addEventListener('dragover', function(event) {
                    // prevent default to allow drop
                    event.preventDefault();
                });
                $elm[0].addEventListener('drop', function(event) {
                    // prevent default action (open as link for some elements)
                    event.preventDefault();
                    var data = event.dataTransfer.getData("text");
                    try {
                        var obj = JSON.parse(data);
                        $scope.$apply(function() {
                            //$parse method, this allows parameters to be passed
                            var invoker = $parse($attrs.uiDropText);
                            invoker($scope, {
                                $data: obj
                            });
                        });
                    } catch (e) {}
                });
            }
        }
    }]);
})();
