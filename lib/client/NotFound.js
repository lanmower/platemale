"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
  return _react.default.createElement("div", {
    className: "NotFound"
  }, _react.default.createElement("p", null, _react.default.createElement("strong", null, "Error [404]"), ": ", window.location.pathname, " does not exist."));
};

var _default = NotFound;
exports.default = _default;