angular.module('MyApp', ['ngCookies', 'ngResource', 'ngRoute'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      //$locationProvider.html5Mode(true);

      $routeProvider
          .when('/', {
            templateUrl: '/views/home.html',
            controller: 'MainCtrl'
          })
          .when('/answered', {
            templateUrl: '/views/answered.html',
            controller: 'AnsweredCtrl'
          })
          .when('/noanswer', {
            templateUrl: '/views/noanswer.html',
            controller: 'NoAnswerCtrl'
          })
          .when('/submit', {
            templateUrl: 'views/submit.html',
            controller: 'SubmitCtrl'
          })
          .when('/ask/:_id', {
            templateUrl: 'views/ask.html',
            controller: 'AskCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });

    }]);