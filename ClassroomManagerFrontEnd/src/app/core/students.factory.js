(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .factory('studentsFactory', studentsFactory);

    studentsFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function studentsFactory($http, $q, apiUrl) {
        //create function names for use
        var service = {
            addStudents: addStudents,
            getStudents: getStudents,
            getStudentsById: getStudentsById,
            updateStudents: updateStudents,
            deleteStudents: deleteStudents
        };
        return service;

        ////////////////

        //Post Function
        function addStudents(student) {
            var defer = $q.defer();

            $http.post(apiUrl + '/students', student)
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
        function getStudents() {
            var defer = $q.defer();

            $http.get(apiUrl + '/students')
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

        //Get ByID
        function getStudentsById(studentId) {
            var defer = $q.defer();

            $http.get(apiUrl + '/students/' + studentId)
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
        function updateStudents(student) {
            var defer = $q.defer();
            $http.put(apiUrl + '/students/' + student.studentID, student)
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
        function deleteStudents(student) {
            var defer = $q.defer();
            $http.delete(apiUrl + '/students/' + student) //just student not student.studentId
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