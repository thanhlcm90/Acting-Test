'use strict';

// Setting up route
angular.module('testcases').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('createTestCase', {
			url: '/testcasegroups/:testcasegroupId/testcases/create',
			templateUrl: 'modules/testcases/views/create-testcase.client.view.html'
		}).
		state('editTestCase', {
			url: '/testcasegroups/:testcasegroupId/testcases/:testcaseId/edit',
			templateUrl: 'modules/testcases/views/edit-testcase.client.view.html'
		});
	}
]);