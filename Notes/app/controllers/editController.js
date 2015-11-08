;
(function () {
    "use strict";
    // ######################################################
    // View model - "EditCtrl" as "model"
    // ######################################################

    // Bootstrap model
    function editCtrl(
        $scope,
        $rootScope,
        $routeParams,
        $location,
        $log,

        authService,
        editService
        ) {
        var self = this;

        // Display scope name in console & AngularJS Batarang
        $scope.title = "editController";
        $log.debug($scope.title);

        // SET active navbar section
        $rootScope.curPath = "edit";

        // GET current path
        self.path = $location.path();

        // GET current auth user
        self.user = authService.credentials;
        $log.debug("USER:", self.user);

        // SET default current note Id
        self.noteId = 0;
        
        // SET default crud model - READ
        self.crudModel = "Read";
        // SET status for field title, body & button "SAVE"
        self.isReadonly = true;
        // SET status for button "DELETE"
        self.isDelDisable = true;

        // SET default model for NOTE (in $scope for binding data)
        $scope.note = {
            id: null,
            userId: 0,
            createTime: null,
            publish: false,
            title: "",
            body: ""
        };

        // Checking current status of [READ, CREATE, UPDATE]
        if (self.path.indexOf("/add") === 0 && self.user.isAuth) {
            // SET view model - CREATE new NOTE
            self.crudModel = "Create";
            self.isReadonly = false;
            self.isDelDisable = true;

            // NOTE fields = default mode

            // SET: Author is current user
            $scope.note.userId = self.user.userId;

        } else {
            // Current mode don't CREATE:
            self.noteId = Number($routeParams["id"]);
            $log.debug("Current note id:" + self.noteId);

            // get note by id from db
            editService.read(self.noteId).then(
                function(results) {
                    $scope.note = results.data;
                    $log.debug("NOTE:", $scope.note);
                    
                    // Check status between: UPDATE & READ
                    if (self.user.isAdmin || self.user.userId == $scope.note.userId) {
                        // SET view model - UPDATE current NOTE
                        self.crudModel = "Update";
                        self.isReadonly = false;
                        self.isDelDisable = false;
                    } // else default mode - READ
                },
                function (error) { alert(error.data.message); }
                );
        };
        
        // View model function "Create or Update note to db" for button SAVE
        self.save = function () {
            if (self.crudModel === "Create") {
                editService.create($scope.note);
            } else {
                if (self.crudModel === "Update") {
                    editService.update($scope.note);
                };
            }
            $location.path("/list");
        }

        // View model function "Delete note by ID from db" for button DELETE
        self.delete = function () {
            editService.delete($scope.note.id);
            // $route.reload();
            $location.path("/list");
        }

        $log.debug("RETURN:", self);
    }

    // Controller dependency for AngularJS minification
    editCtrl.$inject = [
        "$scope",
        "$rootScope",
        "$routeParams",
        "$location",
        "$log",

        "authService",
        "editService"
    ];

    // ######################################################

    // Configuration for module
    function editConf(
        $routeProvider
        ) {
        // View fod "Create" new note
        $routeProvider
            .when("/add", {
                templateUrl: "/views/edit",
                controller: "EditCtrl",
                controllerAs: "model"
            });
        // View fod "Read" or "Update" current note
        $routeProvider
            .when("/edit/:id", {
                templateUrl: "/views/edit",
                controller: "EditCtrl",
                controllerAs: "model"
            });
    };

    // Configuration dependency for AngularJS minification
    editConf.$inject = [
        "$routeProvider"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.edit", [
            "ngRoute"
        ])
        .config(editConf)
        .controller("EditCtrl", editCtrl);

    // ######################################################
})();