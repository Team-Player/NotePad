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

        //var baseUrl = "http://npr.team-player.ru/";
        self._baseUrl = dataSettings.BaseUrl;
        
        self._getNotes = function () {
            return $http.get(self._baseUrl + "api/notes")
                .then(function (results) {
                    $log.debug("NOTES:", results);
                    return results;
                });
        };

        self.notes.getNotes = self._getNotes;        

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
    angular // Module initialization
        .module("np.listService", [])
        .factory("listService", listSrv);
    // ######################################################
})();