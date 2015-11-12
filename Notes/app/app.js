;
(function () {
"use strict";

    // ######################################################
    //var baseUrl = 'http://localhost:26264/';
    var baseUrl = "http://notes.team-player.ru/";
    // ######################################################

    // Module initialization
    // np = notePad - for easy read module name
    var app = angular
        .module("notePad", [
            // External JS
            "ngRoute",
            "LocalStorageModule",
            "angular-loading-bar",
            // My controllers
            "np.auth",
            "np.edit",
            "np.list",
            "np.login",
            "np.logs",
            "np.navbar",
            "np.task",
            // My services
            "np.authInterceptorService",
            "np.authService",
            "np.editService",
            "np.listService",
            "np.logsService"
        ]);

    // ######################################################
    // Application constants

    app.constant("authSettings", {
        BaseUrl: baseUrl,
        clientId: "webNotes"
    });

    app.constant("dataSettings", {
        BaseUrl: baseUrl
    });

    // ######################################################
    // Module configuration

    function npConf(
        $routeProvider,
        $locationProvider,
        $logProvider,
        $httpProvider
        ) {
        // Default root
        $routeProvider.otherwise({ redirectTo: "/list" });
        // HTML5 false mode - show "#" in URL, true - hide "#"
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("!");
        // logProvider - "true" for working $log.debug() in AngularJS code (write to console)
        $logProvider.debugEnabled(true);
        // Authentification Interceptor
        $httpProvider.interceptors.push("authInterceptorService");
    };

    // Array for minification AngularJS code
    npConf.$inject = [
        "$routeProvider",
        "$locationProvider",
        "$logProvider",
        "$httpProvider"
    ];

    app.config(npConf);

    // ######################################################
    // Module running

    app.run(["authService", "$log", function (authService, $log) {
        authService.fillAuthData();
        $log.debug("authService: ", authService);
    }]);

    // ######################################################

})();