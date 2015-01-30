'use strict';

describe('Service: Classroom', function () {

  // load the service's module
  beforeEach(module('textbookApp'));

  // instantiate service
  var classroom;
  beforeEach(inject(function (_classroom_) {
    classroom = _classroom_;
  }));

  it('should do something', function () {
    expect(!!classroom).toBe(true);
  });

});
