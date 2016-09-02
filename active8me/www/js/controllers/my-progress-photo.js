app.controller('MyProgressPhoto', ['$scope', '$rootScope', '$state', '$filter', 'Upload', 'commonService', 'photoData', 'API_BASE_URL', function($scope, $rootScope, $state, $filter, Upload, commonService, photoData, API_BASE_URL){
	var status = photoData.data && photoData.data.status && photoData.data.status.success ? photoData.data.status.success : false;
	if(typeof window.localStorage['loggedInUser'] == 'undefined' || !status){
		$state.go('app.goIn.start')
	}
	$scope.currentData = {};
	if(photoData.data && photoData.data.data && photoData.data.data.User){
		var userData = photoData.data.data.User;
		var before = {};
		before.image = (!userData.before_image || userData.before_image == null)? false :  userData.before_image;
		before.date = userData.before_image_date && !isNaN(userData.before_image_date) ? new Date(parseInt(userData.before_image_date)) : new Date();
		before.exists =  userData.before_image_date && !isNaN(userData.before_image_date) ? true : false;
		var after = {};
		after.image = (!userData.after_image || userData.after_image == null ) ? false : userData.after_image;
		after.date = userData.after_image_date && !isNaN(userData.after_image_date) ? new Date(parseInt(userData.after_image_date)) : new Date();

		$scope.currentData.before = before;
		$scope.currentData.after = after;
	}
	else{
		$scope.currentData.after = {};
		$scope.currentData.after.date = new Date();

		$scope.currentData.before = {};
		$scope.currentData.before.date = new Date();
	}
	$rootScope.showSpinner = false; 
	$scope.header = $scope.defaultHeader + '<div class="sub-header">' + $state.$current.data.title + '</div>';
	
	
	$scope.showInfo = false;
	$scope.toggleInfo = function(){
		$scope.showInfo = !$scope.showInfo;
	};


	$scope.uploadFile = function(data) {
		console.log(data)
		$rootScope.showSpinner = true; 
        Upload.upload({
            url: API_BASE_URL + 'Users/addImage',
            data: data,
            withCredentials: true
        }).then(function (resp) {
            console.log('Success');
            $rootScope.showSpinner = false; 
            var status = (resp.data.status && resp.data.status.success || false)
            var currentData = {};
            if(status){
            	var response = resp.data.data || {};
            	currentData.image = response[data.image_type + '_image'];
            	currentData.date  = response[data.image_type + '_image_date'] && !isNaN(response[data.image_type + '_image_date']) ? new Date(parseInt(response[data.image_type + '_image_date'])) : new Date();
            }
            $scope.currentData[data.image_type] = currentData;

            console.log($scope.currentData);
        }, function (resp) {
            console.log('Error status: ');
            console.log(resp)
            $rootScope.showSpinner = false; 
        }, function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ');
        });
    };

	$scope.beforeUpload = function(file){
		var data = {};
		data.image_type = 'before';
		data.image = file;
			console.log($scope)
		data.image_date =  $filter('date')($scope.currentData.before.date, 'MM/d/y'); //m/d/Y 01/05/1991
		$scope.uploadFile(data);
	};
	
	$scope.afterUpload = function(file){
		var data = {};
		data.image_type = 'after';
		data.image = file;
		console.log($scope.currentData.after.date)
		data.image_date =  $filter('date')($scope.currentData.after.date, 'MM/d/y'); //m/d/Y 01/05/1991
		console.log(data.image_date)
		$scope.uploadFile(data);
	};
	
}]);