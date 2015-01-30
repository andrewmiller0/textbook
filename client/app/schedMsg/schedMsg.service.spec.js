'use strict';

describe('Service: SchedMsg', function () {

  // load the service's module
  beforeEach(module('textbookApp'));

  // instantiate service
  var schedMsg;
  beforeEach(inject(function (_schedMsg_) {
    schedMsg = _schedMsg_;
  }));

  it('should do something', function () {
    expect(!!schedMsg).toBe(true);
  });

});
