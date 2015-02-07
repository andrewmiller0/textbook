'use strict';

angular.module('textbookApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('classrooms', {
        url: '/classrooms',
        templateUrl: 'app/main/classrooms/classrooms.html',
        controller: 'ClassroomsCtrl'
      })
      .state('classrooms.addClassroom', {
      	url: '/classroom/add',
      	templateUrl: 'app/main/newClassroom/newclassroom.html',
      	controller: 'NewClassCtrl'
      })
      .state('classrooms.classroom', {
        url: '/:classId',
        templateUrl: 'app/main/classroom/classroom.html',
        controller: 'ClassroomCtrl'
      })
      .state('classrooms.edit', {
        url: '/:classId/edit',
        templateUrl: 'app/main/editClassroom.html',
        controller: 'EditClassroomCtrl'
      });
  });