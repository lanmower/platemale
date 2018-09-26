"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
  return _react.default.createElement("div", {
    className: "NotFound"
  }, _react.default.createElement("p", null, _react.default.createElement("strong", null, "Error [404]"), ": ", window.location.pathname, " does not exist."));
};

module.exports = NotFound;