'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('testcasegroups').factory('TestCaseGroups', ['$resource',
	function($resource) {
		return $resource('testcasegroups/:testcasegroupId', {
			testcasegroupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			query: {
				method: 'GET'
			}
		});
	}
]);