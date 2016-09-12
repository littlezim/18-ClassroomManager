(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['projectsFactory',
                         'studentsFactory',
                         'assignmentsFactory',
                         'toastr',
    					 '$stateParams'
    					 ];

    /* @ngInject */
    function ProjectDetailController(projectsFactory, studentsFactory, assignmentsFactory, toastr, $stateParams) {
        var vm = this;
        vm.title = 'ProjectDetailController';
        
        vm.getProjectsById = getProjectsById;
        vm.getProjects = getProjects;
        vm.addProjects = addProjects;
        vm.updateProjects = updateProjects;
        vm.projectId = $stateParams.projectId;
        vm.addAssignments = addAssignments;

        getStudents();
        getProjects();
        getProjectsById(vm.projectId);

        ////////////////

        function getProjectsById(id) {
            projectsFactory.getProjectsById(id).then(
                function(projects) {
                    vm.projects = projects;
                }
            );
        }

        function getProjects() {
            projectsFactory.getProjects().then(
                function(projects2) {
                    vm.projects2 = projects2;
                }
            );
        }

        function addProjects() {
            projectsFactory.addProjects(vm.projects).then(
                function() {
                    toastr.success('Project added Successfully.', 'Success');
                }
            );
        }

        function updateProjects(project) {
            projectsFactory.updateProjects(project).then(
                function() {
                    project.edit = false;
                }
            );
        }

        function getStudents() {
            studentsFactory.getStudents().then(
                function(students) {
                    vm.students = students;
                }
            );
        }
        function addAssignments() {

            var studentId = vm.newstuff.studentID;
            var projectId = vm.projectId;
            var newAssignment = {"studentId" : studentId, "projectId" : projectId}

            assignmentsFactory.addAssignments(newAssignment).then(
                function() {
                    getProjectsById(vm.projectId);
                    toastr.success('Assignment added Successfully.', 'Success');
                },
                function(error) {
                    toastr.error('This Project is already assigned to this student.', 'Error');
                }
            );
        }
    }
})();