'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('choosegroup').factory('TestCaseGroups', ['$resource',
	function($resource) {
		return $resource('testcasegroups');
	}
]);