"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Save = _interopRequireDefault(require("@material-ui/icons/Save"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _NotFound = _interopRequireDefault(require("./components/NotFound"));

var _handleSubmit = _interopRequireDefault(require("./handleSubmit"));

var _styles = require("@material-ui/core/styles");

var _Radio = _interopRequireDefault(require("@material-ui/core/Radio"));

var _modules = _interopRequireDefault(require("./modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/*const {
  Bert
} = require('meteor/themeteorchef:bert');*/
var styles = function styles(theme) {
  return {
    formfield: {
      paddingBottom: "1em"
    },
    root: {}
  };
};

var Editor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor(props) {
    var _this;

    _classCallCheck(this, Editor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Editor).call(this, props));
    var state = {};
    props.config.schema.map(function (field) {
      state[field.name] = field.default;
    });
    var _this$props = _this.props,
        doc = _this$props.doc,
        config = _this$props.config,
        navButtonStore = _this$props.navButtonStore;
    state = doc || state;
    navButtonStore.set(_react.default.createElement(_IconButton.default, {
      className: "raised",
      color: "primary",
      style: {
        color: "white"
      },
      onClick: function onClick(e) {
        _handleSubmit.default.bind(_assertThisInitialized(_assertThisInitialized(_this)))(e);
      }
    }, _react.default.createElement(_Save.default, null)));
    _this.state = state;
    return _this;
  }

  _createClass(Editor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = this;
      var _this$props2 = this.props,
          doc = _this$props2.doc,
          config = _this$props2.config;
      var schema = config.schema;
      var rules = {};
      var messages = {};
      schema.map(function (field) {
        rules[field.name] = {
          required: field.required
        };
        messages[field.name] = {
          required: field.requiredMessage
        };
      });
      if (doc) this.setState(doc);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          doc = _this$props3.doc,
          config = _this$props3.config,
          classes = _this$props3.classes;
      var schema = config.schema;
      var state = this.state;
      var _Meteor = Meteor,
          formgroupstyle = _Meteor.formgroupstyle,
          formlabelstyle = _Meteor.formlabelstyle,
          containerstyle = _Meteor.containerstyle;
      return _react.default.createElement("form", {
        ref: function ref(form) {
          return _this2.form = form;
        },
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, _react.default.createElement(_FormGroup.default, null, schema.map(function (field) {
        var value = _this2.state[field.name] ? _this2.state[field.name] : field.default;
        var newState = {};
        field.view = 'form';

        if (state) {
          var customElement = (0, _modules.default)({
            field: field,
            state: state,
            setState: _this2.setState.bind(_this2)
          });
          return _react.default.createElement("div", {
            className: classes.formfield,
            key: field.name
          }, customElement);
        }
      })), _react.default.createElement(_Button.default, {
        className: "fab",
        color: "primary",
        "aria-label": "add",
        type: "submit",
        onClick: function onClick(e) {
          _handleSubmit.default.bind(_this2)(e);
        }
      }, _react.default.createElement(_Save.default, null), "Save"));
    }
  }]);

  return Editor;
}(_react.default.Component);

Editor.propTypes = {
  doc: _propTypes.default.object,
  schema: _propTypes.default.array,
  collection: _propTypes.default.object,
  config: _propTypes.default.object
};
module.exports = (0, _styles.withStyles)(styles)(Editor);