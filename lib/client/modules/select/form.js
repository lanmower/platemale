"use strict";

var _react = _interopRequireDefault(require("react"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var field = _ref.field,
      state = _ref.state,
      setState = _ref.setState;
  var options = field.options,
      label = field.label,
      name = field.name,
      path = field.path;

  var onChange = function onChange(event) {
    var newState = {};
    newState[field.name] = event.target.value;
    setState(newState);
  };

  return _react.default.createElement("div", null, _react.default.createElement(_FormLabel.default, null, label), _react.default.createElement(_Select.default, {
    value: state[name],
    onChange: onChange,
    inputProps: {
      name: name
    }
  }, options.map(function (option) {
    return _react.default.createElement(_MenuItem.default, {
      key: option.value,
      value: option.value
    }, option.label);
  })));
};