angular.module('app', [
    'ngComponentRouter',
    'auth0',
    'angular-storage',
    'angular-jwt'
])
    
.value('$routerRootComponent', 'app')
    
.component('app', {
    templateUrl: 'app/app.html',
    $routeConfig: [
        {
            path: '/',
            component: 'home',
            name: 'Home'
        },
        {
            path: '/login',
            component: 'login',
            name: 'Login'
        }
    ]
})
    
.config(['authProvider', '$httpProvider', 'jwtInterceptorProvider', myAppConfig])
.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', myAppRun]);

function myAppConfig (authProvider, $httpProvider, jwtInterceptorProvider) {

    authProvider.init({
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        loginUrl: '/login'
    });

    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store) {
        console.log("Login Success");
        profilePromise.then(function(profile) {
            store.set('profile', profile);
            store.set('token', idToken);
        });
        $location.path('/');
    }]);

    authProvider.on('loginFailure', function() {
        alert("Error");
    });

    authProvider.on('authenticated', ['$location', function($location) {
        console.log("Authenticated");

    }]);

    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        return store.get('token');
    }];

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');
}

function myAppRun($rootScope, auth, store, jwtHelper, $location) {
    $rootScope.$on('$locationChangeStart', function() {

        var token = store.get('token');
        if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
                if (!auth.isAuthenticated) {
                    auth.authenticate(store.get('profile'), token);
                }
            } else {
                // Either show the login page or use the refresh token to get a new idToken
                $location.path('/');
            }
        }

    });
}

