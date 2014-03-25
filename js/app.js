/* App Module */

var taiwanApp = angular.module("taiwanApp", [
  'ngRoute',
  'firebase',
  'taiwanControllers'
]);



 taiwanApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider){
    $routeProvider.
      when('/index',{
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      otherwise({
      redirectTo:'/',
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    });


  }]);

