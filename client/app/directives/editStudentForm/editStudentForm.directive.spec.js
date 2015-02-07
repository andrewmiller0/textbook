'use strict';

describe('Directive: editStudentForm', function () {

  // load the directive's module and view
  beforeEach(module('textbookApp'));
  beforeEach(module('app/editStudentForm/editStudentForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-student-form></edit-student-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the editStudentForm directive');
  }));
});