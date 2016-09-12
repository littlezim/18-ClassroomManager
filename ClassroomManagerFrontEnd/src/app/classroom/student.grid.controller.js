(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .controller('StudentGridController', StudentGridController);

    StudentGridController.$inject = ['studentsFactory',
    					 '$stateParams'
    					 ];

    /* @ngInject */
    function StudentGridController(studentsFactory, $stateParams) {
        var vm = this;
        vm.title = 'StudentGridController';

        //properties
        vm.students = [];

        //methods
        vm.getStudents = getStudents;
        vm.deleteStudents = deleteStudents;

        getStudents();

        ////////////////

        function getStudents() {
            studentsFactory.getStudents().then(
                function(students) {
                    vm.students = students;
                }
            );
        }

        function deleteStudents(student) {
            if (confirm("Are you sure you want to remove this student?")){
                studentsFactory.deleteStudents(student).then(
                    function() {
                        var index = vm.students.indexOf(student);
                        vm.students.splice(index, 1);
                    }
                );
            }
        }
    }
})();