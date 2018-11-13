"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("./Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleLogin = function handleLogin(service, callback) {
  var options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup'
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup'
    },
    google: {
      requestPermissions: ['https://www.googleapis.com/auth/userinfo.email', 'https://apps-apis.google.com/a/feeds/emailsettings/2.0/', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/admin.directory.user', 'https://mail.google.com/', 'https://www.googleapis.com/auth/admin.datatransfer', 'https://www.googleapis.com/auth/plus.profiles.read'],
      loginStyle: 'redirect',
      requestOfflineToken: true,
      forceApprovalPrompt: true
    }
  }[service];
  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle
  }[service](options, callback);
};

var serviceLabel = {
  facebook: _react.default.createElement("span", null, _react.default.createElement(_Icon.default, {
    icon: "facebook-official"
  }), " Log In with Facebook"),
  github: _react.default.createElement("span", null, _react.default.createElement(_Icon.default, {
    icon: "github"
  }), " Log In with GitHub"),
  google: _react.default.createElement("span", null, _react.default.createElement(_Icon.default, {
    icon: "google"
  }), " Log In with Google")
};

var OAuthLoginButton = function OAuthLoginButton(_ref) {
  var service = _ref.service,
      callback = _ref.callback;
  return _react.default.createElement("button", {
    className: "OAuthLoginButton OAuthLoginButton-".concat(service),
    type: "button",
    onClick: function onClick() {
      return handleLogin(service, callback);
    }
  }, serviceLabel[service]);
};

OAuthLoginButton.defaultProps = {
  callback: function callback(error) {
    if (error) window.dialog(error.message, 'danger');
  }
};
OAuthLoginButton.propTypes = {
  service: _propTypes.default.string.isRequired,
  callback: _propTypes.default.func
};
module.exports = OAuthLoginButton;