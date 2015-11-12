;
(function () {
    "use strict";

    // ######################################################
    // Service - module "np.logsService" factory "logsService"
    // ######################################################

    function logsSrv(
        $http,
        //$q,
        $log,
        //localStorageService,

        authSettings,
        dataSettings
        ) {
        var self = this;

        // var for return function data;
        self.logs = {};

        //var baseUrl = "http://npr.team-player.ru/";
        self._baseUrlAuth = authSettings.BaseUrl;
        self._baseUrlData = dataSettings.BaseUrl;

        self._getLogsAuth = function () {
            return $http.get(self._baseUrlAuth + "api/admin")
                .then(function (results) {                    
                    return results;
                });
        };

        self._getLogsData = function () {
            return $http.get(self._baseUrlData + "api/admin")
                .then(function (results) {
                    return results;
                });
        };

        self.logs.getLogsAuth = self._getLogsAuth;
        self.logs.getLogsData = self._getLogsData;

        return self.logs;
    };

    // Array for minification AngularJS code
    logsSrv.$inject = [
        "$http",
        //"$q",
        "$log",
        //"localStorageService",

        "authSettings",
        "dataSettings"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.logsService", [])
        .factory("logsService", logsSrv);

    // ######################################################
})();