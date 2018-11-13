"use strict";

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var field = _ref.field,
      state = _ref.state,
      setState = _ref.setState;

  var onChange = function onChange(event, value) {
    var newState = {};
    newState[field.name] = event.target.value;
    setState(newState);
  };

  return _react.default.createElement("div", null, _react.default.createElement(_TextField.default, {
    id: field.name,
    label: field.label,
    margin: "normal",
    value: state[field.name],
    onChange: onChange
  }));
};