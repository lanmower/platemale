const fetchMethodNames = methods => {
  return methods['name'];
}

const assignLimits = ({ methods, limit, timeRange }) => {
  console.log(methods);
  const methodNames = fetchMethodNames(methods);

  if (Meteor.isServer) {
    DDPRateLimiter.addRule({
      name(name) {
         if(methodNames) return methodNames.includes(name);
      },
      connectionId() { return true; },
    }, limit, timeRange);
  }
};

module.exports = function rateLimit(options) {
   return assignLimits(options);
 }
