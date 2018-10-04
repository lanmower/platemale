"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMeteorData = require("meteor/react-meteor-data");

var _reactiveVar = require("meteor/reactive-var");

var _OAuthLoginButton = _interopRequireDefault(require("./OAuthLoginButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OAuthLoginButtons = function OAuthLoginButtons(_ref) {
  var services = _ref.services,
      emailMessage = _ref.emailMessage;
  return services.length ? _react.default.createElement("div", {
    className: "OAuthLoginButtons ".concat(emailMessage ? 'WithEmailMessage' : '')
  }, services.map(function (service) {
    return _react.default.createElement(_OAuthLoginButton.default, {
      key: service,
      service: service
    });
  }), emailMessage ? _react.default.createElement("p", {
    className: "EmailMessage",
    style: {
      marginLeft: "-".concat(emailMessage.offset, "px")
    }
  }, emailMessage.text) : '') : _react.default.createElement("div", null);
};

OAuthLoginButtons.propTypes = {
  services: _propTypes.default.array.isRequired
};
var verificationComplete = new _reactiveVar.ReactiveVar(false);
var verifiedServices = new _reactiveVar.ReactiveVar([]);
module.exports = (0, _reactMeteorData.withTracker)(function (_ref2) {
  var services = _ref2.services;

  if (!verificationComplete.get()) {
    Meteor.call('oauth.verifyConfiguration', services, function (error, response) {
      if (error) {
        console.warn(error);
      } else {
        verifiedServices.set(response);
        verificationComplete.set(true);
      }
    });
  }

  return {
    services: verifiedServices.get()
  };
})(OAuthLoginButtons);