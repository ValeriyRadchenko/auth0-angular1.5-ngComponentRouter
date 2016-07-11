angular.module('app').service('authenticationService', function(auth, $location) {

    this.isAuthenticated = function() {
        if (auth.isAuthenticated) {
            return true;
        }

        $location.path('/login');
        return false;
    }

});