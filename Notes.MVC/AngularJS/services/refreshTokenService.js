;
(function () {
    "use strict";

    // ######################################################
    // Service - module "np.refreshTokenService" factory "refreshTokenService"
    // ######################################################

    function refreshTokenSrv(
        $http,
        //$q,
        $log,
        //localStorageService,

        authSettings
        ) {

        var self = this;

        // var manager - function: delete & getNew
        self.manager = {};

        //var baseUrl = "http://npa.team-player.ru/";
        self.baseUrl = authSettings.BaseUrl;

        // GET NEW REFRESH TOKEN
        self._getNew = function () {
            return $http.get(serviceBase + "api/refreshtokens").then(function (results) {
                return results;
            });
        };

        // DELETE REFRESH TOKEN
        self._delete = function (tokenid) {
            return $http.delete(serviceBase + "api/refreshtokens/?tokenid=" + tokenid).then(function (results) {
                return results;
            });
        };

        self.manager.getNew = self._getNew;
        self.manager.delete = self._delete;

        return self.manager;
    };

    // Array for minification AngularJS code
    refreshTokenSrv.$inject = [
        "$http",
        //"$q",
        "$log",
        //"localStorageService",

        "authSettings"
    ];

    // ######################################################    
    angular // Module initialization
        .module("np.refreshTokenService", [])
        .factory("refreshTokenService", refreshTokenSrv);
    // ######################################################
})();