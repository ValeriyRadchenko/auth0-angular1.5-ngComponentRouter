angular.module('app').service('authenticationService', ['auth', '$location', function(auth, $location) {

    this.isAuthenticated = function() {
        if (auth.isAuthenticated) {
            return true;
        }

        $location.path('/login');
        return false;
    }

}]);