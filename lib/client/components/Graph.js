"use strict";

var _propTypes = _interopRequireDefault(require("prop-types"));

var _class, _temp;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var Component = React.Component;
var DEFAULT_STROKE_WIDTH = 0.15;
var DEFAULT_STROKE_COLOR = '#e1e1e1';
/**
 * SVGPath is an svg <path> element with utitlities
 *
 * @param {object[]} points - Array of Point objects - {x, y} - to plot this path
 * @param {string} color - stroke color of path
 * @param {number} [strokeWidth = DEFAULT_STROKE_WIDTH] - Width of the path
 * @param {boolean} [trace = false] - Will set the strokeDashOffset and strokeDashArray to the Path.getTotalLength
 *                                    so the path can appear to "trace" over itself
 * @param {number} [progress] - (min: 0, max: 1) Determines how far the "trace" effect has progressed. This should
 *                              increase in small intervals if trying to animate.
 * @returns {SVGPath} - svg <path> react component.
 */

module.exports = (_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(SVGPath, _Component);

  function SVGPath() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SVGPath);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SVGPath)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillMount", function () {
      _this.totalLength = _this.getTotalLength();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOffsetLength", function () {
      return _this.totalLength - _this.totalLength * _this.props.progress;
    });

    return _this;
  }

  _createClass(SVGPath, [{
    key: "getTotalLength",

    /**
     * Should calculate the same value as the DOM Path.getTotalLength() method
     *
     * @returns {number} - Total length of all points
     */
    value: function getTotalLength() {
      var _this2 = this;

      return this.props.points.reduce(function (total, point, i, points) {
        // if this isn't the first point
        if (i) {
          return _this2.distance(points[i - 1], point) + total;
        }

        return total;
      }, 0);
    }
    /**
     * Calculate the distance between two points on a plane
     *
     * @param {object} p1 - first point object {x, y}
     * @param {object} p2 - second point object {x, y}
     * @returns {number} - distance between <p1> and <p2>
     */

  }, {
    key: "distance",
    value: function distance(p1, p2) {
      var dy = p1.y - p2.y,
          dx = p1.x - p2.x; // Pythagorean Theorem

      return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Reduce all points into a string for plotting the svg <path>
     *
     * @returns {string} - All points to use as d attribute of an svg path
     */

  }, {
    key: "d",
    value: function d() {
      var points = this.props.points;
      if (!points || !points.length) return '';
      return points.reduce(function (d, point) {
        return "".concat(d, "L").concat(point.x, ",").concat(point.y);
      }, "M".concat(points[0].x, ",").concat(points[0].y));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          trace = _this$props.trace,
          strokeWidth = _this$props.strokeWidth;
      var pathStyles;

      if (trace) {
        // line needs to appear to draw itself
        pathStyles = {
          strokeDasharray: this.totalLength,
          strokeDashoffset: this.getOffsetLength()
        };
      }

      return React.createElement("path", {
        fill: "transparent",
        stroke: color,
        strokeWidth: 3,
        d: this.d(),
        style: pathStyles
      });
    }
  }]);

  return SVGPath;
}(Component), _defineProperty(_class, "propTypes", {
  points: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  color: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  trace: _propTypes.default.bool,
  progress: _propTypes.default.number
}), _defineProperty(_class, "defaultProps", {
  color: DEFAULT_STROKE_COLOR,
  strokeWidth: DEFAULT_STROKE_WIDTH
}), _temp);