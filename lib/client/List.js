"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListDoc = _interopRequireDefault(require("./ListDoc"));

var _styles = require("@material-ui/core/styles");

var _AddButton = _interopRequireDefault(require("./AddButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var styles = function styles(theme) {
  return {
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3
    })
  };
};

var ListComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListComponent, _React$Component);

  _createClass(ListComponent, [{
    key: "handleUpload",
    value: function handleUpload(_ref) {
      var submissionsCollection = _ref.submissionsCollection;
      return function () {
        Bert.alert(submissionsCollection._name + 'Starting upload...', 'success');
        var docs = submissionsCollection.find().forEach(function (doc) {
          submissionsCollection.remove(doc._id);
          Meteor.call(submissionsCollection._name + '.insert', doc, function (error, _id) {
            if (error) {
              Bert.alert(error.reason, 'danger');
            } else {
              Bert.alert(submissionsCollection._name + ' uploaded!', 'success');
            }
          });
        });
      };
    }
  }]);

  function ListComponent(props) {
    var _this;

    _classCallCheck(this, ListComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListComponent).call(this, props));
    _this.state = {};
    var _this$props = _this.props,
        navButtonStore = _this$props.navButtonStore,
        collection = _this$props.collection,
        history = _this$props.history;
    navButtonStore.set(_react.default.createElement(_reactRouterDom.Link, {
      to: "".concat(collection._name, "/new")
    }, _react.default.createElement(_IconButton.default, {
      className: "raised",
      style: {
        color: "white"
      },
      "aria-label": "New"
    }, _react.default.createElement(_Add.default, null))));
    return _this;
  }

  _createClass(ListComponent, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          docs = _this$props2.docs,
          match = _this$props2.match,
          history = _this$props2.history,
          loading = _this$props2.loading,
          collection = _this$props2.collection,
          classes = _this$props2.classes,
          config = _this$props2.config;
      return _react.default.createElement(_Paper.default, {
        className: classes.root,
        elevation: 0
      }, docs.length ? _react.default.createElement(_List.default, null, docs.map(function (doc) {
        var info = {
          key: doc._id,
          primary: config.listView.primary(doc),
          secondary: config.listView.secondary(doc),
          extra: config.listView.extra(doc)
        };
        return _react.default.createElement(_ListDoc.default, {
          key: doc._id,
          _id: doc._id,
          info: info,
          doc: doc,
          history: history,
          match: match,
          collection: collection,
          config: config
        });
      })) : _react.default.createElement(_Typography.default, {
        type: "body1",
        component: "div"
      }, "No ", (0, _pluralize.default)(collection._name), " found."));
    }
  }]);

  return ListComponent;
}(_react.default.Component);

module.exports = (0, _styles.withStyles)(styles)(ListComponent);