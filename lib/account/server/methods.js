"use strict";

var _editProfile = _interopRequireDefault(require("./edit-profile"));

var _rateLimit = _interopRequireDefault(require("../../rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Meteor.methods({
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      password: Match.Optional(Object),
      profile: {
        name: {
          first: String,
          last: String
        }
      }
    });
    return (0, _editProfile.default)({
      userId: this.userId,
      profile: profile
    }).then(function (response) {
      return response;
    }).catch(function (exception) {
      throw new Meteor.Error('500', exception);
    });
  }
});
(0, _rateLimit.default)({
  methods: ['users.editProfile'],
  limit: 5,
  timeRange: 1000
});