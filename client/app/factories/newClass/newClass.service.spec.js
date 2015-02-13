'use strict';

describe('Service: newClass', function () {

  // load the service's module
  beforeEach(module('textbookApp'));

  // instantiate service
  var newClass;
  beforeEach(inject(function (_newClass_) {
    newClass = _newClass_;
  }));

  it('should do something', function () {
    expect(!!newClass).toBe(true);
  });

});
