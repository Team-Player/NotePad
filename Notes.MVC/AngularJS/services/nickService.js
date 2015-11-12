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
        self._baseUrl = authSettings.BaseUrl;

        // READ - GET
        self._nicks = function () {
            return $http.get(self._baseUrl + "api/User/Nicks")
                .then(function (results) {
                    return results;
                });
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
    angular // Module initialization
        .module("np.nickService", [])
        .factory("nickService", nickSrv);
    // ######################################################
})();