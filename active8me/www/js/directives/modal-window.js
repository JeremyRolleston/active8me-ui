app.directive('modalWindow', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/modal-window.html',
		scope: {
			doneFn: '&',
			closeFn: '&'
		},
		link: function(scope, link, attr){
			console.log(attr);
			scope.myStatus = attr.status ? attr.status : 'close';
			scope.attr = angular.copy(attr);
			console.log(scope.myStatus, scope.attr)
		},
		controller: function($scope){
			$scope.closeMe = function(){
				$scope.closeFn();
				$scope.myStatus = false;
			};
			$scope.openMe = function(){
				$scope.myStatus = true;
			};
			$scope.onDone = function(){
				console.log($scope);
				$scope.doneFn();
				$scope.myStatus = false;
			};
		}
	}
})