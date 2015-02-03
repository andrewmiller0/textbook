'use strict';

describe('Controller: ClassroomsCtrl', function () {

  // load the controller's module
  beforeEach(module('textbookApp'));

  var ClassroomsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassroomsCtrl = $controller('ClassroomsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
