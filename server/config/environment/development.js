'use strict';
var localENV = require('../local.env.js')
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/textbook-dev'
  },

  twilio: {
    clientID:     localENV.TWILIO_ACCOUNT_SID,
    clientToken: localENV.TWILIO_AUTH_TOKEN
  },

  seedDB: true
};
