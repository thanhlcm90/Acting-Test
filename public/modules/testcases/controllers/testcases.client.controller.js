'use strict';

angular.module('testcases').controller('TestCasesEditController', TestCasesEditController);

function TestCasesEditController($scope, $stateParams, $location, Authentication, TestCases, ngTableParams, Utils, Notify) {
    $scope.authentication = Authentication;
    // setup editor options
    $scope.editorOptions = {
        language: 'en',
        allowedContent: true,
        height: '300px'
    };
    $scope.listTypes = {
        'begin_text': 'Begin Text',
        'hint': 'Hint',
        'answer': 'Answer',
        'framework': 'Framework',
        'infop': 'InfoP',
        'info': 'Info',
        'message': 'Message'
    };

    $scope.findOne = function() {
        $scope.testcase = TestCases.get({
            testcaseId: $stateParams.testcaseId
        }, function() {
            if ($scope.testcase.keywords) {
                $scope.testcase.keyword_string = $scope.testcase.keywords.join(', ');
            }
        });
    };

    $scope.create = function() {
        var testcase = new TestCases({
            code: this.code,
            group: $stateParams.testcasegroupId,
            type: this.type,
            state: this.state,
            keywords: this.keywords ? this.keywords.split(',') : null,
            parent_code: this.parent_code,
            content: this.content,
            reasoning: this.reasoning
        });
        testcase.$save(function(response) {
            $scope.code = $scope.code + 1;
            $scope.keywords = '';
            $scope.parent_code = '';
            $scope.content = '';
            $scope.reasoning = '';
            Notify.addSuccess();
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    $scope.update = function() {
        var testcase = $scope.testcase;
        if (testcase.keyword_string) {
            testcase.keywords = testcase.keyword_string.split(',');
        }
        testcase.$update(function() {
            Notify.editSuccess();
            $location.path('testcasegroups/' + $stateParams.testcasegroupId);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

}
