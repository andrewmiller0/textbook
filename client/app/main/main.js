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
        templateUrl: 'app/main/classrooms.html',
        controller: 'ClassroomsCtrl'
      })
      .state('addClassroom', {
      	url: '/classroom/add',
      	templateUrl: 'app/account/settings/newClassroom/newclassroom.html',
      	controller: 'NewClassCtrl'
      })
      .state('classrooms.classroom', {
        url: '/:className',
        templateUrl: 'app/main/classroom.html',
        controller: 'ClassroomCtrl'
      });
  });