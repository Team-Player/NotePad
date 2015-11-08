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

        var interceptor = {};

        var request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get("authData");
            if (authData) {
                config.headers.Authorization = "Bearer " + authData.token;
            }

            return config;
        }

        var responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path("/login");
            }
            return $q.reject(rejection);
        }

        interceptor.request = request;
        interceptor.responseError = responseError;

        return interceptor;
    };

    // Array for minification AngularJS code
    authInterceptorSrv.$inject = [
        "$q",
        "$injector",
        "$location",
        "localStorageService"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.authInterceptorService", [])
        .factory("authInterceptorService", authInterceptorSrv);

    // ######################################################

})();