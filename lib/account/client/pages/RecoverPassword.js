"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactRouterDom = require("react-router-dom");

var _AccountPageFooter = _interopRequireDefault(require("../components/AccountPageFooter"));

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

var RecoverPassword =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RecoverPassword, _React$Component);

  function RecoverPassword(props) {
    var _this;

    _classCallCheck(this, RecoverPassword);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecoverPassword).call(this, props));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(RecoverPassword, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = this;
      validate(component.form, {
        rules: {
          emailAddress: {
            required: true,
            email: true
          }
        },
        messages: {
          emailAddress: {
            required: 'Need an email address here.',
            email: 'Is this email address correct?'
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
      var history = this.props.history;
      var email = this.emailAddress.value;
      Accounts.forgotPassword({
        email: email
      }, function (error) {
        if (error) {
          window.dialog(error.reason, 'danger');
        } else {
          window.dialog("Check ".concat(email, " for a reset link!"), 'success');
          history.push('/login');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "RecoverPassword"
      }, _react.default.createElement("h4", {
        className: "page-header"
      }, "Recover Password"), _react.default.createElement("form", {
        ref: function ref(form) {
          return _this2.form = form;
        },
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, "Email Address", _react.default.createElement("input", {
        type: "email",
        name: "emailAddress",
        ref: function ref(emailAddress) {
          return _this2.emailAddress = emailAddress;
        },
        className: "form-control"
      }), _react.default.createElement(_Button.default, {
        type: "submit"
      }, "Recover Password")));
    }
  }]);

  return RecoverPassword;
}(_react.default.Component);

RecoverPassword.propTypes = {
  history: _propTypes.default.object.isRequired
};
module.exports = RecoverPassword;