(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .factory('dashboardFactory', dashboardFactory);

    dashboardFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function dashboardFactory($http, $q, apiUrl) {
        var service = {
            getAssignments: getAssignments
        };
        return service;

        ////////////////

        function getAssignments() {
            var defer = $q.defer();

            $http.get(apiUrl + '/assignments')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                    }
                );
            return defer.promise;
        }
    }
})();