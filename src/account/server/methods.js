import editProfile from './edit-profile'
import rateLimit from '../../rate-limit';

Meteor.methods({
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      password: Match.Optional(Object),
      profile: {
        name: {
          first: String,
          last: String,
        },
      },
    });

    return editProfile({ userId: this.userId, profile })
    .then(response => response)
    .catch((exception) => {
      throw new Meteor.Error('500', exception);
    });
  },
});

rateLimit({
  methods: [
    'users.editProfile',
  ],
  limit: 5,
  timeRange: 1000,
});
