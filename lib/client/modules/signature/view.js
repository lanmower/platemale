"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sig =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Sig, _React$Component);

  function Sig(props) {
    var _this;

    _classCallCheck(this, Sig);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sig).call(this, props));
    _this.state = {
      email: props.state.user.primaryEmail
    };
    return _this;
  }

  _createClass(Sig, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this2 = this;

      var history = this.props.history;
      this.setState({
        "doingSignature": true
      });
      Meteor.call("setSignature", this.state.email, this.state.title, this.state.role, this.state.phone, this.state.email.split("@")[1], function (err, res) {
        _this2.setState({
          "doingSignature": false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      //const age = Moment(doc.startTime).fromNow();
      return _react.default.createElement("div", null, _react.default.createElement("form", {
        ref: function ref(form) {
          return _this3.form = form;
        },
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, _react.default.createElement("div", null, "Roles"), _react.default.createElement("div", null, _react.default.createElement("input", {
        id: "role",
        label: "Role",
        value: this.state.role,
        onChange: function onChange(event) {
          return _this3.setState({
            role: event.target.value
          });
        }
      })), _react.default.createElement("div", null, "Title"), _react.default.createElement("div", null, _react.default.createElement("input", {
        id: "title",
        label: "Title",
        value: this.state.title,
        onChange: function onChange(event) {
          return _this3.setState({
            title: event.target.value
          });
        }
      })), _react.default.createElement("div", null, "Phone"), _react.default.createElement("div", null, _react.default.createElement("input", {
        id: "phone",
        label: "Phone",
        value: this.state.phone,
        onChange: function onChange(event) {
          return _this3.setState({
            phone: event.target.value
          });
        }
      }), _react.default.createElement("div", null, _react.default.createElement("button", {
        onClick: function onClick(e) {
          return _this3.handleSubmit(e);
        }
      }, "Set Signature")))), _react.default.createElement("div", null, "Email: ", this.state.email), this.state.doingSignature ? _react.default.createElement("div", null, "Setting Signature") : false);
    }
  }]);

  return Sig;
}(_react.default.Component);

module.exports = function (config) {
  var field = config.field,
      state = config.state,
      props = config.props;
  return _react.default.createElement(Sig, {
    field: field,
    state: state,
    props: props
  });
};