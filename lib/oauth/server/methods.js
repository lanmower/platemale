"use strict";

var _rateLimit = _interopRequireDefault(require("../../rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Meteor.methods({
  'oauth.verifyConfiguration': function oauthVerifyConfiguration(services) {
    if (typeof services != 'array') return;

    try {
      var verifiedServices = [];
      services.forEach(function (service) {
        if (ServiceConfiguration.configurations.findOne({
          service: service
        })) {
          verifiedServices.push(service);
        }
      });
      return verifiedServices.sort();
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  }
});
(0, _rateLimit.default)({
  methods: ['oauth.verifyConfiguration'],
  limit: 5,
  timeRange: 1000
});