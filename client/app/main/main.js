'use strict';

angular.module('textbookApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('classrooms', {
        url: '/',
        templateUrl: 'app/main/classrooms/classrooms.html',
        controller: 'ClassroomsCtrl',
        authenticate: true
      })
      .state('about', {
        url: '/',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      })
      .state('classrooms.edit', {
        url: ':classId/edit',
        templateUrl: 'app/main/editClassroom/editClassroom.html',
        controller: 'EditClassroomCtrl',
        authenticate: true
      })
      .state('addClassroom', {
        url: 'classroom/add',
        templateUrl: 'app/main/newClassroom/newclassroom.html',
        controller: 'NewClassCtrl',
        authenticate: true
      })
      .state('addClassroom.studentRoster', {
        url: 'classroom/add/roster',
        templateUrl: 'app/main/newClassroom/studentRoster/studentRoster.html',
        controller: 'StudentRosterCtrl',
        authenticate: true
      })
      .state('classrooms.classroom', {
        url: ':classId',
        templateUrl: 'app/main/classroom/classroom.html',
        controller: 'ClassroomCtrl',
        authenticate: true
      })
      .state('classrooms.classroom.conversation', {
        url: '/student/:studentId/conversation/:contactId',
        templateUrl: 'app/main/classroom/conversation/conversation.html',
        controller: 'ConversationCtrl',
        authenticate: true
      })
  });