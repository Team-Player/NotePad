;
(function () {
    "use strict";

    // ######################################################
    // Service - module "np.listService" factory "listService"
    // ######################################################

    function listSrv(
        $http,
        //$q,
        $log,
        //localStorageService,

        dataSettings
        ) {
        var self = this;

        // var for return function data;
        self.notes = {};

        //var baseUrl = "http://notes.team-player.ru/";
        self.baseUrl = dataSettings.apiServiceBaseUrl;
        
        self.getNotes = function () {
            return $http.get(self.baseUrl + "api/notes")
                .then(function (results) {
                    $log.debug("NOTES:", results);
                    return results;
                });
        };

        self.notes.getNotes = self.getNotes;

        $log.debug(self.notes.getNotes);

        return self.notes;
    };

    // Array for minification AngularJS code
    listSrv.$inject = [
        "$http",
        //"$q",
        "$log",
        //"localStorageService",

        "dataSettings"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.listService", [])
        .factory("listService", listSrv);

    // ######################################################
})();