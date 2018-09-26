
let action;

const updatePassword = (userId, newPassword) => {
  try {
    Accounts.setPassword(userId, newPassword, { logout: false });
  } catch (exception) {
    action.reject(`[editProfile.updatePassword] ${exception}`);
  }
};

const updateUser = (userId, { emailAddress, profile }) => {
  try {
    Meteor.users.update(userId, {
      $set: {
        'emails.0.address': emailAddress,
        profile,
      },
    });
  } catch (exception) {
    action.reject(`[editProfile.updateUser] ${exception}`);
  }
};

const editProfile = ({ userId, profile }, promise) => {
  try {
    action = promise;

    updateUser(userId, profile);
    if (profile.password) updatePassword(userId, profile.password);

    action.resolve();
  } catch (exception) {
    action.reject(`[editProfile.handler] ${exception}`);
  }
};

module.exports =  options =>
new Promise((resolve, reject) =>
editProfile(options, { resolve, reject }));
