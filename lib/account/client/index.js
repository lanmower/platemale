"use strict";

var _Profile = _interopRequireDefault(require("./pages/Profile"));

var _Signup = _interopRequireDefault(require("./pages/Signup"));

var _Login = _interopRequireDefault(require("./pages/Login"));

var _Logout = _interopRequireDefault(require("./pages/Logout"));

var _RecoverPassword = _interopRequireDefault(require("./pages/RecoverPassword"));

var _ResetPassword = _interopRequireDefault(require("./pages/ResetPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  routes: [{
    path: "/profile",
    component: _Profile.default
  }, {
    path: "/signup",
    component: _Signup.default
  }, {
    path: "/login",
    component: _Login.default
  }, {
    path: "/logout",
    component: _Logout.default
  }, {
    path: "/recover-password",
    component: _RecoverPassword.default
  }, {
    path: "/reset-password/:token",
    component: _ResetPassword.default
  }]
};