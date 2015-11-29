var APP = angular.module('AppTest', ['ngWebSocket']);
APP.controller("taskController", function($scope, $websocket){
	const ws_path = 'ws://127.0.0.1:8080/test';
	$scope.tasks = [
	];
	var dataStream;
	$scope.socketState = false;
	
	var tasks = $scope.tasks;

	setInterval(function(){
		if(typeof dataStream == 'undefined' || dataStream.readyState > 1) {
			setSocketConnection();
		}
	}, 1000);
	


	$scope.addURL = function(){
		$scope.tasks.push({});
	};
	$scope.addAction = function($index){
		if(typeof $scope.tasks[$index].actions == 'undefined')
			$scope.tasks[$index].actions = [];
		$scope.tasks[$index].actions.push({});
	};
	$scope.removeAction = function($index, $parent_index){
		$scope.tasks[$parent_index].actions.splice($index, 1);
	};
	$scope.removeURL = function($index){
		$scope.tasks.splice($index, 1);
	};
	$scope.startTest = function(){
		if(!$scope.socketState)
			setSocketConnection();
		var sendData = {
			tasks: $scope.tasks,
			formuid: $scope.formid
		};
		console.log(JSON.stringify(sendData));
		dataStream.send(JSON.stringify(sendData));
	};

	function setSocketConnection() {
	    dataStream = $websocket(ws_path)
		.onOpen(function(){
			$scope.socketState = true;
			$scope.$apply();
		})
		.onError(function(){
			$scope.socketState = false;
			$scope.$apply();
		})
		.onClose(function(){
			$scope.socketState = false;
			$scope.$apply();
		});	
	};

});

APP.controller("actionController", function($scope){
	$scope.actions = [
		{
			name: 'Screen Shoot',
			value: 'screenShoot'
		},
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