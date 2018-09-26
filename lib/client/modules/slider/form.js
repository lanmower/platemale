"use strict";

var _react = _interopRequireDefault(require("react"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _Slider = _interopRequireDefault(require("@material-ui/lab/Slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var field = _ref.field,
      state = _ref.state,
      setState = _ref.setState;

  var onChange = function onChange(event, value) {
    var newState = {};
    newState[field.name] = value;
    setState(newState);
  };

  return _react.default.createElement("div", null, _react.default.createElement(_FormLabel.default, null, field.label), _react.default.createElement(_Slider.default, {
    min: field.min,
    max: field.max,
    step: field.step,
    value: state[field.name],
    onChange: onChange
  }), _react.default.createElement(_FormLabel.default, null, state[field.name]));
};