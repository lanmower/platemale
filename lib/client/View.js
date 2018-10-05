"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _NotFound = _interopRequireDefault(require("./components/NotFound"));

var _modules = _interopRequireDefault(require("./modules"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _styles = require("@material-ui/core/styles");

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var styles = function styles(theme) {
  return {
    root: {
      padding: "1em",
      minWidth: 600,
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  };
};

var ViewComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ViewComponent, _React$Component);

  function ViewComponent(props) {
    var _this;

    _classCallCheck(this, ViewComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewComponent).call(this, props));
    _this.state = {};
    var _this$props = _this.props,
        navButtonStore = _this$props.navButtonStore,
        collections = _this$props.collections,
        match = _this$props.match,
        doc = _this$props.doc,
        history = _this$props.history,
        config = _this$props.config,
        _id = _this$props._id,
        collection = _this$props.collection;
    navButtonStore.set(_react.default.createElement("div", null, _react.default.createElement(_IconButton.default, {
      className: "raised",
      style: {
        color: "white"
      },
      onClick: function onClick() {
        return config.viewHandleRemove(_id, collection, history);
      },
      "aria-label": "Delete"
    }, _react.default.createElement(_Delete.default, null)), _react.default.createElement(_IconButton.default, {
      className: "raised",
      style: {
        color: "white"
      },
      onClick: function onClick() {
        return history.push("".concat(match.url, "/edit"));
      },
      "aria-label": "Delete"
    }, _react.default.createElement(_Edit.default, null))));
    return _this;
  }

  _createClass(ViewComponent, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          doc = _this$props2.doc,
          match = _this$props2.match,
          history = _this$props2.history,
          loading = _this$props2.loading,
          collection = _this$props2.collection,
          classes = _this$props2.classes,
          config = _this$props2.config;
      var state = this.state;
      var schema = config.schema;
      return doc ? _react.default.createElement("div", {
        className: "View"
      }, _react.default.createElement(_Paper.default, {
        elevation: 0,
        className: classes.root
      }, _react.default.createElement("div", null, schema.map(function (field) {
        var value = doc[field.name];
        field.view = 'view';
        var customElement = (0, _modules.default)({
          field: field,
          state: doc,
          value: value
        });
        return _react.default.createElement("div", {
          key: field.name
        }, customElement);
      })))) : _react.default.createElement(_NotFound.default, null);
    }
  }]);

  return ViewComponent;
}(_react.default.Component);

;
module.exports = (0, _styles.withStyles)(styles)(ViewComponent);