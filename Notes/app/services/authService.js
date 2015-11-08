;
(function () {
    "use strict";

    // ######################################################
    // Service - module "np.authService" factory "authService"
    // ######################################################

    function authSrv(
        $http,
        $q,
        $log,
        localStorageService,

        authSettings
        ) {
        var self = this;
        // var for return function data
        var auth = {};

        //var baseUrl = "http://notes.team-player.ru/";
        var baseUrl = authSettings.apiServiceBaseUrl;

        var credentials = {
            userId: 0,
            isAuth: false,
            isAdmin: false,
            nickName: ""
        };

        var logOut = function () {
            
            var url = baseUrl + "api/account/logout";
            $log.debug("LOGOUT: " + url, credentials);

            $http.post(url, credentials).then(function (response) {

                localStorageService.remove("authData");

                credentials.userId = 0;
                credentials.isAuth = false;
                credentials.isAdmin = false;
                credentials.nickName = "";
            });            
        };

        var login = function (loginData) {

            var url = baseUrl + "token";
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.passWord;

            $log.debug("LOGIN: " + url , data);

            var deferred = $q.defer();

            $http.post(url, data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })

                .success(function (response) {

                    $log.debug(response);

                    // credentials - app using varible
                    credentials.userId = response.userId;
                    credentials.isAuth = true;
                    credentials.isAdmin = (response.userRole === "Admin") ? true : false;
                    credentials.nickName = response.nickName;

                    // angular-local-storage: https://github.com/grevory/angular-local-storage
                    // old browser write date to cookies, new use localStorage
                    localStorageService.set("authData", {
                        // server data
                        token: response.access_token,
                        userName: loginData.userName,
                        // app data
                        userId: credentials.userId,
                        isAdmin: credentials.isAdmin,
                        nickName: credentials.nickName
                    });

                    $log.debug(credentials);

                    deferred.resolve(response);
                })

                .error(function (err, status) {
                    logOut();
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var fillAuthData = function () {
            // angular-local-storage: https://github.com/grevory/angular-local-storage
            var authData = localStorageService.get("authData");

            if (authData) {
                credentials.userId = authData.userId;
                credentials.isAuth = true;
                credentials.isAdmin = authData.isAdmin;
                credentials.nickName = authData.userName;
            } else {
                logOut();
            }
        }

        auth.login = login;
        auth.logOut = logOut;
        auth.fillAuthData = fillAuthData;
        auth.credentials = credentials;

        return auth;
    };

    // Array for minification AngularJS code
    authSrv.$inject = [
        "$http",
        "$q",
        "$log",
        "localStorageService",

        "authSettings"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.authService", [])
        .factory("authService", authSrv);

    // ######################################################

})();