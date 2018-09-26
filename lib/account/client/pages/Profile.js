"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _themeteorchefBert = require("meteor/themeteorchef:bert");

var _reactMeteorData = require("meteor/react-meteor-data");

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _Save = _interopRequireDefault(require("@material-ui/icons/Save"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Profile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    var _this;

    _classCallCheck(this, Profile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Profile).call(this, props));
    _this.getUserType = _this.getUserType.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderOAuthUser = _this.renderOAuthUser.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderPasswordUser = _this.renderPasswordUser.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderProfileForm = _this.renderProfileForm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Profile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = this;
      validate(component.form, {
        rules: {
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          emailAddress: {
            required: true,
            email: true
          },
          currentPassword: {
            required: function required() {
              // Only required if newPassword field has a value.
              return component.newPassword.value.length > 0;
            }
          },
          newPassword: {
            required: function required() {
              // Only required if currentPassword field has a value.
              return component.currentPassword.value.length > 0;
            }
          }
        },
        messages: {
          firstName: {
            required: 'What\'s your first name?'
          },
          lastName: {
            required: 'What\'s your last name?'
          },
          emailAddress: {
            required: 'Need an email address here.',
            email: 'Is this email address correct?'
          },
          currentPassword: {
            required: 'Need your current password if changing.'
          },
          newPassword: {
            required: 'Need your new password if changing.'
          }
        },
        submitHandler: function submitHandler() {
          component.handleSubmit();
        }
      });
    }
  }, {
    key: "getUserType",
    value: function getUserType(user) {
      var userToCheck = user;
      delete userToCheck.services.resume;
      var service = Object.keys(userToCheck.services)[0];
      return service === 'password' ? 'password' : 'oauth';
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var profile = {
        emailAddress: this.emailAddress.value,
        profile: {
          name: {
            first: this.firstName.value,
            last: this.lastName.value
          }
        }
      };
      if (this.newPassword.value) profile.password = Accounts._hashPassword(this.newPassword.value);
      Meteor.call('users.editProfile', profile, function (error) {
        if (error) {
          _themeteorchefBert.Bert.alert(error.reason, 'danger');
        } else {
          _themeteorchefBert.Bert.alert('Profile updated!', 'success');
        }
      });
    }
  }, {
    key: "renderOAuthUser",
    value: function renderOAuthUser(loading, user) {
      return !loading ? _react.default.createElement("div", {
        className: "OAuthProfile"
      }, Object.keys(user.services).map(function (service) {
        return _react.default.createElement("div", {
          key: service,
          className: "LoggedInWith ".concat(service)
        }, _react.default.createElement("div", {
          className: "ServiceIcon"
        }, _react.default.createElement("i", {
          className: "fa fa-".concat(service === 'facebook' ? 'facebook-official' : service)
        })), _react.default.createElement("p", null, "You're logged in with ".concat(capitalize(service), " using the email address ").concat(user.services[service].email, ".")));
      })) : _react.default.createElement("div", null);
    }
  }, {
    key: "renderPasswordUser",
    value: function renderPasswordUser(loading, user) {
      var _this2 = this;

      return !loading ? _react.default.createElement("div", null, _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "First Name"), _react.default.createElement("input", {
        type: "text",
        name: "firstName",
        defaultValue: user.profile.name.first,
        ref: function ref(firstName) {
          return _this2.firstName = firstName;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "Last Name"), _react.default.createElement("input", {
        type: "text",
        name: "lastName",
        defaultValue: user.profile.name.last,
        ref: function ref(lastName) {
          return _this2.lastName = lastName;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "Email Address"), _react.default.createElement("input", {
        type: "email",
        name: "emailAddress",
        defaultValue: user.emails[0].address,
        ref: function ref(emailAddress) {
          return _this2.emailAddress = emailAddress;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "Current Password"), _react.default.createElement("input", {
        type: "password",
        name: "currentPassword",
        ref: function ref(currentPassword) {
          return _this2.currentPassword = currentPassword;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "New Password"), _react.default.createElement("input", {
        type: "password",
        name: "newPassword",
        ref: function ref(newPassword) {
          return _this2.newPassword = newPassword;
        },
        className: "form-control"
      })), "Use at least six characters.", _react.default.createElement(_FormGroup.default, null)) : _react.default.createElement("div", null);
    }
  }, {
    key: "renderProfileForm",
    value: function renderProfileForm(loading, user) {
      return !loading ? {
        password: this.renderPasswordUser,
        oauth: this.renderOAuthUser
      }[this.getUserType(user)](loading, user) : _react.default.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          loading = _this$props.loading,
          user = _this$props.user;
      var _Meteor = Meteor,
          formgroupstyle = _Meteor.formgroupstyle,
          formlabelstyle = _Meteor.formlabelstyle,
          containerstyle = _Meteor.containerstyle;
      buttonStore.set(_react.default.createElement(_Save.default, {
        onClick: this.handleSubmit
      }));
      return _react.default.createElement(_Paper.default, {
        className: "Profile"
      }, _react.default.createElement("form", {
        ref: function ref(form) {
          return _this3.form = form;
        },
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, this.renderProfileForm(loading, user)));
    }
  }]);

  return Profile;
}(_react.default.Component);

Profile.propTypes = {
  loading: _propTypes.default.bool.isRequired,
  user: _propTypes.default.object.isRequired
};
module.exports = (0, _reactMeteorData.createContainer)(function () {
  var subscription = Meteor.subscribe('users.editProfile');
  return {
    loading: !subscription.ready(),
    user: Meteor.user()
  };
}, Profile);