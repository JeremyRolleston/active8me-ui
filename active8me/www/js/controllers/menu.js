app.controller('Menu',['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.showSpinner = false; 
	$scope.header = $scope.defaultHeader + '<div class="sub-header">MENU</div>';

	$scope.toggleMenu();
}]);