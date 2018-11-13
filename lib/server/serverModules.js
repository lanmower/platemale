"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = _interopRequireDefault(require("../account/server"));

var _server2 = _interopRequireDefault(require("../oauth/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Meteor.modules = {
  account: _server.default,
  oauth: _server2.default
};
console.log('test');
var _default = Meteor.modules;
exports.default = _default;