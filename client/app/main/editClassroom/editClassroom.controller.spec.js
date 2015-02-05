'use strict';

describe('Controller: EditClassroomCtrl', function () {

  // load the controller's module
  beforeEach(module('textbookApp'));

  var EditClassroomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditClassroomCtrl = $controller('EditClassroomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
