app.factory("mealsService", ['$http', 'API_BASE_URL', function($http, API_BASE_URL) {
	var currentMeal = {};
    return {
        setCurrentMeal: function(data) {
            currentMeal = data;
        },

        getCurrentMeal: function(){
        	console.log(currentMeal)
        	return currentMeal;
        }
    }
}]);