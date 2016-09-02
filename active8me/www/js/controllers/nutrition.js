app.controller('Nutrition', ['$scope', '$rootScope', '$state', 'nutritionData', 'mealsService', 'commonService', function($scope, $rootScope, $state, nutritionData, mealsService, commonService){
	if(typeof window.localStorage['loggedInUser'] == 'undefined'){
		$state.go('app.goIn.start')
	}
	$rootScope.showSpinner = false; 
	$scope.header = '<div class="sub-header">' + $state.$current.data.title + '</div>';

	$scope.methods = [{
		id: 1,
		title: 'AT HOME/EAT OUT'
	},{
		id: 2,
		title: 'AT HOME'
	},{
		id: 3,
		title: 'EAT OUT'
	}];
	$scope.showAll = false;
	$scope.toggleAll = function(){
		$scope.showAll = !$scope.showAll;
	};	

	$scope.goToHomePage = function(){
    alert("hit");
  }

	$scope.currentMethod = $scope.methods[0];
	$scope.changeMethod = function(method){
		$scope.toggleAll();
		$scope.currentMethod = method;
		if(method.id == 3){
			$state.go('app.loggedin.eatout');
		}
		else{
			$state.go('app.loggedin.athome');
		}
	};
	console.log(nutritionData)
	if(nutritionData.data && nutritionData.data.data && nutritionData.data.data.Nutrition){
		$scope.currentNutritionType = nutritionData.data.data.NutritionType;
		$scope.currentNutrition = nutritionData.data.data.Nutrition;

		var nutrTips = nutritionData.data.data.NutritionTips || [];
		$scope.currentNutritionTip = nutrTips[Math.floor(Math.random() * nutrTips.length)];
		$scope.currentNutritionID = $rootScope.$stateParams.nutrition_id;

		mealsService.setCurrentMeal(nutritionData);
	}
	else{
		$state.go('app.loggedin.home', {reload: true})
	}
	$scope.markAsDone = function(temp){
		if(!$scope.currentNutrition.program_nutrition_id){
			$state.go('app.loggedin.home', {reload: true})
		}
		else{
			$rootScope.showSpinner = true; 
			var requestHandler = commonService.doPut('Meals/markMealAsComplete', {programNutritionId: $scope.currentNutrition.program_nutrition_id, cooked: 1});
			requestHandler.then(function(response){
				$rootScope.showSpinner = false;
				if(response.data.status && response.data.status.success && !angular.isDefined(temp)){
					$state.go('app.loggedin.nutritiondone');
				}
			})

		}
	};
}]);