app.controller('User', ['$scope',  '$rootScope', '$state', '$ionicPopup', '$window', 'homeData', 'userService', 'dbService', function($scope, $rootScope, $state, $ionicPopup, $window, homeData, userService, dbService){
	console.log('user controller');
	console.log(homeData.data.status)
	
	$scope.programs = [{
		id: 1,
		name: 'Lose Weight',
		sub: {
			title: 'How much weight do you want to lose?',
			items: [{
				id: 1,
				title: '< 5kgs'
			},{
				id: 2,
				title: '5-10kgs'
			},{
				id: 3,
				title: '10-20kgs'
			},{
				id: 4,
				title: '20+kgs'
			}]
		}
	},{
		id: 2,
		name: 'Lean, fit & toned'
	}];

	$scope.fitnessLevels = [{
		id: 1,
		name: "Beginner"
	},{
		id: 2,
		name: "Intermediate"
	},{
		id: 3,
		name: "Advanced"
	}];

	$scope.calorieLevels = [{
		id: 1,
		name: "1200",
		recommended: true,
		description: "For people wanting to lose 1-10kg of weight, women who are pregnant and in their first trimester or those on the Lean, Fit & Toned program."
	},{
		id: 2,
		name: "1500",
		description: "For people wanting to lose 10-20kg of weight or women who are pregnant and in their second trimester."
	},{
		id: 3,
		name: "1800",
		description: "For people wanting to lose 20kg+ of weight, women who are pregnant and in their third trimester or women who are breastfeeding."
	}];

	var today = new Date();
	$scope.userModel = {
	};
	$scope.userModel.dob = {
	};
	var isValidFirstForm = function(){
		if(!$scope.userModel.email){
			$ionicPopup.alert({
		     	title: 'Email missing',
			    template: 'Please enter email'
		   	});
		}
		else if(!$scope.userModel.password){
			$ionicPopup.alert({
		     	title: 'Password missing',
			    template: 'Please enter password'
		   	});
		}
		else{
			return true;
		}
		return false;
	};

	var isValidSecondForm = function(){
		if(!$scope.userModel.email){
			$ionicPopup.alert({
		     	title: 'Email missing',
			    template: 'Please enter email'
		   	});
		}
		else if(!$scope.userModel.password){
			$ionicPopup.alert({
		     	title: 'Password missing',
			    template: 'Please enter password'
		   	});
		}
		else if(!$scope.userModel.programSelected){
			$ionicPopup.alert({
		     	title: 'Program missing',
			    template: 'Please select program'
		   	});
		}
		else if($scope.userModel.programSelected.sub && !$scope.userModel.sub_program){
			$ionicPopup.alert({
		     	title: 'Weight missing',
			    template: 'Please select weight'
		   	});
		}
		else{
			return true;
		}
		return false;
	};

	var isValidThirdForm = function(){
		if(!$scope.userModel.email){
			$ionicPopup.alert({
		     	title: 'Email missing',
			    template: 'Please enter email'
		   	});
		}
		else if(!$scope.userModel.password){
			$ionicPopup.alert({
		     	title: 'Password missing',
			    template: 'Please enter password'
		   	});
		}
		else if(!$scope.userModel.programSelected){
			$ionicPopup.alert({
		     	title: 'Program missing',
			    template: 'Please select program'
		   	});
		}
		else if($scope.userModel.programSelected.sub && !$scope.userModel.sub_program){
			$ionicPopup.alert({
		     	title: 'Weight missing',
			    template: 'Please select weight'
		   	});
		}
		else if(!$scope.userModel.fitnessLevel){
			$ionicPopup.alert({
		     	title: 'Fitness Level missing',
			    template: 'Please select fitness level'
		   	});
		}
		else if(!$scope.userModel.calorieLevel){
			$ionicPopup.alert({
		     	title: 'Calorie Level missing',
			    template: 'Please select calorie level'
		   	});
		}
		else{
			return true;
		}
		return false;
	};

	var isValidFourthForm = function(){
		if(!$scope.userModel.name){
			$ionicPopup.alert({
		     	title: 'Name missing',
			    template: 'Please enter name'
		   	});
		}
		else if(!$scope.userModel.gender){
			$ionicPopup.alert({
		     	title: 'Gender missing',
			    template: 'Please select gender'
		   	});
		}
		else if(!$scope.userModel.dob.day){
			$ionicPopup.alert({
		     	title: 'DOB is not valid',
			    template: 'Please select day'
		   	});
		}
		else if(!$scope.userModel.dob.month){
			$ionicPopup.alert({
		     	title: 'DOB is not valid',
			    template: 'Please select month'
		   	});
		}
		else if(!$scope.userModel.dob.year){
			$ionicPopup.alert({
		     	title: 'DOB is not valid',
			    template: 'Please select year'
		   	});
		}
		else if(!$scope.userModel.height){
			$ionicPopup.alert({
		     	title: 'Height missing',
			    template: 'Please select height'
		   	});
		}
		else if(!$scope.userModel.weight){
			$ionicPopup.alert({
		     	title: 'Weight missing',
			    template: 'Please select weight'
		   	});
		}
		else{
			return true;
		}
		return false;
	};

	$scope.goSecond = function(doLogin){
		var valid = isValidFirstForm();
		if(valid && angular.isDefined(doLogin) && doLogin){
			$rootScope.showSpinner = true; 
			var loginHandle = userService.doLogin({email: $scope.userModel.email, password: $scope.userModel.password});
			loginHandle.then(function(response){
				$rootScope.showSpinner = false; 
				if(response.data.status && response.data.status.success){
					if(response.data.data && response.data.data.User){
						console.log(response.data.data.User.id)
						// var localHandle = userService.getUserByUserID(response.data.data.User.id);
						// localHandle.then(function(dbResponse){
						// 	if(dbResponse.rows.length){

						// 	}
						// 	else{
						// 		userService.createLocalUser(response.data.data.User);
						// 	}
						// 	$state.go('app.loggedin.home')
						// });
						$scope.setUser(response.data.data.User);
						$state.go('app.loggedin.home')
					}
					else{
						$ionicPopup.alert({
					     	title: 'User info not found',
						    template: 'No user found'
					   	});
					}
				}
				else{
					$ionicPopup.alert({
				     	title: 'User info not found',
					    template: 'No user found'
				   	});
				}
			}, function(error){

			});
		}
		else if(valid){
			$state.go('app.goIn.step2');
		}
	};

	$scope.goThird = function(){
		if(isValidFirstForm() && isValidSecondForm()){
			$state.go('app.goIn.step3');
		}
	};

	$scope.goFourth = function(){
		if(isValidFirstForm() && isValidSecondForm() && isValidThirdForm()){
			$state.go('app.goIn.step4');
		}
	};

	$scope.doCreateUser = function(){
		if(isValidFirstForm() && isValidSecondForm() && isValidThirdForm() && isValidFourthForm()){
			var userInfo = {};
			userInfo.name  = $scope.userModel.name;
			userInfo.email = $scope.userModel.email;
			userInfo.password = $scope.userModel.password;
			userInfo.program_id = $scope.userModel.programSelected.id;
			userInfo.weight_to_loose = $scope.userModel.sub_program && $scope.userModel.sub_program.title ? $scope.userModel.sub_program.title : '';
			userInfo.fitness_level = $scope.userModel.fitnessLevel.id;
			userInfo.calorie_level = $scope.userModel.calorieLevel.name;
			userInfo.gender = $scope.userModel.gender;
			userInfo.dob = $scope.userModel.dob.day.toString() + '/' + $scope.userModel.dob.month.toString() + '/' +$scope.userModel.dob.year.toString();
			userInfo.height = $scope.userModel.height.toString() + 'cm';
			userInfo.weight = $scope.userModel.weight.toString() + 'kg';
			userInfo.country_id = $scope.userModel.country;
			userInfo.device_token = deviceToken;

			$rootScope.showSpinner = true; 
			var registerHandle = userService.doRegister(userInfo);
			registerHandle.then(function(response){
				$rootScope.showSpinner = false; 
				if(response.data.status && response.data.status.success){
					if(response.data.data && response.data.data.User){
						console.log(response.data.data.User.id)
						// var localHandle = userService.getUserByUserID(response.data.data.User.id);
						// localHandle.then(function(dbResponse){
						// 	if(dbResponse.rows.length){

						// 	}
						// 	else{
						// 		userService.createLocalUser(response.data.data.User);
						// 	}
						// 	$state.go('app.loggedin.home')
						// });
						$scope.setUser(response.data.data.User);
						$rootScope.showSpinner = false; 
						$state.go('app.loggedin.home')
					}
					else{
						$ionicPopup.alert({
					     	title: 'Error',
						    template: 'Error occured while creating user'
					   	});
					}
				}
				else if(response.data.status && !response.data.status.success && response.data.status.message){
					var errorHTML = '';
					if(angular.isObject(response.data.status.message)){
						angular.forEach(response.data.status.message, function(message){
							errorHTML += ( errorHTML != '') ? '<br />' + message : message;
						});
					}
					else{
						errorHTML = response.data.status.message;
					}
					$ionicPopup.alert({
		     			title: 'Error',
			    		template: errorHTML
		   			});
				}
				else{
					$ionicPopup.alert({
		     			title: 'Error',
			    		template: 'Some error occured. Please try later'
		   			});	
				}
			}, function(error){
				console.log(error)
			});
		}

	};

	$scope.onProgramSelection = function(program){
		var check = (program.selected) ? true : false;
        angular.forEach($scope.programs, function(pt) {
            pt.selected = false;
        });
        program.selected = check;
        if (check){
            $scope.userModel.programSelected = program;
        }
        else{
            delete $scope.userModel.programSelected;
        }
	};

	$scope.onSubSelection = function(list, current, modelKey){
		var check = (current.selected) ? true : false;
        angular.forEach(list, function(pt) {
            pt.selected = false;
        });
        current.selected = check;
        if (check){
            $scope.userModel[modelKey] = current;
        }
        else{
            delete $scope.userModel[modelKey];
        }
	}

	$rootScope.showSpinner = false; 

	if(homeData.data.status && homeData.data.status.success){
		//$state.go('app.loggedin.home')
	}

	// var loggedIn = userService.getLoggedIn();
	// loggedIn.then(function(response){
	// 	if(response.rows.length){
	// 		$state.go('app.loggedin.home')
	// 	}
	// })

}]);