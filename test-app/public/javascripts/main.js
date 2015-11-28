var APP = angular.module('AppTest', [ ]);
APP.controller("taskController", function($scope){
	$scope.tasks = [
	];
	var tasks = $scope.tasks;
	
	$scope.addURL = function(){
		$scope.tasks.push({});
	};
	$scope.removeURL = function($index){
		$scope.tasks.splice($index, 1);
	};
});

APP.controller("actionController", function($scope){
	$scope.actions = [
		{
			name: 'Click',
			value: 'click'
		},
		{
			name: 'Mouse Over',
			value: 'mouseOver'
		}
	];
	
});