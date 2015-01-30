'use strict';

describe('Service: Conversation', function () {

  // load the service's module
  beforeEach(module('textbookApp'));

  // instantiate service
  var conversation;
  beforeEach(inject(function (_conversation_) {
    conversation = _conversation_;
  }));

  it('should do something', function () {
    expect(!!conversation).toBe(true);
  });

});
