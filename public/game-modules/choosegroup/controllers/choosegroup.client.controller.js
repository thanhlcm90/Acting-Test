(function() {
    'use strict';

    angular.module('choosegroup').controller('ChooseGroupController', ChooseGroupController);

    ChooseGroupController.$inject = ['$scope', 'TestCaseGroups'];

    function ChooseGroupController($scope, TestCaseGroups) {
        TestCaseGroups.get(function(response) {
            $scope.listGroups = response.data;
        });
    }
})();
