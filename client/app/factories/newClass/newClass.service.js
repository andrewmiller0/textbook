'use strict';

angular.module('textbookApp')
  .factory('newClass', function () {
    // Service logic
    // ...

    var changed = false;

    // Public API here
    return {
      get: function () {
        return changed;
      }, 
      set: function(val) {
        changed = val;
      }
    };
  });
