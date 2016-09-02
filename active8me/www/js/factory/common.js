app.factory("commonService", ['$http', 'dbService', 'API_BASE_URL', function($http, dbService, API_BASE_URL) {
    return {
        doGet: function(endpoint) {
            var url = API_BASE_URL + endpoint;
            return $http.get(url);
        },
        doPut: function(endpoint, data){
        	var url = API_BASE_URL + endpoint;;
        	return $http.put(url, data)
        }
    }
}]);