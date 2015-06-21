'use strict';

// Setting up route
angular.module('testcasegroups').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listTestCaseGroup', {
			url: '/testcasegroups',
			templateUrl: 'modules/testcasegroups/views/list-testcasegroups.client.view.html'
		}).
		state('createTestCaseGroup', {
			url: '/testcasegroups/create',
			templateUrl: 'modules/testcasegroups/views/create-testcasegroup.client.view.html'
		}).
		state('viewTestCaseGroup', {
			url: '/testcasegroups/:testcasegroupId',
			templateUrl: 'modules/testcasegroups/views/view-testcasegroup.client.view.html'
		}).
		state('editTestCaseGroup', {
			url: '/testcasegroups/:testcasegroupId/edit',
			templateUrl: 'modules/testcasegroups/views/edit-testcasegroup.client.view.html'
		});
	}
]);