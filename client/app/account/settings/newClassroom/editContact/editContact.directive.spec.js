'use strict';

describe('Directive: editContact', function () {

  // load the directive's module and view
  beforeEach(module('textbookApp'));
  beforeEach(module('app/account/settings/newClassroom/editContact/editContact.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-contact></edit-contact>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the editContact directive');
  }));
});