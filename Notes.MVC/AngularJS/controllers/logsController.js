;
(function () {
    "use strict";
    // ######################################################
    // View model - "LogsCtrl" as "model"
    // ######################################################

    // Bootstrap model
    function logsCtrl(
        $scope,
        $rootScope,
        $log,

        logsService
        ) {

        var self = this;

        // Display scope name in console & AngularJS Batarang
        self.title = "logsController";
        $log.debug(self.title);

        // Active navbar section
        $rootScope.curPath = "logs";

        $scope.logs = [];

        $scope.getLogsAuth = function() { logsService.getLogsAuth().then(
            function (results) { $scope.logs = results.data; },
            function (error) { alert(error.data.message); });
        }

        $scope.getLogsData = function () { logsService.getLogsData().then(
            function (results) { $scope.logs = results.data; },
            function (error) { alert(error.data.message); });
        }
    }

    // Controller dependency for AngularJS minification
    logsCtrl.$inject = [
        "$scope",
        "$rootScope",
        "$log",

        "logsService"
        ];

    // ######################################################

    // Configuration for module
    function logsConf(
        $routeProvider
        ) {
        $routeProvider
            .when("/logs", {
                templateUrl: "/views/logs",
                controller: "LogsCtrl",
                controllerAs: "model"
            });
    };

    // Configuration dependency for AngularJS minification
    logsConf.$inject = ["$routeProvider"];

    // ######################################################

    // Module initialization
    angular
        .module("np.logs", [
            "ngRoute"
        ])
        .config(logsConf)
        .controller("LogsCtrl", logsCtrl);

    // ######################################################
})();