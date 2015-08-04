angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$location', '$rootScope', 'serviceRequests', function($scope, $location, $rootScope, serviceRequests) {
    serviceRequests.getAllRequests().success(function (data) {
      console.log('data: ', data);
      $scope.requests = data;
    });
  }]);