import rateLimit from '../../rate-limit';

Meteor.methods({
  'oauth.verifyConfiguration': function oauthVerifyConfiguration(services) {
    if(typeof services != 'array')return;

    try {
      const verifiedServices = [];
      services.forEach((service) => {
        if (ServiceConfiguration.configurations.findOne({ service })) {
          verifiedServices.push(service);
        }
      });
      return verifiedServices.sort();
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'oauth.verifyConfiguration',
  ],
  limit: 5,
  timeRange: 1000,
});
