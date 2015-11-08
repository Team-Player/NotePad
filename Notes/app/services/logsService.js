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
        self.baseUrl = dataSettings.apiServiceBaseUrl;

        self.getLogs = function () {
            return $http.get(self.baseUrl + "api/admin")
                .then(function (results) {                    
                    return results;
                });
        };

        self.logs.getLogs = self.getLogs;

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

    // Module initialization
    angular
        .module("np.logsService", [])
        .factory("logsService", logsSrv);

    // ######################################################
})();