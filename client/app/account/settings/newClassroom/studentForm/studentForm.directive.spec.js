'use strict';

describe('Directive: studentForm', function () {

  // load the directive's module and view
  beforeEach(module('textbookApp'));
  beforeEach(module('app/account/settings/newClassroom/studentForm/studentForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<student-form></student-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the studentForm directive');
  }));
});