app.controller('active8me', ['$scope', '$rootScope', '$state', '$ionicSideMenuDelegate', '$window', '$cordovaDevice', '$ionicPlatform', '$ionicViewSwitcher', 'dbService', function($scope, $rootScope, $state, $ionicSideMenuDelegate, $window, $cordovaDevice, $ionicPlatform, $ionicViewSwitcher, dbService){
	console.log('main controller');

	$scope.showOnBoarding = false;

	$scope.showGoInForm = function(){
		$scope.showOnBoarding = false;
		$state.go('app.goIn.step1')
	};

	$scope.getRange = function(start, end, rev){
		var range = [];
		if(rev){
			for(var i = end; i >= start; i--){
				range.push(i);
			}
		}
		else{
			for(var i = start; i <= end; i++){
				range.push(i);
			}
		}
		return range;
	};

  $scope.months = [{
    title: "Jan",
    id: 1
  },{
    id: 2,
    title: "Feb"
  },{
    id: 3,
    title: "Mar"
  },{
    id: 4,
    title: "Apr"
  },{
    id: 5,
    title: "May"
  },{
    id: 6,
    title: "Jun"
  },{
    id: 7,
    title: "Jul"
  },{
    id: 8,
    title: "Aug"
  },{
    id: 9,
    title: "Sep"
  },{
    id: 10,
    title: "Oct"
  },{
    id: 11,
    title: "Nov"
  },{
    id: 12,
    title: "Dec"
  }];


	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleLeft();
  	};

  	$scope.loggedInUser = {};
  	$scope.setUser = function(userInfo){
		$scope.loggedInUser = userInfo;
		$window.localStorage['loggedInUser'] = angular.toJson(userInfo);
  	};

  	$scope.defaultHeader = "<img src='img/logo.png' class='logo' />";

  	$scope.setFeeds = function(feedData){
  		$scope.feeds = feedData;
  	};

  	$scope.doLogout = function(){
  		$scope.loggedInUser = {};
  		delete $window.localStorage['loggedInUser'];
  		$state.go('app.goIn.start')
  	};

  	$scope.meuStatus = false;
  	$scope.toggleMenu = function(){
  		$scope.meuStatus = !$scope.meuStatus;
  	};

  	$scope.handleMenu = function(){
  		if($scope.meuStatus){
        $ionicViewSwitcher.nextDirection('forward');
  			$state.go($rootScope.prevState.name || 'app.loggedin.home' , $rootScope.prevStateParams || {})
  		}
  		else{
        $ionicViewSwitcher.nextDirection('back');
  			$state.go('app.loggedin.menu');
  		}
  	};

   	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
   	 	$scope.meuStatus = false;
   	 	if(fromState.name !='app.loggedin.menu'){
   	 		$rootScope.prevState = fromState;
   	 		$rootScope.prevStateParams = fromParams;
   	 	}
	 });
}]);