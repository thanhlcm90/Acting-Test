'use strict';

angular.module('testcasegroups').controller('TestCaseGroupsController', TestCaseGroupsController);
angular.module('testcasegroups').controller('TestCaseGroupsEditController', TestCaseGroupsEditController);
angular.module('testcasegroups').controller('TestCaseGroupsInfoController', TestCaseGroupsInfoController);

function TestCaseGroupsInfoController($scope, $stateParams, $location, Authentication, TestCaseGroups, TestCases, ngTableParams, Utils, Notify) {
    $scope.authentication = Authentication;
    $scope.listTypes = {
        'begin_text': 'Begin Text',
        'hint': 'Hint',
        'answer': 'Answer',
        'framework': 'Framework',
        'infop': 'InfoP',
        'info': 'Info',
        'message': 'Message'
    };
    $scope.joinArray = joinArray;
    $scope.remove = function(testcasegroup) {
        if (testcasegroup) {
            $scope.testcasegroup = TestCaseGroups.get({
                testcasegroupId: testcasegroup._id
            }, function(data) {
                $scope.testcasegroup.$remove(function() {
                    $scope.tableParams.reload();
                });
            });
        } else {
            $scope.testcasegroup.$remove(function() {
                $location.path('testcasegroups');
            });
        }
    };

    $scope.findOne = function() {
        $scope.testcasegroup = TestCaseGroups.get({
            testcasegroupId: $stateParams.testcasegroupId
        }, function() {
            getTestCase();
        });
    };

    $scope.addNew = function() {
        $location.path('testcases/create');
    };
    $scope.rowClick = function(id) {
        $location.path('/testcasegroups/' + $stateParams.testcasegroupId + '/testcases/' + id + '/edit');
    }

    function joinArray(arr) {
        if (arr && Array.isArray(arr)) {
            return arr.join(', ');
        } else {
            return '';
        }
    }

    function getTestCase() {
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                code: 'asc' // initial sorting
            }
        }, {
            total: 0, // length of data
            counts: [], // hide page counts control
            getData: function($defer, params) {
                var param = Utils.parsePagingParams(params);
                param.group = $scope.testcasegroup._id;
                var r = TestCases.query(param);
                if (r) {
                    r.$promise.then(function(response) {
                        console.log(response);
                        params.total(response.item_total);
                        $scope.testcases = response.data;
                        $defer.resolve($scope.testcases);
                    }, function(err, statusCode) {
                        params.total(0);
                        $scope.testcases = [];
                        $defer.resolve($scope.testcases);
                    });
                } else {
                    params.total(0);
                    $defer.resolve([]);
                }
            }
        });
    }
}

function TestCaseGroupsEditController($scope, $stateParams, $location, Authentication, TestCaseGroups, ngTableParams, Utils, Notify) {
    $scope.authentication = Authentication;

    $scope.findOne = function() {
        $scope.testcasegroup = TestCaseGroups.get({
            testcasegroupId: $stateParams.testcasegroupId
        });
    };

    $scope.create = function() {
        var testcasegroup = new TestCaseGroups({
            name: this.name,
            author: this.author,
            note: this.note
        });
        testcasegroup.$save(function(response) {
            $scope.name = '';
            $scope.author = '';
            $scope.note = '';
            Notify.addSuccess();
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    $scope.update = function() {
        var testcasegroup = $scope.testcasegroup;
        testcasegroup.$update(function() {
            Notify.editSuccess();
            $location.path('testcasegroups/' + testcasegroup._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

}

function TestCaseGroupsController($scope, $stateParams, $location, Authentication, TestCaseGroups, ngTableParams, Utils, Notify) {
    var initializing = true
    $scope.authentication = Authentication;

    // config tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $scope.addNew = function() {
        $location.path('testcasegroups/create');
    };

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: {
            date_created: 'desc' // initial sorting
        }
    }, {
        total: 0, // length of data
        counts: [], // hide page counts control
        getData: function($defer, params) {
            var param = Utils.parsePagingParams(params);
            var r = TestCaseGroups.query(param);
            if (r) {
                r.$promise.then(function(response) {
                    params.total(response.item_total);
                    $scope.testcasegroups = response.data;
                    $defer.resolve($scope.testcasegroups);
                }, function(err, statusCode) {
                    params.total(0);
                    $scope.testcasegroups = [];
                    $defer.resolve($scope.testcasegroups);
                });
            } else {
                params.total(0);
                $defer.resolve([]);
            }
        }
    });

    $scope.rowClick = function(id) {
        $location.path("/testcasegroups/" + id);
    }
}
