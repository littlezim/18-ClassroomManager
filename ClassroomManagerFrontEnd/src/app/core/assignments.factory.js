(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .factory('assignmentsFactory', assignmentsFactory);

    assignmentsFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function assignmentsFactory($http, $q, apiUrl) {
        var service = {
            getAssignments: getAssignments,
            getAssignmentsById: getAssignmentsById,
            addAssignments: addAssignments,
            updateAssignments: updateAssignments,
            deleteAssignments: deleteAssignments
        };
        return service;

        ////////////////
//Pass both studentId and projectId into functions

        function addAssignments(assignment) {
            var defer = $q.defer();

            $http.post(apiUrl + '/assignments', assignment)
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

        function getAssignmentsById(studentId, projectId) {
            var defer = $q.defer();

            $http.get(apiUrl + '/assignments/' + studentId + '/' + projectId)
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

        function updateAssignments(studentId, projectId, assignment) {
            var defer = $q.defer();
            $http.put(apiUrl + '/assignments/' + studentId + '/' + projectId, assignment)
                .then(
                    function() {
                        defer.resolve();
                    },
                    function(error) {
                        defer.reject(error);
                    }
                );

            return defer.promise;
        }

        function deleteAssignments(studentId, projectId, assignment) {
            var defer = $q.defer();
            $http.delete(apiUrl + '/assignments/' + studentId + '/' + projectId)
                .then(
                    function() {
                        defer.resolve();
                    },
                    function(error) {
                        defer.reject(error);
                    }
                );

            return defer.promise;
        }
    }
})();