angular.module('app').component('home', {
    templateUrl: 'home/home.html',
    $canActivate: function(authenticationService) {
        return authenticationService.isAuthenticated();
    },
    controller: homeController
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