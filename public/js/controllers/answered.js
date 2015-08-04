angular.module('MyApp')
    .controller('AnsweredCtrl', ['$scope', '$location', '$rootScope', 'serviceRequests', function($scope, $location, $rootScope, serviceRequests) {
      serviceRequests.getAnswered().success(function (data) {
        $scope.requests = data;
      });
    }]);