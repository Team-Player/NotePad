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

        //var baseUrl = "http://npr.team-player.ru/";
        self._baseUrl = dataSettings.BaseUrl;

        // CREATE => POST
        self._create = function (note) {
            var data = {
                userId: note.userId,
                title: note.title,
                body: note.body,
                publish: note.publish
            };

            return $http.post(self._baseUrl + "api/notes/", data)
                .then(function (results) {
                    return results;
                });
        };

        // READ => GET
        self._read = function (id) {
            return $http.get(self._baseUrl + "api/notes/" + id)
                .then(function (results) {
                    return results;
                });
        };

        // UPDATE => PUT
        self._update = function (note) {
            var id = note.id;
            var data = {
                title: note.title,
                body: note.body,
                publish: note.publish
            };

            return $http.put(self._baseUrl + "api/notes/" + id, data)
                .then(function (results) {
                    return results;
                });
        };

        // DELETE => DELETE
        self._delete = function (id) {
            return $http.delete(self._baseUrl + "api/notes/" + id)
                .then(function (results) {
                    return results;
                });
        };

        self.note.create = self._create;
        self.note.read = self._read;
        self.note.update = self._update;
        self.note.delete = self._delete;

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
    angular // Module initialization
        .module("np.editService", [])
        .factory("editService", editSrv);
    // ######################################################
})();