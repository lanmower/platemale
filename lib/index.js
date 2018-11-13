"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaults = _interopRequireDefault(require("./defaults"));

var _collection = require("./collection.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    Meteor = _global.Meteor;
var _exports = {};

if (Meteor.isServer) {
  Meteor.modules = _exports.modules = require('./server/serverModules').default;
  Meteor.startup(function () {
    console.log(Meteor.modules);
  });
} else {
  var _modules = require('./client/clientModules').default;

  Meteor.modules = _exports.modules = _modules;
  _exports.NavigationPage = require('./navigation/client/NavigationPage').default;
  Meteor.startup(function () {
    require("./client");

    console.log(Meteor.modules);
  });
}

_exports.defaults = _defaults.default;
_exports.initCollections = _collection.initCollections;
var _default = _exports;
exports.default = _default;