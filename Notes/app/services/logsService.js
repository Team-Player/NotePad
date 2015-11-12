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

        dataSettings
        ) {

        var self = this;

        // var for return function data;
        self.logs = {};

        //var baseUrl = "http://notes.team-player.ru/";
        self._baseUrl = dataSettings.BaseUrl;

        self._getLogs = function () {
            return $http.get(self._baseUrl + "api/admin")
                .then(function (results) {                    
                    return results;
                });
        };

        self.logs.getLogs = self._getLogs;

        return self.logs;
    };

    // Array for minification AngularJS code
    logsSrv.$inject = [
        "$http",
        //"$q",
        "$log",
        //"localStorageService",

        "dataSettings"
    ];

    // ######################################################    
    angular // Module initialization
        .module("np.logsService", [])
        .factory("logsService", logsSrv);
    // ######################################################
})();