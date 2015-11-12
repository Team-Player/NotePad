;
(function () {
    "use strict";
    // ######################################################
    // Service - module "np.testService" factory "testService"
    // ######################################################

    function testSrv(
        $http,        
        $log,        

        mainSettings,
        authSettings,
        dataSettings
        ) {

        var self = this;

        // var for return function data;
        self.test = {};

        //var baseUrl = "http://notes.team-player.ru/";
        self._baseUrl = authSettings.BaseUrl;

        self._getTest = function () {
            return $http.get(self._baseUrl + "api/test")
                .then(function (results) {                    
                    return results;
                });
        };

        self.test.getTest = self._getTest;

        return self.test;
    };

    // Array for minification AngularJS code
    testSrv.$inject = [
        "$http",        
        "$log",        

        "mainSettings",
        "authSettings",
        "dataSettings"
    ];

    // ######################################################
    angular // Module initialization
        .module("np.listService", [])
        .factory("listService", listSrv);
    // ######################################################
})();