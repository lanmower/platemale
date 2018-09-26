"use strict";

var _react = _interopRequireDefault(require("react"));

var _Loading = _interopRequireDefault(require("./Loading"));

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

module.exports = function (View) {
  return (0, _styles.withStyles)(styles)(function (props) {
    var classes = props.classes;
    return _react.default.createElement("div", {
      className: props.config ? props.config.name : ""
    }, _react.default.createElement(_Navigation.default, props), _react.default.createElement(_Paper.default, {
      elevation: 0,
      className: classes.root
    }, !props.loading ? _react.default.createElement(View, props) : _react.default.createElement(_Loading.default, null)));
  });
};