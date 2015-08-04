angular.module('MyApp')
  .controller('SubmitCtrl', ['$scope', '$location', '$rootScope', 'serviceRequests', function($scope, $location, $rootScope, serviceRequests) {
      $scope.newAsk = {};
      if (sessionStorage.getItem('username')) {
        $scope.newAsk.username = sessionStorage.getItem('username');
      }
    $scope.addAskUser = function(askDetails) {
      sessionStorage.setItem('username', askDetails.username);
      var data = {
        username: askDetails.username,
        question: askDetails.question
      };

      serviceRequests.Submit(JSON.stringify(data)).success(function (data) {
        $location.path('/');
      });
    }
  }]);