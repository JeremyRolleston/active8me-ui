app.controller('Workout', ['$scope', '$rootScope', '$state', '$sce', '$interval', 'workoutData', 'workoutService', 'commonService', function($scope, $rootScope, $state, $sce, $interval, workoutData, workoutService, commonService){
	if(typeof window.localStorage['loggedInUser'] == 'undefined'){
		$state.go('app.goIn.start')
	}
	$scope.header = $scope.defaultHeader + '<div class="sub-header">' + $state.$current.data.title + '</div>';
	if(workoutData.data && workoutData.data.data && workoutData.data.data){
		$rootScope.showSpinner = false; 
		
		$scope.workoutData = workoutData.data.data;

		var allMethods = ['AT HOME', 'OUTDOORS', 'GYM MACHINES', 'GYM CLASSES', 'OWN WORKOUT'];
		$scope.notRestDay = false;
		$scope.methods = [];
		for (var methodIndex = 0; methodIndex < allMethods.length; methodIndex++) {
			if ($scope.workoutData[allMethods[methodIndex]] !== undefined) {
				$scope.methods.push({id: methodIndex, title: allMethods[methodIndex]});
				$scope.notRestDay = true;
			}
		}


		$scope.showAll = false;
		$scope.toggleAll = function(){
			$scope.showAll = !$scope.showAll;
		};

		
		$scope.changeMethod = function(method){
			$scope.toggleAll();
			$scope.currentMethod = method;
			workoutService.setCurrentPlan($scope.workoutData[method.title]);
		};

		workoutService.setCurrentWorkout(workoutData);

		var getParameterByName = function(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		};

		if($scope.workoutData['AT HOME'] && $scope.workoutData['AT HOME'].WorkoutVideo && $scope.workoutData['AT HOME'].WorkoutVideo.length){
			var videoEmbeddUrl = "https://www.youtube.com/embed/replacethiswithid?rel=0";

			$scope.video = $scope.workoutData['AT HOME'].WorkoutVideo[0];
			var v = getParameterByName('v', $scope.video.video_link);
			if(v){
				$scope.video.video_link = videoEmbeddUrl.replace('replacethiswithid', v);
			}
		}


		$scope.markAsCompleted = function(temp){
			if(!$scope.workoutData.Workout.id){
				$state.go('app.loggedin.home', {reload: true})
			}
			else{
				$rootScope.showSpinner = true; 
				var requestHandler = commonService.doPut('Workouts/markWorkoutAsComplete', {programWorkoutId: $scope.workoutData.Workout.program_workout_id, completed: 1});
				requestHandler.then(function(response){
					$rootScope.showSpinner = false;
					if(response.data.status && response.data.status.success && !angular.isDefined(temp)){
						$state.go('app.loggedin.workoutdone');
					}
				});
			}
		};


		$scope.setTime = function(seconds){
			$scope.minutes = Math.floor(seconds / 60);
			$scope.seconds = seconds - $scope.minutes  * 60;

			$scope.minutes = ($scope.minutes < 10) ? '0' + $scope.minutes.toString() : $scope.minutes;
			$scope.seconds = ($scope.seconds < 10) ? '0' + $scope.seconds.toString() : $scope.seconds;
		};


		$scope.startActivity = function(){
			$scope.timerStarted = true;
			$scope.activityInterval =$interval(function(){
				$scope.currentTimer = $scope.currentTimer - 1;
				$scope.setTime($scope.currentTimer);
				if($scope.currentTimer == 0){
					$scope.pauseActivity()
				}
			},1000)
		};

		$scope.pauseActivity = function(){
			console.log($scope.currentTimer);
			$interval.cancel($scope.activityInterval);
			$scope.timerStarted = false;
		};

		$scope.setActivity = function(index){
			console.log($scope.workoutPlan)
			if($scope.workoutPlan.ActivityGroup[index]){
				$scope.currentActivityIndex = index;
				$scope.ActivtyTime = parseInt($scope.workoutPlan.ActivityGroup[index].activity_timer);
				$scope.currentTimer = $scope.ActivtyTime;
				$scope.setTime($scope.currentTimer);
			}
			else{
				$scope.allActivityDone = true;
				$scope.markAsCompleted();
			}
		};

		$scope.showActivityDetails = function(activty){
			workoutService.setCurrentActivty(activty)
			$state.go('app.loggedin.workoutactivity', $rootScope.$stateParams, {});
		};
		
		if($state.params.type_id){
			$scope.workoutPlan = workoutService.getCurrentWorkoutPlan();
			$scope.setActivity(0);
		}
		else{
			if ( $scope.methods.length > 0 ) {
				$scope.currentMethod = $scope.methods[0];
				workoutService.setCurrentPlan($scope.workoutData[$scope.currentMethod.title])
			}
		}
		
		console.log($scope.workoutData);
	}
	else{
		$state.go('app.loggedin.home', {reload: true})
	}
}])
.controller('WorkoutActivty', ['$scope', '$rootScope', '$state', 'workoutActivtyData', function($scope, $rootScope, $state, workoutActivtyData){
	$scope.header = $scope.defaultHeader + '<div class="sub-header">' + workoutActivtyData.name.toUpperCase() + '</div>';
	$scope.workoutActivtyData = workoutActivtyData;
	console.log(workoutActivtyData)
}]);