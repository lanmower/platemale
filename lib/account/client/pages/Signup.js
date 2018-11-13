"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactRouterDom = require("react-router-dom");

var _OAuthLoginButtons = _interopRequireDefault(require("../components/OAuthLoginButtons"));

var _AccountPageFooter = _interopRequireDefault(require("../components/AccountPageFooter"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

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

var Signup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    var _this;

    _classCallCheck(this, Signup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Signup).call(this, props));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Signup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = this;
      /*validate(component.form, {
        rules: {
          firstName: {
            required: true,
          },
          lastName: {
            required: true,
          },
          emailAddress: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength: 6,
          },
        },
        messages: {
          firstName: {
            required: 'What\'s your first name?',
          },
          lastName: {
            required: 'What\'s your last name?',
          },
          emailAddress: {
            required: 'Need an email address here.',
            email: 'Is this email address correct?',
          },
          password: {
            required: 'Need a password here.',
            minlength: 'Please use at least six characters.',
          },
        },
        submitHandler() { component.handleSubmit(); },
      });*/
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var history = this.props.history;
      Accounts.createUser({
        email: this.emailAddress.value,
        password: this.password.value,
        profile: {
          name: {
            first: this.firstName.value,
            last: this.lastName.value
          }
        }
      }, function (error) {
        if (error) {
          window.dialog(error.reason, 'danger');
        } else {
          window.dialog('Welcome!', 'success');
          history.push('/');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _Meteor = Meteor,
          formgroupstyle = _Meteor.formgroupstyle,
          formlabelstyle = _Meteor.formlabelstyle,
          containerstyle = _Meteor.containerstyle;
      return _react.default.createElement("div", {
        className: "Signup"
      }, _react.default.createElement("div", null, _react.default.createElement("h4", {
        className: "page-header"
      }, "Sign Up"), _react.default.createElement(_OAuthLoginButtons.default, {
        services: ['facebook', 'github', 'google'],
        emailMessage: {
          offset: 97,
          text: ''
        }
      }), _react.default.createElement("form", {
        ref: function ref(form) {
          return _this2.form = form;
        },
        onSubmit: function onSubmit(event) {
          event.preventDefault();

          _this2.handleSubmit();
        }
      }, _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "First Name"), _react.default.createElement("input", {
        type: "text",
        name: "firstName",
        ref: function ref(firstName) {
          return _this2.firstName = firstName;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "Last Name"), _react.default.createElement("input", {
        type: "text",
        name: "lastName",
        ref: function ref(lastName) {
          return _this2.lastName = lastName;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "Email Address"), _react.default.createElement("input", {
        type: "email",
        name: "emailAddress",
        ref: function ref(emailAddress) {
          return _this2.emailAddress = emailAddress;
        },
        className: "form-control"
      })), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_FormLabel.default, null, "Password"), _react.default.createElement("input", {
        type: "password",
        name: "password",
        ref: function ref(password) {
          return _this2.password = password;
        },
        className: "form-control"
      }), "Use at least six characters."), _react.default.createElement(_FormGroup.default, null, _react.default.createElement(_Button.default, {
        type: "submit",
        raised: true,
        color: "primary"
      }, "Sign Up"), "Already have an account? ", _react.default.createElement(_reactRouterDom.Link, {
        to: "/signup"
      }, "Log In"), "."))));
    }
  }]);

  return Signup;
}(_react.default.Component);

Signup.propTypes = {
  history: _propTypes.default.object.isRequired
};
module.exports = Signup;