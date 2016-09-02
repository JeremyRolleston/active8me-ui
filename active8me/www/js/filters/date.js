app.filter('userFriendlyDate',['$filter', function($filter) {
  	return function(input) {
  		var today = new Date();
  		var userDate = new Date(input);
  		console.log(userDate)
  		if(today.toDateString() === userDate.toDateString()){
  			return 'Today'
  		}
  		return $filter('date')(input, 'd MMM y');
  	};
}]);