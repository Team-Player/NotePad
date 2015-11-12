;
(function () {
"use strict";
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

    // web application
    app.constant("mainSettings", {
        BaseUrl: "http://npw.team-player.ru/"
    });

    // auth server
    app.constant("authSettings", {
        BaseUrl: "http://npa.team-player.ru/",
        clientId: "webNotes"
    });

    // resource server
    app.constant("dataSettings", {
        BaseUrl: "http://npr.team-player.ru/"
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
    app.run(["authService", "$log", function (authService, $log) {
        authService.loadData();
        $log.debug("LOAD USER: ", authService.credentials);
    }]);
    // ######################################################
})();