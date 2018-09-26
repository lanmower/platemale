"use strict";

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddButton = function AddButton(history, Collection) {
  return _react.default.createElement(_IconButton.default, {
    "aria-label": "add",
    style: {
      color: "white"
    },
    onClick: function onClick() {
      history.push('/' + Collection._name + '/new');
    }
  }, _react.default.createElement(_Add.default, null));
};

module.exports = AddButton;