"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

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

var ImageSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ImageSelect, _React$Component);

  function ImageSelect(props) {
    var _this;

    _classCallCheck(this, ImageSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageSelect).call(this, props));
    var value = _this.props.value;
    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(ImageSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          options = _this$props.options,
          onChange = _this$props.onChange,
          value = _this$props.value,
          path = _this$props.path;

      var Option = function Option(props) {
        var innerRef = props.innerRef,
            innerProps = props.innerProps,
            data = props.data,
            children = props.children;
        var tabIndex = innerProps.tabIndex,
            onClick = innerProps.onClick,
            onMouseMove = innerProps.onMouseMove,
            onMouseOver = innerProps.onMouseOver;
        console.log(props);
        return _react.default.createElement("div", {
          ref: innerRef,
          tabIndex: tabIndex,
          onClick: onClick,
          onMouseMove: onMouseMove,
          onMouseOver: onMouseOver
        }, _react.default.createElement("img", {
          style: {
            height: "4em"
          },
          src: '/images/' + path + '/' + data.value + ".png"
        }));
      };

      var SingleValue = function SingleValue(props) {
        if (option.value) {
          return _react.default.createElement("img", {
            ref: props.innerRef,
            props: props.innerProps,
            style: {
              height: "100%"
            },
            src: '/images/' + path + '/' + props.data.value + ".png"
          });
        }
      };

      console.log("IMAGESELECT", options);
      return _react.default.createElement(_Select.default, {
        onInputChange: function onInputChange(inputValue) {
          return _this2._inputValue = inputValue;
        },
        options: options,
        components: {
          Option: Option,
          SingleValue: SingleValue
        },
        value: value,
        onChange: onChange
      });
    }
  }]);

  return ImageSelect;
}(_react.default.Component);

ImageSelect.defaultProps = {
  title: '',
  options: {},
  onChange: function onChange() {},
  value: ''
};
ImageSelect.propTypes = {
  title: _propTypes.default.string,
  options: _propTypes.default.array.isRequired,
  onChange: _propTypes.default.func,
  value: _propTypes.default.string,
  path: _propTypes.default.string.isRequired
};
module.exports = ImageSelect;