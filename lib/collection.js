"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCollections = void 0;

var _methods = _interopRequireDefault(require("./methods.js"));

var _publications = _interopRequireDefault(require("./server/publications.js"));

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

var getSchema = function getSchema(config) {
  var name = config.name;
  var schema = {
    owner: {
      type: String,
      label: 'The ID of the user this ' + name + ' belongs to',
      required: false,
      autoValue: function autoValue() {
        if (this.isInsert) return Meteor.userId();
      }
    },
    createdAt: {
      type: String,
      label: 'The creation date',
      required: false,
      autoValue: function autoValue() {
        if (this.isInsert) return new Date().toISOString();
      }
    },
    updatedAt: {
      type: String,
      label: 'The last update date',
      required: false,
      autoValue: function autoValue() {
        if (this.isInsert || this.isUpdate) return new Date().toISOString();
      }
    }
  };

  for (var x in schema) {
    var _schema$x = schema[x],
        type = _schema$x.type,
        label = _schema$x.label,
        _name = _schema$x.name,
        required = _schema$x.required,
        blackbox = _schema$x.blackbox;
    schema[_name] = {
      type: type,
      label: label,
      required: required,
      blackbox: blackbox
    };
  }

  return schema;
};

var initCollections = function initCollections(config) {
  var schema = config.schema,
      name = config.name,
      offline = config.offline;
  console.log("COLLECTION: ", name);
  var serverCollection = new Meteor.Collection(name); //serverCollection.attachSchema(getSchema(config));

  if (Meteor.isClient) {
    if (offline) {
      var clientCollection = new Ground.Collection(name);
      var submissionsCollection = new Ground.Collection(name + '-submissions');
      clientCollection.observeSource(serverCollection.find());
      clientCollection._name = name;
      submissionsCollection._name = name;

      var defaultRoutes = require('./client/crudRoutes.js').default;

      var module = {
        clientCollection: clientCollection,
        serverCollection: serverCollection,
        submissionsCollection: submissionsCollection,
        config: config
      };
      module.routes = defaultRoutes(module);
      Meteor.modules[name] = module;
      return module;
    } else {
      var _defaultRoutes = require('./client/crudRoutes.js').defaultRoutes;

      var _module = {
        serverCollection: serverCollection,
        config: config
      };
      _module.routes = _defaultRoutes(_module);
      Meteor.modules[name] = _module;
      return _module;
    }
  }

  console.log('test');

  if (Meteor.isServer) {
    (0, _methods.default)(serverCollection, config);
    var publications = (0, _publications.default)(serverCollection, config);
    Meteor.modules[name] = {
      serverCollection: serverCollection,
      publications: publications
    };
    return {
      serverCollection: serverCollection,
      publications: publications
    };
  }
};

exports.initCollections = initCollections;