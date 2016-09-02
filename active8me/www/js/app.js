// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var deviceToken;
var app = angular.module('active8me', ['ionic', 'ngCordova', 'ngAnimate', 'ngFileUpload', 'Tek.progressBar']);

app.run(function($ionicPlatform, $rootScope, $state, $stateParams, $cordovaPush, dbService) {
    var iosConfig = {
        "badge": true,
        "sound": true,
        "alert": true,
    };
    $ionicPlatform.ready(function() {
        dbService.init();
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);

            //var db = $cordovaSQLite.openDB("my.db");
             //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        
    });

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams; 

    document.addEventListener("deviceready", function(){
        
        var push = PushNotification.init({
            ios: {
                alert: "true",
                badge: "true",
                sound: "true",
                clearBadge: "true"
            }
        });

        // push.unregister(function() {
        //     console.log('success');
        // }, function() {
        //     console.log('error');
        // });

        push.on('registration', function(data) {
            deviceToken = data.registrationId;
            //alert('registration');
            console.log("rgisterss", data.registrationId);
        });

        push.on('notification', function(data) {
            console.log("notification"); 
            // console.log(data.message);
            // console.log(data.title);
            // console.log(data.count);
            // console.log(data.sound);
            // console.log(data.image);
            // console.log(data.additionalData);
            // push.setApplicationIconBadgeNumber(function() {
            //      console.log('success');
            //  }, function() {
            //      console.log('error');
            //  }, 2);
        });
        push.setApplicationIconBadgeNumber(function() {
            console.log('success');
        }, function() {
            console.log('error');
        }, 0);
        push.on('error', function(e) {
            //alert("error");
            console.log(e.message);
        });

        // if(device.platform.toLowerCase() == 'ios'){
        //     alert("yes ios");
        // }
    });
})
.config(function($httpProvider, $ionicConfigProvider, $sceDelegateProvider){
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.withCredentials = true;
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})
