"use strict";

var _react = _interopRequireDefault(require("react"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(_ref) {
  var match = _ref.match,
      history = _ref.history,
      info = _ref.info,
      collection = _ref.collection,
      config = _ref.config,
      _id = _ref._id;
  var primary = info.primary,
      secondary = info.secondary,
      extra = info.extra;
  return _react.default.createElement(_ListItem.default, {
    button: true,
    onClick: function onClick() {
      return history.push("".concat(match.url, "/").concat(_id));
    },
    key: _id
  }, _react.default.createElement(_Typography.default, {
    type: "body1",
    component: "p"
  }, extra), _react.default.createElement(_ListItemText.default, {
    primary: primary,
    secondary: secondary
  }), _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement(_IconButton.default, {
    onClick: function onClick() {
      return config.listHandleRemove(_id, collection);
    },
    "aria-label": "Delete"
  }, _react.default.createElement(_Delete.default, null))));
};

module.exports = render;