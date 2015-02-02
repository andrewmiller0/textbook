'use strict';

angular.module('textbookApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('addClassroom', {
      	url: '/classroom/add',
      	templateUrl: 'app/account/settings/newClassroom/newclassroom.html',
      	controller: 'NewClassCtrl'
      });
  });