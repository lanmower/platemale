"use strict";

var _select = _interopRequireDefault(require("./select"));

var _textInput = _interopRequireDefault(require("./textInput"));

var _imageSelect = _interopRequireDefault(require("./imageSelect"));

var _slider = _interopRequireDefault(require("./slider"));

var _signature = _interopRequireDefault(require("./signature"));

var _user = _interopRequireDefault(require("./user"));

var _time = _interopRequireDefault(require("./time"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elements = {
  select: _select.default,
  textInput: _textInput.default,
  imageSelect: _imageSelect.default,
  slider: _slider.default,
  signature: _signature.default,
  user: _user.default,
  time: _time.default
};

module.exports = function (_ref) {
  var field = _ref.field,
      state = _ref.state,
      setState = _ref.setState;
  return elements[field.element ? field.element : 'textInput'][field.view]({
    field: field,
    state: state,
    setState: setState
  });
};