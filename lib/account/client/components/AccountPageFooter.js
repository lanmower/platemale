"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountPageFooter = function AccountPageFooter(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    className: "AccountPageFooter"
  }, children);
};

AccountPageFooter.propTypes = {
  children: _propTypes.default.node.isRequired
};
module.exports = AccountPageFooter;