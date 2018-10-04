"use strict";

var fetchMethodNames = function fetchMethodNames(methods) {
  return methods['name'];
};

var assignLimits = function assignLimits(_ref) {
  var methods = _ref.methods,
      limit = _ref.limit,
      timeRange = _ref.timeRange;
  console.log(methods);
  var methodNames = fetchMethodNames(methods);

  if (Meteor.isServer) {
    DDPRateLimiter.addRule({
      name: function name(_name) {
        if (methodNames) return methodNames.includes(_name);
      },
      connectionId: function connectionId() {
        return true;
      }
    }, limit, timeRange);
  }
};

module.exports = function rateLimit(options) {
  return assignLimits(options);
};