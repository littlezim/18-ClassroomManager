(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['studentsFactory',
                         'projectsFactory',
                         'assignmentsFactory',
    					 '$stateParams',
                         'toastr'
    					 ];

    /* @ngInject */
    function StudentDetailController(studentsFactory, projectsFactory, assignmentsFactory, $stateParams, toastr) {
        var vm = this;
        vm.title = 'StudentDetailController';
        vm.studentId = $stateParams.studentId

        //properties
        vm.students = {};
        vm.blankStudent = {};

        //methods
        vm.getStudentsById = getStudentsById;
        vm.addStudents = addStudents;
        vm.updateStudents = updateStudents;
        vm.getProjects = getProjects;
        vm.getAssignmentsById = getAssignmentsById;
        vm.addAssignments = addAssignments;
        vm.updateAssignments = updateAssignments;

        getProjects();
        getStudentsById(vm.studentId);
        ////////////////

        function getStudentsById(id) {
            studentsFactory.getStudentsById(id).then(
                function(students){
                    vm.students = students;
                }
            );
        }

        function addStudents() {
            studentsFactory.addStudents(vm.students).then(
                function() {
                    toastr.success('Student added Successfully.', 'Success');
                }
            );
        }



        function updateStudents(student) {
            studentsFactory.updateStudents(student).then(
                function() {
                    student.edit = false;
                }
            );
        }

        function getProjects() {
            projectsFactory.getProjects().then(
                function(projects) {
                    vm.projects = projects;
                }
            );
        }

        function getAssignmentsById(assignment) {

            var studentId = assignment.studentID;
            var projectId = assignment.projectID;

            assignmentsFactory.getAssignmentsById(studentId, projectId).then(
                function(){

                }
            );
        }

        function addAssignments() {

            var studentId = vm.studentId;
            var projectId = vm.newstuff.projectID;
            var newAssignment = {"studentId" : studentId, "projectId" : projectId}

            assignmentsFactory.addAssignments(newAssignment).then(
                function() {
                    getStudentsById(vm.studentId);
                    toastr.success('Assignment added Successfully.', 'Success');
                },
                function(error) {
                    toastr.error('This Project is already assigned to this student.', 'Error');
                }
            );
        }

        //Update assignments to change grade
        function updateAssignments(assignment) {
            var editGrade = angular.copy(assignment);
            editGrade.grade = assignment.newGrade;

            assignmentsFactory.updateAssignments(editGrade.studentID, editGrade.projectID, editGrade).then(
                function() {
                    getStudentsById(vm.studentId);
                    toastr.success("Grade Changed", "Success");
                },
                function(error) {
                    toastr.error("Something Blew up SORRY");
                }
            );
        }
    }
})();