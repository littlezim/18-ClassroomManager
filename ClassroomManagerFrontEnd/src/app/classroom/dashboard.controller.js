(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['dashboardFactory',
                         'studentsFactory',
                         'projectsFactory',
    					 '$stateParams'
    					 ];

    /* @ngInject */
    function DashboardController(dashboardFactory, studentsFactory, projectsFactory, $stateParams) {
        var vm = this;
        vm.title = 'DashboardController';

        //properties
        vm.assignments = [];
        vm.students = [];
        vm.projects = [];

        getAssignments();
        getStudents();
        getProjects();

        ////////////////

        function getAssignments() {
            dashboardFactory.getAssignments().then(
                function(assignments){
                    vm.assignments = assignments
                }
            );
        }

        function getStudents() {
            studentsFactory.getStudents().then(
                function(students){
                    vm.students = students
                }
            );
        }

        function getProjects() {
            projectsFactory.getProjects().then(
                function(projects){
                    vm.projects = projects
                }
            );
        }
    }
})();