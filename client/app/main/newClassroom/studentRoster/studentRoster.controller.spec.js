'use strict';

describe('Controller: StudentRosterCtrl', function () {

  // load the controller's module
  beforeEach(module('textbookApp'));

  var StudentRosterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentRosterCtrl = $controller('StudentRosterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
