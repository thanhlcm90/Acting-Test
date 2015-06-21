'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('testcasegroups').factory('TestCases', ['$resource',
	function($resource) {
		return $resource('testcases/:testcaseId', {
			testcaseId: '@_id'
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