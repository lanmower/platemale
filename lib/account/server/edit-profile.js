"use strict";

var action;

var updatePassword = function updatePassword(userId, newPassword) {
  try {
    Accounts.setPassword(userId, newPassword, {
      logout: false
    });
  } catch (exception) {
    action.reject("[editProfile.updatePassword] ".concat(exception));
  }
};

var updateUser = function updateUser(userId, _ref) {
  var emailAddress = _ref.emailAddress,
      profile = _ref.profile;

  try {
    Meteor.users.update(userId, {
      $set: {
        'emails.0.address': emailAddress,
        profile: profile
      }
    });
  } catch (exception) {
    action.reject("[editProfile.updateUser] ".concat(exception));
  }
};

var editProfile = function editProfile(_ref2, promise) {
  var userId = _ref2.userId,
      profile = _ref2.profile;

  try {
    action = promise;
    updateUser(userId, profile);
    if (profile.password) updatePassword(userId, profile.password);
    action.resolve();
  } catch (exception) {
    action.reject("[editProfile.handler] ".concat(exception));
  }
};

module.exports = function (options) {
  return new Promise(function (resolve, reject) {
    return editProfile(options, {
      resolve: resolve,
      reject: reject
    });
  });
};