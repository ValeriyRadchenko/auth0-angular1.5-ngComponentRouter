angular.module('app').component('login', {
    templateUrl: 'login/login.html',
    controller: ['$scope', 'auth', loginController]
});

function loginController($scope, auth) {
    $scope.auth = auth;
}
