angular.module('MyApp')
    .controller('AskCtrl', ['$scope', '$routeParams', '$location', '$document','$rootScope', 'serviceRequests', function ($scope, $routeParams, $location, $document, $rootScope, serviceRequests) {
      $scope.newComment = {};
      serviceRequests.getRequest($routeParams._id).success(function (data) {
        console.log(data);
        $scope.request = data.question;
        $scope.comments = data.reply;
      });
      if (sessionStorage.getItem('username')) {
        $scope.newComment.username = sessionStorage.getItem('username');;
      }
      $scope.addCommentUser = function(commentDetail) {
        sessionStorage.setItem('username', commentDetail.username);
        var data = {
          username: commentDetail.username,
          comment: commentDetail.comment,
          id: $scope.request._id
        };
        serviceRequests.commentSubmit(data).success(function(data) {
          $scope.comments = data;
          $scope.newComment.comment = '';
          $scope.newComment.username = sessionStorage.getItem('username');
        });
      };
    }]);