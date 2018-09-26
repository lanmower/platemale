"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Editor = _interopRequireDefault(require("./Editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(props) {
  return _react.default.createElement("div", {
    className: "New"
  }, _react.default.createElement(_Editor.default, props));
};

module.exports = render;