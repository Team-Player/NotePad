﻿;
(function () {
    "use strict";
    // ######################################################
    // View model - "AuthCtrl" as "user"
    // ######################################################

    // Bootstrap model
    function authCtrl(
        $location,
        $log,
        $rootScope,
        $scope,

        authService
        ) {
        // var self = this;
        // Display scope name in console & AngularJS Batarang
        $scope.title = "authController";
        $log.debug($scope.title);

        $scope.user = authService.credentials;
        $log.debug("USER:", authService.credentials);

        $scope.logOut = function () {
            authService.logOut();
            $location.path("/login");
        }
    }

    // Controller dependency for AngularJS minification
    authCtrl.$inject = [
        "$location",
        "$log",
        "$rootScope",
        "$scope",

        "authService"
        ];

    // ######################################################
    angular // Module initialization
        .module("np.auth", [
            "ngRoute"
            ])
        .controller("AuthCtrl", authCtrl);
    // ######################################################
})();