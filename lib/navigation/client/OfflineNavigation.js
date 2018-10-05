"use strict";

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Menu2 = _interopRequireDefault(require("@material-ui/icons/Menu"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @flow weak
var React = require('react');

var Component = React.Component;
var options = [];

var Navigation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Navigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Navigation)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      anchorEl: null,
      selectedIndex: 1
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickListItem", function (event) {
      _this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMenuItemClick", function (event, index) {
      _this.setState({
        selectedIndex: index,
        anchorEl: null
      });
    });

    return _this;
  }

  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          match = _this$props.match,
          location = _this$props.location,
          history = _this$props.history;
      var anchorEl = this.state.anchorEl;
      return React.createElement("div", null, React.createElement(_IconButton.default, {
        className: "raised",
        color: "primary",
        style: {
          color: "white"
        },
        "aria-label": "Menu",
        onClick: this.handleClick
      }, React.createElement(_Menu2.default, null)), React.createElement(_Menu.default, {
        id: "lock-menu",
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onClose: this.handleClose
      }, options.map(function (option, index) {
        return React.createElement(_MenuItem.default, {
          key: option.name,
          disabled: index === 0,
          selected: index === _this2.state.selectedIndex,
          onClick: function onClick(event) {
            return _this2.handleMenuItemClick(event, index);
          }
        }, option.title);
      }), React.createElement(_MenuItem.default, {
        onClick: function onClick() {
          Meteor.logout();
        }
      }, "Sign out")));
    }
  }]);

  return Navigation;
}(React.Component);

_defineProperty(Navigation, "propTypes", {
  match: _propTypes.default.object.isRequired,
  location: _propTypes.default.object.isRequired,
  history: _propTypes.default.object.isRequired
});

module.exports = (0, _reactRouterDom.withRouter)(Navigation);