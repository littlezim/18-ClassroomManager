(function() {
    'use strict';

    angular
        .module('classroomManagerApp')
        .controller('ProjectGridController', ProjectGridController);

    ProjectGridController.$inject = ['projectsFactory',
    					 '$stateParams'
    					 ];

    /* @ngInject */
    function ProjectGridController(projectsFactory, $stateParams) {
        var vm = this;
        vm.title = 'ProjectGridController';
        vm.projects = []

        vm.getProjects = getProjects;
        vm.deleteProjects = deleteProjects;

        getProjects();

        ////////////////
        function getProjects() {
            projectsFactory.getProjects().then(
                function(projects) {
                    vm.projects = projects;
                }
            );
        }

        function deleteProjects(project) {
            console.log(project);
            if (confirm("Are you sure you want to remove this project?")){
                projectsFactory.deleteProjects(project).then(
                    function() {
                        var index = vm.projects.indexOf(project);
                        vm.projects.splice(index, 1);
                    }
                );
            }            
        }
    }
})();