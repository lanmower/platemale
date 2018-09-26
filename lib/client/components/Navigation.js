"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.menuStore = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _AuthenticatedNavigation = _interopRequireDefault(require("./AuthenticatedNavigation"));

var _PublicNavigation = _interopRequireDefault(require("./PublicNavigation"));

var _OfflineNavigation = _interopRequireDefault(require("./OfflineNavigation"));

var _reactRouterDom = require("react-router-dom");

var _reactMeteorData = require("meteor/react-meteor-data");

var _alanningRoles = _interopRequireDefault(require("meteor/alanning:roles"));

var _Loading = _interopRequireDefault(require("./Loading"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AuthenticatedDisplay = function AuthenticatedDisplay(props) {
  var authenticated = props.authenticated;
  return authenticated ? _react.default.createElement(_AuthenticatedNavigation.default, props) : _react.default.createElement(_PublicNavigation.default, props);
};

var menuStore = ReactiveVar([]);
exports.menuStore = menuStore;

var Navigation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(Navigation).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          match = _this$props.match,
          location = _this$props.location,
          history = _this$props.history,
          title = _this$props.title,
          authenticated = _this$props.authenticated,
          loading = _this$props.loading,
          connected = _this$props.connected,
          navButtons = _this$props.navButtons;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        style: {
          height: "65px"
        }
      }), _react.default.createElement(_AppBar.default, {
        position: "fixed"
      }, _react.default.createElement(_Toolbar.default, null, !connected ? _react.default.createElement(_OfflineNavigation.default, this.props) : _react.default.createElement(AuthenticatedDisplay, this.props), _react.default.createElement(_Typography.default, {
        type: "title",
        color: "inherit"
      }, title), _react.default.createElement("div", {
        style: {
          marginRight: "0px",
          marginLeft: "auto"
        }
      }, navButtons), loading ? _react.default.createElement(_Loading.default, null) : false)));
    }
  }]);

  return Navigation;
}(_react.default.Component);

_defineProperty(Navigation, "propTypes", {
  authenticated: _propTypes.default.bool.isRequired,
  match: _propTypes.default.object.isRequired,
  location: _propTypes.default.object.isRequired,
  history: _propTypes.default.object.isRequired,
  loading: _propTypes.default.bool
});

var _default = (0, _reactRouterDom.withRouter)((0, _reactMeteorData.createContainer)(function () {
  var loggingIn = Meteor.loggingIn();
  var userId = Meteor.userId();
  return {
    loggingIn: loggingIn,
    authenticated: !loggingIn && !!userId,
    connected: Meteor.status().connected,
    options: menuStore.get()
  };
}, Navigation));

exports.default = _default;