"use strict";

var _react = _interopRequireDefault(require("react"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var field = _ref.field,
      state = _ref.state,
      onChange = _ref.onChange;
  return _react.default.createElement("div", null, _react.default.createElement(_TextField.default, {
    id: field.name,
    label: field.label,
    margin: "normal",
    type: field.inputType ? field.inputType : "text",
    value: state[field.name],
    onChange: onChange,
    inputProps: {
      step: field.step
    },
    InputLabelProps: {
      shrink: true
    }
  }));
};