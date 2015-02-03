'use strict';

describe('Controller: ContactShowCtrl', function () {

  // load the controller's module
  beforeEach(module('textbookApp'));

  var ContactShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactShowCtrl = $controller('ContactShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
