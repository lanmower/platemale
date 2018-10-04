"use strict";

var _rateLimit = _interopRequireDefault(require("./rate-limit"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var init = function init(collection, config) {
  var verify = {};

  for (var x in config.schema) {
    var _config$schema$x = config.schema[x],
        name = _config$schema$x.name,
        type = _config$schema$x.type;
    verify[name] = type;
  }

  if (config.methods.insert) {
    var methods = {};
    console.log("METHOD:" + collection._name + '.insert');

    methods[collection._name + '.insert'] = function (doc) {
      check(doc, verify);
      return collection.insert(_objectSpread({
        owner: _this.userId
      }, doc));
    };

    Meteor.methods(methods);
  }

  if (config.methods.update) {
    var _methods = {};
    console.log("METHOD: " + collection._name + '.update');

    _methods[collection._name + '.update'] = function (doc) {
      verify._id = String;
      check(doc, verify);
      var documentId = doc._id;
      collection.update(documentId, {
        $set: doc
      });
      return documentId; // Return _id so we can redirect to document after update.
    };

    Meteor.methods(_methods);
  }

  if (config.methods.delete) {
    var _methods2 = {};
    console.log("METHOD: " + collection._name + '.remove');

    _methods2[collection._name + '.remove'] = function (doc) {
      check(documentId, String);
      return collection.remove(documentId);
    };

    Meteor.methods(_methods2);
  }

  (0, _rateLimit.default)({
    methods: [collection._name + '.insert', collection._name + '.update', collection._name + '.remove'],
    limit: 5,
    timeRange: 1000
  });
};

module.exports = init;