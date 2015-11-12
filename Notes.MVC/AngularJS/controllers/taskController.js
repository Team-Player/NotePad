;
(function () {
    "use strict";
    // ######################################################
    // View model - "TaskCtrl" as "model"
    // ######################################################

    // Bootstrap model
    function taskCtrl(
        $scope,
        $rootScope,
        $log
        ) {

        var self = this;

        // Display scope name in console & AngularJS Batarang
        self.title = "taskController";
        $log.debug(self.title);

        // Active navbar section
        $rootScope.curPath = "task";
    }

    // Controller dependency for AngularJS minification
    taskCtrl.$inject = [
        "$scope",
        "$rootScope",
        "$log"
        ];

    // ######################################################

    // Configuration for module
    function taskConf(
        $routeProvider
        ) {
        $routeProvider
            .when("/task", {
                templateUrl: "/views/task",
                controller: "TaskCtrl",
                controllerAs: "model"
            });
    };

    // Configuration dependency for AngularJS minification
    taskConf.$inject = [
        "$routeProvider"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.task", [
            "ngRoute"
            ])
        .config(taskConf)
        .controller("TaskCtrl", taskCtrl);

    // ######################################################
})();