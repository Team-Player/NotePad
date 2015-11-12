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

        self.auth = {};

        self._baseUrl = authSettings.BaseUrl;
        self._credentials = {
            userId: 0,
            isAuth: false,
            isAdmin: false,
            nickName: "",
            useRefreshTokens: false
        };
        self._externalAuth = {
            provider: "",
            nickName: "",
            userName: "",
            accessToken: ""
        };

        // REGISTER:            ========== ========== ========== ========== ========== ========== 
        self._register = function (model) {

            self._logOut();

            var url = self._baseUrl + "api/account/register";

            return $http.post(url, model).then(function (response) {
                return response;
            })
        };

        // LOGIN:               ========== ========== ========== ========== ========== ========== 
        self._login = function (model) {

            var url = self._baseUrl + "token";
            var data = "grant_type=password&username=" + model.userName + "&password=" + model.passWord;

            if (model.useRefreshTokens) { data += "&client_id=" + authSettings.clientId; }

            var deferred = $q.defer();

            $http.post(url, data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                .success(function (response) {

                    // credentials - app using varible
                    self._credentials.isAuth = true;
                    self._credentials.userId = response.userId;
                    self._credentials.isAdmin = (response.userRole === "Admin") ? true : false;
                    self._credentials.nickName = response.nickName;
                    self._credentials.useRefreshTokens = model.useRefreshTokens;

                    var useRefreshToken = (model.useRefreshTokens) ? response.refresh_token : "";

                    // angular-local-storage: https://github.com/grevory/angular-local-storage
                    // old browser write date to cookies, new use localStorage
                    localStorageService.set("authData", {
                        // server data
                        token: response.access_token,
                        refreshToken: useRefreshToken,
                        // app data
                        userId: self._credentials.userId,
                        isAdmin: self._credentials.isAdmin,
                        nickName: self._credentials.nickName,
                        useRefreshTokens: self._credentials.useRefreshTokens
                    });

                    deferred.resolve(response);
                })

                .error(function (err, status) {
                    self._logOut();
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        // LOGOUT:              ========== ========== ========== ========== ========== ========== 
        self._logOut = function () {

            var url = self._baseUrl + "api/account/logout";

            $http.post(url, self._credentials).then(function (response) {

                localStorageService.remove("authData");

                self._credentials.userId = 0;
                self._credentials.isAuth = false;
                self._credentials.isAdmin = false;
                self._credentials.nickName = "";
                self._credentials.useRefreshTokens = false;
            });
        };

        // LOAD DATA:           ========== ========== ========== ========== ========== ========== 
        self._loadData = function () {
            // angular-local-storage: https://github.com/grevory/angular-local-storage
            var authData = localStorageService.get("authData");

            $log.debug("authData: ", authData);

            if (authData) {
                self._credentials.userId = authData.userId;
                self._credentials.isAuth = true;
                self._credentials.isAdmin = authData.isAdmin;
                self._credentials.nickName = authData.nickName;
                self._credentials.useRefreshTokens = authData.useRefreshTokens;
            } else {
                if (self._credentials.isAuth) { _logOut(); }
            }
        }

        // REFRESH TOKEN:       ========== ========== ========== ========== ========== ========== 
        self._refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get("authData");

            if (authData) {
                if (authData.useRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + authSettings.clientId;

                    localStorageService.remove("authData");

                    $http.post(self._baseUrl + "token", data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })

                        .success(function (response) {
                            localStorageService.set("authData", {
                                // server data                                
                                token: response.access_token,
                                refreshToken: response.refresh_token,
                                // app data
                                useRefreshTokens: true,
                                userId: response.userId,
                                isAdmin: (response.userRole === "Admin") ? true : false,
                                nickName: response.nickName
                            });

                            deferred.resolve(response);
                        })

                        .error(function (err, status) {
                            _logOut();
                            deferred.reject(err);
                        });
                }
            }

            return deferred.promise;
        };

        // OBTAIN ACCESS TOKEN: ========== ========== ========== ========== ========== ========== 
        self._obtainAccessToken = function (externalData) {

            //            var deferred = $q.defer();

            //            $http.get(self._baseUrl + "api/account/ObtainLocalAccessToken", {
            //                params: {
            //                    provider: externalData.provider,
            //                    externalAccessToken: externalData.externalAccessToken
            //                }
            //            })
            //                .success(function (response) {

            //                    localStorageService.set("authData", {
            //                        // server data
            //                        userName: response.userName,    // ???
            //                        token: response.access_token,
            //                        refreshToken: "",
            //                        // app data
            //                        useRefreshTokens: false,
            //                        userId: credentials.userId,     // ???
            //                        isAdmin: credentials.isAdmin,   // ???
            //                        nickName: credentials.nickName  // ???
            //                    });

            //                    credentials.userId = authData.userId;
            ////                    credentials.isAuth = true;
            //                    credentials.isAdmin = authData.isAdmin;
            //                    credentials.nickName = authData.userName;
            //                    credentials.useRefreshTokens = authData.useRefreshTokens;

            //                    credentials.isAuth = true;
            //                    credentials.userName = response.userName;
            //                    credentials.useRefreshTokens = false;

            //                    deferred.resolve(response);

            //                })
            //                .error(function (err, status) {
            //                    _logOut();
            //                    deferred.reject(err);
            //                });

            //            return deferred.promise;
        };

        // REGISTER EXTERNAL:   ========== ========== ========== ========== ========== ========== 
        self._registerExternal = function (registerExternalData) {

            //    var deferred = $q.defer();

            //    $http.post(serviceBase + "api/account/registerexternal", registerExternalData).success(function (response) {

            //        localStorageService.set("authorizationData", { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            //        _authentication.isAuth = true;
            //        _authentication.userName = response.userName;
            //        _authentication.useRefreshTokens = false;

            //        deferred.resolve(response);

            //    }).error(function (err, status) {
            //        _logOut();
            //        deferred.reject(err);
            //    });

            //    return deferred.promise;
        };

        // RETURN:              ========== ========== ========== ========== ========== ========== 
        // main function
        //auth.register = self._register;
        self.auth.login = self._login;
        self.auth.logOut = self._logOut;
        self.auth.loadData = self._loadData;
        // local Auth
        self.auth.credentials = self._credentials;
        //auth.refreshToken = self._refreshToken;
        // external Auth
        //auth.externalAuthData = self._externalAuth;
        //auth.obtainAccessToken = self._obtainAccessToken;        
        //auth.registerExternal = self._registerExternal;

        return self.auth;
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
    angular // Module initialization
        .module("np.authService", [])
        .factory("authService", authSrv);
    // ######################################################
})();