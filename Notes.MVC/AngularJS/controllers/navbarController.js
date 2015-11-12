;
(function () {
    "use strict";
    // ######################################################
    // View model - "NavBarCtrl" as "menu"
    // ######################################################

    // Bootstrap model
    function navbarCtrl(
        $scope,
        $rootScope,
        $log
        ) {

        var self = this;

        // Display scope name in console & AngularJS Batarang
        self.title = "navbarController";
        $log.debug(self.title);
    }

    // Controller dependency for AngularJS minification
    navbarCtrl.$inject = [
        "$scope",
        "$rootScope",
        "$log"
    ];

    // ######################################################

    // Configuration for module
    function navbarConf() {};

    // Configuration dependency for AngularJS minification
    navbarConf.$inject = [];

    // ######################################################

    // Module initialization
    angular
        .module("np.navbar", [
            "ngRoute",
            "np.auth"
            ])
        .config(navbarConf)
        .controller("NavBarCtrl", navbarCtrl);

    // ######################################################
})();