"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var field = _ref.field,
      state = _ref.state,
      onChange = _ref.onChange;
  return _react.default.createElement("div", null, _react.default.createElement("b", null, field.label), ":", state[field.name]);
};