"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactMeteorData = require("meteor/react-meteor-data");

var _NotFound = _interopRequireDefault(require("./NotFound"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

require("react-virtualized/styles.css");

require("react-virtualized-select/styles.css");

require("./clientModules");

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var AppRouter = function AppRouter(props) {
  var routes = [];

  for (var moduleIndex in Meteor.modules) {
    var module = Meteor.modules[moduleIndex];

    if (module.routes) {
      for (var routeIndex in module.routes) {
        routes.push(module.routes[routeIndex]);
      }
    }
  }

  var x = 0;
  return _react.default.createElement("div", null, _react.default.createElement(_CssBaseline.default, null), _react.default.createElement(_Dialog.default, null), _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, routes.map(function (route) {
    return _react.default.createElement(_reactRouterDom.Route, _extends({
      exact: true,
      key: x++,
      path: route.path,
      component: route.component
    }, props));
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _NotFound.default
  }))));
};

AppRouter.propTypes = {};

var getUserName = function getUserName(name) {
  return {
    string: name,
    object: "".concat(name.first, " ").concat(name.last)
  }[_typeof(name)];
};

var AppContainer = (0, _reactMeteorData.withTracker)(function () {
  var _Meteor$status = Meteor.status(),
      connected = _Meteor$status.connected;

  return {
    connected: connected
  };
})(AppRouter);
(0, _reactDom.render)(_react.default.createElement(AppContainer, null), document.getElementById('app'));