(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .factory('projectsFactory', projectsFactory);

    projectsFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function projectsFactory($http, $q, apiUrl) {
        //create function names for use
        var service = {
            addProjects: addProjects,
            getProjects: getProjects,
            getProjectsById: getProjectsById,
            updateProjects: updateProjects,
            deleteProjects: deleteProjects
        };
        return service;

        ////////////////

        //Post Function
        function addProjects(project) {
            var defer = $q.defer();

            $http.post(apiUrl + '/projects', project)
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

        //Get Function
        function getProjects() {
            var defer = $q.defer();

            $http.get(apiUrl + '/projects')
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

        function getProjectsById(projectId) {
            var defer = $q.defer();

            $http.get(apiUrl + '/projects/' + projectId)
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

        //Put Function
        function updateProjects(project) {
            var defer = $q.defer();
            $http.put(apiUrl + '/projects/' + project.projectID, project)
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

        //Delete Function
        function deleteProjects(project) {
            var defer = $q.defer();
                                                    //possibly studentID
            $http.delete(apiUrl + '/projects/' + project)
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