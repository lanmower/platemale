"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCollections = void 0;

var _methods = _interopRequireDefault(require("./methods.js"));

var _publications = _interopRequireDefault(require("./server/publications.js"));

var _simplSchema = _interopRequireDefault(require("simpl-schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */
var camelCase = function () {
  var DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match, group1) {
    return group1 ? group1.toUpperCase() : '';
  }

  return function (str, delimiters) {
    return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
  };
}();

function copy(obj) {
  var include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return Object.keys(obj).reduce(function (target, k) {
    if (exclude.length) {
      if (exclude.indexOf(k) < 0) target[k] = obj[k];
    } else if (include.indexOf(k) > -1) target[k] = obj[k];

    return target;
  }, {});
}

var getSchema = function getSchema(config) {
  var name = config.name;
  var schema = {
    owner: {
      type: String,
      label: 'The ID of the user this ' + name + ' belongs to',
      autoValue: function autoValue() {
        if (this.isInsert) return Meteor.userId();
      }
    },
    createdAt: {
      type: String,
      label: 'The creation date',
      autoValue: function autoValue() {
        if (this.isInsert) return new Date().toISOString();
      }
    },
    updatedAt: {
      type: String,
      label: 'The last update date',
      autoValue: function autoValue() {
        if (this.isInsert || this.isUpdate) return new Date().toISOString();
      }
    }
  };

  for (var x in config.schema) {
    var copied = copy(config.schema[x], ["type", "label", "optional", "required", "min", "max", "exclusiveMin", "exclusiveMax", "minCount", "maxCount", "allowedValues", "regEx", "blackbox", "trim", "custom", "defaultValue", "autoValue"]);
    schema[config.schema[x].name] = copied;
  }

  return schema;
};

var initCollections = function initCollections(config) {
  var name = config.name,
      collectionTypes = config.collectionTypes;
  var client = collectionTypes.client,
      submission = collectionTypes.submission,
      server = collectionTypes.server;
  console.log("COLLECTION: ", name);
  var module = {
    config: config
  };

  if (Meteor.isServer) {
    if (server) {
      module.serverCollection = new Meteor.Collection(name);
      var schema = getSchema(config);
      console.log(schema);
      if (module.serverCollection.attachSchema) module.serverCollection.attachSchema(schema);
      (0, _methods.default)(module.serverCollection, config);
      module.publications = (0, _publications.default)(module.serverCollection, config);
    }
  }

  if (Meteor.isClient) {
    module.serverCollection = new Meteor.Collection(name);

    var _schema = getSchema(config);

    console.log(_schema);
    if (module.serverCollection.attachSchema) module.serverCollection.attachSchema(_schema);

    if (server) {
      (0, _methods.default)(module.serverCollection, config);
    }

    if (client) {
      module.clientCollection = new Ground.Collection(name);
      if (server) module.clientCollection.observeSource(module.serverCollection.find());
      module.clientCollection._name = name;
    }

    if (submission) {
      module.submissionsCollection = new Ground.Collection(name + '-submissions');
      module.submissionsCollection._name = name;
    }

    var _require = require('./client/crudRoutes.js'),
        defaultRoutes = _require.defaultRoutes;

    module.routes = defaultRoutes(module);
  }

  Meteor.modules[name] = module;
  return module;
};

exports.initCollections = initCollections;