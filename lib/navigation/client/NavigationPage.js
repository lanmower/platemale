"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.navButtonStore = void 0;

var _react = _interopRequireDefault(require("react"));

var _Loading = _interopRequireDefault(require("../../client/components/Loading"));

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var navButtonStore = new ReactiveVar();
exports.navButtonStore = navButtonStore;

var handleSubmit = function handleSubmit() {};

var styles = function styles(theme) {
  return {
    root: {
      paddingLeft: "1em",
      paddingRight: "1em",
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  };
};

var _default = function _default(View) {
  return (0, _styles.withStyles)(styles)(function (props) {
    var classes = props.classes;
    return _react.default.createElement("div", {
      className: props.config ? props.config.name : ""
    }, _react.default.createElement(_Navigation.default, _extends({
      navButtonStore: navButtonStore
    }, props)), _react.default.createElement(_Paper.default, {
      elevation: 0,
      className: classes.root
    }, !props.loading ? _react.default.createElement(View, _extends({
      navButtonStore: navButtonStore
    }, props)) : _react.default.createElement(_Loading.default, null)));
  });
};

exports.default = _default;