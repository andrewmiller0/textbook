'use strict';

angular.module('textbookApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('classrooms', {
        url: '/',
        templateUrl: 'app/main/classrooms/classrooms.html',
        controller: 'ClassroomsCtrl'
      })
      .state('classrooms.edit', {
        url: ':classId/edit',
        templateUrl: 'app/main/editClassroom/editClassroom.html',
        controller: 'EditClassroomCtrl'
      })
      .state('addClassroom', {
        url: 'classroom/add',
        templateUrl: 'app/main/newClassroom/newclassroom.html',
        controller: 'NewClassCtrl'
      })
      .state('classrooms.classroom', {
        url: ':classId',
        templateUrl: 'app/main/classroom/classroom.html',
        controller: 'ClassroomCtrl'
      })
      .state('classrooms.classroom.conversation', {
        url: ':classId/conversations/:convoId',
        templateUrl: 'app/main/classroom/conversation/conversation.html'
      })
  });