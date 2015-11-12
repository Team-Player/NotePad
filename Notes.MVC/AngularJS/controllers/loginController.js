;
(function () {
    "use strict";
    // ######################################################
    // View model - "LoginCtrl" as "model"
    // ######################################################

    // Bootstrap model
    function loginCtrl(
        $location,
        $log,
        $rootScope,
        $scope,

        authService
        ) {

        var self = this;

        // Display scope name in console & AngularJS Batarang
        self.title = "loginController";
        $log.debug(self.title);

        // Active navbar section
        $rootScope.curPath = "login";

        // Login form data
        self.loginData = {
            userName: "",
            passWord: "",
            rememberMe: false
        };

        // Login form error message
        $scope.message = "";

        // Login form submit
        self.login = function () {
            authService.login(self.loginData)
                .then(function(response) {
                        $log.debug("Login is success", response);
                        $location.path("/list");
                    },
                function (err) {
                    $scope.message = err.error_description;
                    $log.debug("Login is terminate: " + $scope.message);
                });
        }
    }

    // Controller dependency for AngularJS minification
    loginCtrl.$inject = [
        "$location",
        "$log",
        "$rootScope",
        "$scope",

        "authService"
    ];

    // ######################################################

    // Configuration for module
    function loginConf(
        $routeProvider
        ) {
        $routeProvider
            .when("/login", {
                templateUrl: "/views/login",
                controller: "LoginCtrl",
                controllerAs: "model"
            });
    };

    // Configuration dependency for AngularJS minification
    loginConf.$inject = [
        "$routeProvider"
    ];

    // ######################################################
    angular // Module initialization
        .module("np.login", [
            "ngRoute",
            "np.authService"
        ])
        .config(loginConf)
        .controller("LoginCtrl", loginCtrl);
    // ######################################################
})();