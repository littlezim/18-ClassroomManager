(function() {
   'use strict';

   //Create Module
   angular
       .module('classroomManagerApp', ['ui.router', 'toastr'])
	   .value('apiUrl', 'http://localhost:52176/api')
       .config(appConfig);
	
	appConfig.$inject = ["$urlRouterProvider", "$stateProvider"]

		   //Defaul to the Dashboard View at page load
	function appConfig($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('dashboard');           

		   //Create View States for Router
           $stateProvider
           .state('dashboard', {
               url: '/dashboard',
               templateUrl: 'app/views/dashboard.html',
               controller: 'DashboardController as dashboard'
           })
		   .state('project', {
		   	   url: '/project',
		   	   abstract: true,
		   	   template: '<div ui-view></div>'
		   })
		           .state('project.grid', {
		               url: '/grid',
		               templateUrl: 'app/views/projects-grid.html',
		               controller: 'ProjectGridController as projectGrid'
		           })
		           .state('project.detail', {
		               url: '/detail?projectId',
		               templateUrl: 'app/views/projects-detail.html',
		               controller: 'ProjectDetailController as projectDetail'
		           })
		   .state('student', {
		   	   url: '/student',
		   	   abstract: true,
		   	   template: '<div ui-view></div>'
		   })
		           .state('student.grid', {
		               url: '/grid',
		               templateUrl: 'app/views/students-grid.html',
		               controller: 'StudentGridController as studentGrid'
		           })
		           .state('student.detail', {
		               url: '/detail?studentId',
		               templateUrl: 'app/views/students-detail.html',
		               controller: 'StudentDetailController as studentDetail'
		           })
       };
})();