angular.module('app').component('login', {
    templateUrl: 'login/login.html',
    controller: loginController
});

function loginController($scope, auth) {
    $scope.auth = auth;
}
