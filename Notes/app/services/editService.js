;
(function () {
    "use strict";

    // ######################################################
    // Service - module "np.editService" factory "editService"
    // ######################################################

    function editSrv(
        $http,
        //$q,
        $log,
        //localStorageService,

        dataSettings
        ) {
        var self = this;

        // var for return function data
        self.note = {};

        //var baseUrl = "http://notes.team-player.ru/";
        self.baseUrl = dataSettings.BaseUrl;

        // CREATE - POST
        self.create = function (note) {
            var data = {
                userId: note.userId,
                title: note.title,
                body: note.body,
                publish: note.publish
            };

            $log.debug("CREATE: ", data);

            return $http.post(self.baseUrl + "api/notes/", data)
                .then(function (results) {
                    return results;
                });
        };

        // READ - GET
        self.read = function (id) {

            $log.debug("READ: " + id);

            return $http.get(self.baseUrl + "api/notes/" + id)
                .then(function (results) {
                    return results;
                });
        };

        // UPDATE - PUT
        self.update = function (note) {
            var id = note.id;

            var data = {
                title: note.title,
                body: note.body,
                publish: note.publish
            };

            $log.debug( "UPDATE: " + id, data );

            return $http.put(self.baseUrl + "api/notes/" + id, data)
                .then(function (results) {
                    return results;
                });
        };

        // DELETE - DELETE
        self.delete = function (id) {

            $log.debug("DELETE: " + id);

            return $http.delete(self.baseUrl + "api/notes/" + id)
                .then(function (results) {
                    return results;
                });
        };


        self.note.create = self.create;
        self.note.read = self.read;
        self.note.update = self.update;
        self.note.delete = self.delete;

        return self.note;
    };

    // Array for minification AngularJS code
    editSrv.$inject = [
        "$http",
        //"$q",
        "$log",
        //"localStorageService",

        "dataSettings"
    ];

    // ######################################################

    // Module initialization
    angular
        .module("np.editService", [])
        .factory("editService", editSrv);

    // ######################################################

})();