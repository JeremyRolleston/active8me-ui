app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
		url: '/',
		abstract: true,
		templateUrl: 'templates/main.html'
  	})
  	.state('app.goIn', {
		url: 'go-in',
		abstract: true,
		templateUrl: 'templates/go-in-header.html',
		controller: 'User',
		resolve:{
	         homeData:  function(commonService, $window){	         	
	            return commonService.doGet('Homes/getUserSchedule');
	     	}
	    }
  	})
  	.state('app.goIn.start', {
		url: '/start',
		templateUrl: 'templates/go-in.html'
  	})
  	.state('app.goIn.step1', {
		url: '/step1',
		templateUrl: 'templates/go-in-step1.html'
  	})
  	.state('app.goIn.step2', {
		url: '/step2',
		templateUrl: 'templates/go-in-step2.html'
  	})
  	.state('app.goIn.step3', {
		url: '/step3',
		templateUrl: 'templates/go-in-step3.html'
  	})
  	.state('app.goIn.step4', {
		url: '/step4',
		templateUrl: 'templates/go-in-step4.html'
  	})
  	.state('app.loggedin', {
		url: 'loggedin',
		abstract: true,
		templateUrl: 'templates/loggedin.html'
  	})
  	.state('app.loggedin.menu', {
  		url: '/menu',
  		views: {
			'pageContent': {
				controller: 'Menu',
				templateUrl: 'templates/menu.html'
			}
		}
  	})
  	.state('app.loggedin.home', {
		url: '/home',
		views: {
			'pageContent': {
				templateUrl: 'templates/home.html'	,
				controller: 'Home',
				resolve:{
			         homeData:  function(commonService, $window){
			            return commonService.doGet('Homes/getUserSchedule');
			     	}
			    }
			}
		}
  	})
  	.state('app.loggedin.nutrition', {
		url: '/nutrition/:nutrition_id/:program_meal_id',
		data: {
			title: 'MY NUTRITION'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/nutrition.html'	,
				controller: 'Nutrition',
				resolve: {
					nutritionData: function(commonService, $stateParams){
						return commonService.doGet('Meals/mealDetail?objectId=' + $stateParams.nutrition_id + '&programMealId=' + $stateParams.program_meal_id);
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.athome', {
		url: '/athome',
		data: {
			title: 'MY NUTRITION MEAL'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/nutrition-athome.html'	,
				controller: 'Nutrition',
				resolve:{ 
					nutritionData: function(mealsService){
						return mealsService.getCurrentMeal()
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.eatout', {
		url: '/eatout',
		cache: false,
		data: {
			title: 'MY NUTRITION MEAL'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/nutrition-eatout.html'	,
				controller: 'Nutrition',

				resolve:{ 
					nutritionData: function(mealsService){
						return mealsService.getCurrentMeal()
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.nutritiondone', {
		url: '/nutritiondone',
		data: {
			title: 'MEAL COMPLETED'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/nutrition-done.html'	,
				controller: 'Nutrition',
				resolve:{ 
					nutritionData: function(mealsService){
						return mealsService.getCurrentMeal()
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.workout', {
		url: '/workout/:workout_id/:program_workout_id',
		data: {
			title: 'MY WORKOUT'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/workout.html'	,
				controller: 'Workout',
				resolve: {
					workoutData: function(commonService, $stateParams){
						return commonService.doGet('Workouts/workoutDetail?workoutId=' + $stateParams.workout_id + '&programWorkoutId=' + $stateParams.program_workout_id);
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.workoutvideo', {
		url: '/workoutvideo/:workout_id',
		data: { 
			title: 'MY WORKOUT VIDEO'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/workout-video.html'	,
				controller: 'Workout',
				resolve:{ 
					workoutData: function(workoutService){
						return workoutService.getCurrentWorkout()
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.workoutplan', {
		url: '/workoutplan/:workout_id/:type_id',
		data: {
			title: 'MY WORKOUT PLAN'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/workout-plan.html'	,
				controller: 'Workout',
				resolve:{ 
					workoutData: function(workoutService){
						return workoutService.getCurrentWorkout()
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.workoutstart', {
		url: '/workoutstart/:workout_id/:type_id',
		data: {
			title: 'WORKOUT START'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/workout-start.html'	,
				controller: 'Workout',
				resolve:{ 
					workoutData: function(workoutService){
						return workoutService.getCurrentWorkout()
					}
				}
			}
		}
		
  	})
  	.state('app.loggedin.workoutdone', {
		url: '/workoutdone',
		data: {
			title: 'WORKOUT COMPLETED'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/workout-done.html'	,
				controller: 'Workout',
				resolve:{ 
					workoutData: function(workoutService){
						return workoutService.getCurrentWorkout()
					}
				}
			}
		}
  	})
  	.state('app.loggedin.workoutactivity', {
  		url: '/activity/:workout_id/:type_id',
  		data: {
  		},
  		views: {
			'pageContent': {
				templateUrl: 'templates/workout-activity.html'	,
				controller: 'WorkoutActivty',
				resolve:{ 
					workoutActivtyData: function(workoutService){
						return workoutService.getCurrentActivty()
					}
				}
			}
		}
  	})
  	.state('app.loggedin.myprogresstools', {
		url: '/myprogresstools',
		data: {
			title: 'MY PROGRESS & TOOLS'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/my-progress-tools.html',
				controller: 'MyProgressTools',
			}
		}
  	})
  	.state('app.loggedin.myprogressphoto', {
		url: '/myprogressphoto',
		data: {
			title: 'MY PROGRESS - PHOTO'
		},
		views: {
			'pageContent': {
				templateUrl: 'templates/my-progress-photo.html'	,
				controller: 'MyProgressPhoto',
				resolve: {
					photoData: function(commonService){
						return commonService.doGet('Users/getImageDetail');
					}
				}
			}
		}
  	});

	$urlRouterProvider.otherwise('/go-in/start');
		
 //  	if(typeof window.localStorage['loggedInUser'] == 'undefined'){
 //  		$urlRouterProvider.otherwise('/go-in/step1');
		
	// }
	// else{
	// 	$urlRouterProvider.otherwise('/loggedin/home');
	// }
  	
 });