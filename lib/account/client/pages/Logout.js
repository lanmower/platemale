"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logout = function Logout() {
  return _react.default.createElement("div", {
    className: "Logout"
  }, _react.default.createElement(Navigation, {
    title: "Sign out"
  }), _react.default.createElement("h1", null, "You are signed out."));
};

Logout.propTypes = {};
module.exports = Logout;