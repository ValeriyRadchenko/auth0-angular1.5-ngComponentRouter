angular.module('app').component('home', {
    templateUrl: 'home/home.html',
    $canActivate: ['authenticationService', function(authenticationService) {
        return authenticationService.isAuthenticated();
    }],
    controller: ['$scope', 'auth', 'store', '$location', homeController]
});

function homeController($scope, auth, store, $location) {

    $scope.auth = auth;

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/login');
    }
    
}