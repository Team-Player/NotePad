;
(function () {
    "use strict";
    // ######################################################
    // Service - "np.authInterceptorService" factory
    // ######################################################

    function authInterceptorSrv(
        $q,
        $injector,
        $location,
        localStorageService
        ) {

        var selt = this;

        self.interceptor = {};

        self._request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get("authData");
            if (authData) {
                config.headers.Authorization = "Bearer " + authData.token;
            }

            return config;
        }

        self._responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get("authService");
                var authData = localStorageService.get("authData");

                if (authData) {
                    //if (authData.useRefreshTokens) {
                    //    $location.path("/refresh");
                    //    return $q.reject(rejection);
                    //}
                }

                authService.logOut();
                $location.path("/login");
            }
            return $q.reject(rejection);
        }

        self.interceptor.request = self._request;
        self.interceptor.responseError = self._responseError;

        return self.interceptor;
    };

    // Array for minification AngularJS code
    authInterceptorSrv.$inject = [
        "$q",
        "$injector",
        "$location",
        "localStorageService"
    ];

    // ######################################################    
    angular // Module initialization
        .module("np.authInterceptorService", [])
        .factory("authInterceptorService", authInterceptorSrv);
    // ######################################################
})();