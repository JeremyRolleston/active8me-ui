app.controller('MyProgressTools', ['$scope', '$rootScope', '$state', '$cordovaDevice', function($scope, $rootScope, $state ,$cordovaDevice){
	$rootScope.showSpinner = false; 
	$scope.header = $scope.defaultHeader + '<div class="sub-header">' + $state.$current.data.title + '</div>';	
}]);