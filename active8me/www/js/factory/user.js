app.factory("userService", ['$http', 'dbService', 'API_BASE_URL', function($http, dbService, API_BASE_URL) {
    return {
        doRegister: function(data) {
            var url = API_BASE_URL + 'Homes/register';
            return $http.post(url, data);
        },
        doLogin: function(data) {
            var url = API_BASE_URL + 'Homes/login';
            return $http.post(url, data);
        },
        createLocalUser: function(userData){
        	var query = 'INSERT INTO users';
	    	query += '(user_id, name, email, program_id, weight_to_loose, fitness_level, calorie_level, gender, dob, height, weight, country_id) ';
	    	query += 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	    	var bindings = [
	    		userData.id, userData.name, userData.email, 
	    		userData.program_id, userData.weight_to_loose, 
	    		userData.fitness_level, userData.calorie_level, userData.gender,
	    		userData.dob, userData.height, userData.weight, userData.country_id];

	    	Object.keys(userData).map(function (key) {return userData[key]});

			//dbService.query(query, bindings);
        },
        getUserByUserID: function(userID){
        	return dbService.query("SELECT * FROM users WHERE user_id = " + userID);
        },
        getLoggedIn: function(){
        	return dbService.query("SELECT * FROM users");
        }
    }
}]);