app.controller('Home', ['$scope', '$rootScope', '$state', 'homeData', function($scope, $rootScope, $state, homeData){
	if(!homeData.data.status || !homeData.data.status.success){
		$state.go('app.goIn.start');
	}
	else{
		$rootScope.showSpinner = false; 
		$scope.header = $scope.defaultHeader + '<div class="sub-header">HOME</div>';

		$scope.setFeeds(homeData.data.data.feed_info);

		$scope.progressData = {};
		$scope.progressData = homeData.data.data && homeData.data.data.header_info ? homeData.data.data.header_info : {};
		$scope.progressData.progressVal = 0;
		if($scope.progressData.total_points && $scope.progressData.total_points > 0){
			if($scope.progressData.earned_points && $scope.progressData.earned_points > 0){
				$scope.progressData.progressVal = ($scope.progressData.earned_points * 100) / $scope.progressData.total_points;
				$scope.progressData.remaining = $scope.progressData.total_points - $scope.progressData.earned_points;
			}
			else{
				$scope.progressData.earned_points = 0;
				$scope.progressData.remaining = $scope.progressData.total_points;
			}
		}
		$scope.goMyDetails = function(index){
			console.log(index)
			if($scope.feeds && $scope.feeds[index]){
				if($scope.feeds[index].feed_type == 'nutrition'){				
					$state.go('app.loggedin.nutrition', {nutrition_id: $scope.feeds[index].nutrition_id, program_meal_id: $scope.feeds[index].program_nutrition_id},{reload: true});
				}
				else if($scope.feeds[index].feed_type == 'workout'){
					$state.go('app.loggedin.workout', {workout_id: $scope.feeds[index].workout_id, program_workout_id: $scope.feeds[index].program_workout_id});
				}
			}
		};
	}
}]);