import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://apps-apis.google.com/a/feeds/emailsettings/2.0/',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/tasks',
        'https://www.googleapis.com/auth/admin.directory.user',
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/admin.datatransfer',
        'https://www.googleapis.com/auth/plus.profiles.read'
      ],
      loginStyle: 'redirect',
      requestOfflineToken: true,
      forceApprovalPrompt: true
    },
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: <span><Icon icon="facebook-official" /> Log In with Facebook</span>,
  github: <span><Icon icon="github" /> Log In with GitHub</span>,
  google: <span><Icon icon="google" /> Log In with Google</span>,
};

const OAuthLoginButton = ({ service, callback }) => (
  <button
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </button>
);

OAuthLoginButton.defaultProps = {
  callback: (error) => {
    if (error) window.dialog(error.message, 'danger');
  },
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

module.exports =  OAuthLoginButton;
