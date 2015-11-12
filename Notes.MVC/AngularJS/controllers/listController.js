;
(function () {
    "use strict";
    // ######################################################
    // View model - "ListCtrl" as "model"
    // ######################################################

    // Bootstrap model
    function listCtrl(
        $filter,
        $scope,
        $rootScope,
        $log,

        authService,
        listService
        ) {
        //var self = this;
        // Display scope name in console & AngularJS Batarang
        $scope.title = "listController";
        $log.debug($scope.title);

        // Active navbar section
        $rootScope.curPath = "notes";

        // Search field
        $scope.search = "";

        // Page settings
        $scope.selectedPage = 1;
        $scope.pageSize = 5;

        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.getPageClass = function(page) {
            return $scope.selectedPage === page ? "btn-primary" : "btn-default";
        }

        $scope.$watch("search", function () { $scope.selectedPage = 1; });

        $scope.notes = [];
        //authService.fillAuthData();

        listService.getNotes().then(
            function (results) { $scope.notes = results.data; },
            function (error) { alert(error.data.message); });
    };

    // Controller dependency for AngularJS minification
    listCtrl.$inject = [
        "$filter",
        "$scope",
        "$rootScope",
        "$log",

        "authService",
        "listService"
    ];

    // ######################################################

    // Filters

    function pageCount() {
        return function(data, size) {
            if (angular.isArray(data)) {
                var result = [];
                for (var i = 0, max = Math.ceil(data.length / size); i < max; i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        }
    }

    function noteList(
        $filter,
        $log
        ) {
        return function (data, page, size) {
            $log.debug(page, size);
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var startIndex = (page - 1) * size;
                if (data.length < startIndex) {
                    return [];
                } else {
                    return $filter("limitTo")(data.splice(startIndex), size);
                }
            } else {
                return data;
            }
        }
    }

    noteList.$inject = [
        "$filter",
        "$log"
    ];
    
    // ######################################################

    // Configuration for module
    function listConf(
        $routeProvider
        ) {
        $routeProvider
            .when("/list", {
                templateUrl: "/views/list",
                controller: "ListCtrl",
                controllerAs: "model"
            });
    };

    // Configuration dependency for AngularJS minification
    listConf.$inject = [
        "$routeProvider"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.list", [
            "ngRoute"
        ])
        .config(listConf)
        .controller("ListCtrl", listCtrl)
        .filter("pageCount", pageCount)
        .filter("noteList", noteList);

    // ######################################################
})();