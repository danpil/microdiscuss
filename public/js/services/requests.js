angular.module('MyApp')
    .service('serviceRequests', ['$http', function ($http) {
      this.getAllRequests = function () {
        return $http.get('/api/requests');
      };

      this.getAnswered = function () {
        return $http.get('/api/answered');
      };

      this.getNoAnswer = function () {
        return $http.get('/api/noanswer');
      };

      this.Submit = function (data) {
        return $http.post('/api/submit', data);
      };

      this.getRequest = function (id) {
        return $http.get('/api/request/' + id);
      };

      this.commentSubmit = function (data) {
        return $http.post('/api/comment', data);
      };
      //this.deleteContact = function (id) {
      //  return $http.delete('/api/contact/' + id);
      //};
      //this.uploadFileToUrl = function(file, uploadUrl){
      //  var fd = new FormData();
      //  fd.append('file', file);
      //   return $http.post(uploadUrl, fd, {
      //    transformRequest: angular.identity,
      //    headers: {'Content-Type': undefined}
      //  });
      //
      //};
    }]);