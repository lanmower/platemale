"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

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

var ResetPassword =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ResetPassword, _React$Component);

  function ResetPassword(props) {
    var _this;

    _classCallCheck(this, ResetPassword);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResetPassword).call(this, props));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ResetPassword, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = this;
      validate(component.form, {
        rules: {
          newPassword: {
            required: true,
            minlength: 6
          },
          repeatNewPassword: {
            required: true,
            minlength: 6,
            equalTo: '[name="newPassword"]'
          }
        },
        messages: {
          newPassword: {
            required: 'Enter a new password, please.',
            minlength: 'Use at least six characters, please.'
          },
          repeatNewPassword: {
            required: 'Repeat your new password, please.',
            equalTo: 'Hmm, your passwords don\'t match. Try again?'
          }
        },
        submitHandler: function submitHandler() {
          component.handleSubmit();
        }
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this$props = this.props,
          match = _this$props.match,
          history = _this$props.history;
      var token = match.params.token;
      Accounts.resetPassword(token, this.newPassword.value, function (error) {
        if (error) {
          window.dialog(error.reason, 'danger');
        } else {
          history.push('/');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "ResetPassword"
      }, _react.default.createElement("h4", {
        className: "page-header"
      }, "Reset Password"), _react.default.createElement("form", {
        ref: function ref(form) {
          return _this2.form = form;
        },
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, "New Password", _react.default.createElement("input", {
        type: "password",
        className: "form-control",
        ref: function ref(newPassword) {
          return _this2.newPassword = newPassword;
        },
        name: "newPassword",
        placeholder: "New Password"
      }), "Repeat New Password", _react.default.createElement("input", {
        type: "password",
        className: "form-control",
        ref: function ref(repeatNewPassword) {
          return _this2.repeatNewPassword = repeatNewPassword;
        },
        name: "repeatNewPassword",
        placeholder: "Repeat New Password"
      }), _react.default.createElement(_Button.default, {
        type: "submit"
      }, "Reset Password & Login")));
    }
  }]);

  return ResetPassword;
}(_react.default.Component);

ResetPassword.propTypes = {
  match: _propTypes.default.object.isRequired,
  history: _propTypes.default.object.isRequired
};
module.exports = ResetPassword;