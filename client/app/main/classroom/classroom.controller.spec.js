'use strict';

describe('Controller: ClassroomCtrl', function () {

  // load the controller's module
  beforeEach(module('textbookApp'));

  var ClassroomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassroomCtrl = $controller('ClassroomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
