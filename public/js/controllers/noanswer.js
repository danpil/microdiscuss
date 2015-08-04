angular.module('MyApp')
    .controller('NoAnswerCtrl', ['$scope', '$location', '$rootScope', 'serviceRequests', function($scope, $location, $rootScope, serviceRequests) {
      serviceRequests.getNoAnswer().success(function (data) {
        $scope.requests = data;
      });
    }]);