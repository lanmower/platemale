"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var icon = _ref.icon;
  return _react.default.createElement("i", {
    className: "fa fa-".concat(icon)
  });
};

Icon.propTypes = {
  icon: _propTypes.default.string.isRequired
};
module.exports = Icon;