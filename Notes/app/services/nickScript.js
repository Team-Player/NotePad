;
(function () {
    "use strict";

    // ######################################################
    // Service - module "np.nickService" factory "nickService"
    // ######################################################

    function nickSrv(
        $http,
        //$q,
        $log,
        //localStorageService,

        authSettings
        ) {
        var self = this;

        // var nick = { id, nickName }
        self.nicks = [];

        //var baseUrl = "http://notes.team-player.ru/";
        self.baseUrl = authSettings.apiServiceBaseUrl;

        // READ - GET
        self._nicks = function () {
            
            return $http.get(self.baseUrl + "api/User/Nicks")
                .then(function (results) {
                    return results;
                });

            $log.debug("NICKS:");
        };
        
        self.nicks = self._nicks;

        return self.nicks;
    };

    // Array for minification AngularJS code
    nickSrv.$inject = [
        "$http",
        //"$q",
        "$log",
        //"localStorageService",

        "authSettings"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.nickService", [])
        .factory("nickService", nickSrv);

    // ######################################################

})();