app.factory("workoutService", ['$http', 'API_BASE_URL', function($http, API_BASE_URL) {
	var currentWorkout = {};
    var currentWorkoutPlan = {};
    var currentActivity = {};
    return {
        setCurrentWorkout: function(data) {
            currentWorkout = data;
        },
        setCurrentPlan: function(data){
            console.log(data)
            currentWorkoutPlan = data;
        },
        setCurrentActivty: function(data){
            currentActivity = data;
        },
        getCurrentWorkout: function(){
        	return currentWorkout;
        },
        getCurrentWorkoutPlan: function(){
            console.log(currentWorkoutPlan);
            return currentWorkoutPlan;
        },
        getCurrentActivty: function(){
            return currentActivity;
        }
    }
}]);