"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRoutes = exports.editRoute = exports.newRoute = exports.listRoute = exports.viewRoute = void 0;

var _reactMeteorData = require("meteor/react-meteor-data");

var _List = _interopRequireDefault(require("./List"));

var _View = _interopRequireDefault(require("./View"));

var _Editor = _interopRequireDefault(require("./Editor"));

var _New = _interopRequireDefault(require("./New"));

var _NavigationPage = _interopRequireDefault(require("./components/NavigationPage"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _capitalize = _interopRequireDefault(require("./capitalize"));

var _Navigation = require("./components/Navigation");

var _splitWords = _interopRequireDefault(require("./splitWords.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewRoute = function viewRoute(_ref) {
  var collections = _ref.collections,
      config = _ref.config;
  var navButtonStore = new ReactiveVar();
  var collection;
  if (config.collectionTypes.client) collection = collections.clientCollection;else if (config.collectionTypes.server) collection = collections.serverCollection;
  return {
    path: "/" + collection._name + "/:_id",
    component: (0, _reactMeteorData.withTracker)(function (_ref2) {
      var match = _ref2.match,
          history = _ref2.history;
      var subscribe = config.subscribe;
      var _id = match.params._id;
      var subscription = subscribe ? Meteor.subscribe(collection._name + '.view', _id) : false;
      var doc = collection.findOne(_id);
      var loading = subscribe ? !subscription.ready() : false;
      var title = (0, _capitalize.default)(config.name);
      var navButtons = navButtonStore.get();
      return {
        loading: loading,
        doc: doc,
        config: config,
        title: title,
        navButtons: navButtons,
        collection: collection,
        collections: collections,
        navButtonStore: navButtonStore,
        _id: _id
      };
    })((0, _NavigationPage.default)(_View.default))
  };
};

exports.viewRoute = viewRoute;

var listRoute = function listRoute(_ref3) {
  var collections = _ref3.collections,
      config = _ref3.config,
      submissions = _ref3.submissions;
  var collection;
  if (submissions) collection = collections.submissionsCollection;else if (config.collectionTypes.client) collection = collections.clientCollection;else if (config.collectionTypes.server) collection = collections.serverCollection;

  var menu = _Navigation.menuStore.get();

  var navButtonStore = new ReactiveVar();
  menu.push({
    url: '/' + collection._name,
    title: (0, _capitalize.default)((0, _pluralize.default)(collection._name))
  });
  return {
    path: "/" + collection._name,
    component: (0, _reactMeteorData.withTracker)(function (_ref4) {
      var match = _ref4.match,
          history = _ref4.history;

      var buttonComp = function buttonComp() {
        return React.createElement("div", null, config.insert ? AddButton(history, collection) : null);
      };

      var subscribe = config.subscribe;
      var subscription = subscribe ? Meteor.subscribe(collection._name) : false;
      var docs = collection.find().fetch();
      var loading = subscribe ? !subscription.ready() : false;
      var title = (0, _splitWords.default)((0, _capitalize.default)((0, _pluralize.default)(config.name)));
      var navButtons = navButtonStore.get();
      var before = config.before.list;
      console.log(loading);
      if (before) before();
      return {
        loading: loading,
        docs: docs,
        collection: collection,
        collections: collections,
        match: match,
        history: history,
        config: config,
        title: title,
        navButtons: navButtons,
        navButtonStore: navButtonStore
      };
    })((0, _NavigationPage.default)(_List.default))
  };
};

exports.listRoute = listRoute;

var submitRoute = function submitRoute(_ref5) {
  var collections = _ref5.collections,
      config = _ref5.config;
  var collection;
  if (config.collectionTypes.client) collection = collections.clientCollection;else if (config.collectionTypes.server) collection = collections.serverCollection;
  var navButtonStore = new ReactiveVar();
  return {
    path: "/" + collection._name,
    component: (0, _reactMeteorData.withTracker)(function (_ref6) {
      var match = _ref6.match,
          history = _ref6.history;
      var subscribe = config.subscribe;
      var subscription = subscribe ? Meteor.subscribe(collection._name) : false;
      var docs = collection.find().fetch();
      var loading = subscribe ? !subscription.ready() : false;
      var title = "New " + (0, _splitWords.default)((0, _capitalize.default)(config.name));
      var navButtons = navButtonStore.get();
      var before = config.before.submit;
      if (before) before();
      return {
        loading: loading,
        docs: docs,
        collection: collection,
        match: match,
        history: history,
        config: config,
        title: title,
        navButtons: navButtons,
        navButtonStore: navButtonStore
      };
    })((0, _NavigationPage.default)(_List.default))
  };
};

var newRoute = function newRoute(_ref7) {
  var collections = _ref7.collections,
      config = _ref7.config;
  var collection;
  if (config.collectionTypes.client) collection = collections.clientCollection;else if (config.collectionTypes.server) collection = collections.serverCollection;
  var navButtonStore = new ReactiveVar();
  return {
    path: "/" + collection._name + "/new",
    component: (0, _reactMeteorData.withTracker)(function (_ref8) {
      var match = _ref8.match;
      var navButtons = navButtonStore.get();
      var title = "New " + (0, _splitWords.default)((0, _capitalize.default)(config.name));
      var before = config.before.new;
      if (before) before();
      return {
        config: config,
        collection: collection,
        navButtons: navButtons,
        navButtonStore: navButtonStore,
        title: title
      };
    })((0, _NavigationPage.default)(_New.default))
  };
};

exports.newRoute = newRoute;

var editRoute = function editRoute(_ref9) {
  var collections = _ref9.collections,
      config = _ref9.config;
  var collection;
  if (config.collectionTypes.client) collection = collections.clientCollection;else if (config.collectionTypes.server) collection = collections.serverCollection;
  var navButtonStore = new ReactiveVar();
  var name = config.name,
      before = config.before,
      subscribe = config.subscribe;
  var title = "Edit " + (0, _capitalize.default)(name);
  return {
    path: "/" + collection._name + "/:_id/edit",
    component: (0, _reactMeteorData.withTracker)(function (_ref10) {
      var match = _ref10.match;
      var _id = match.params._id;
      var subscription = subscribe ? Meteor.subscribe(collection._name + '.view', _id) : false;
      var doc = collection.findOne(_id);
      var loading = subscribe ? !subscription.ready() : false;
      var navButtons = navButtonStore.get();
      var title = "New " + (0, _splitWords.default)((0, _capitalize.default)(name));
      if (before && before.edit) before.edit();
      return {
        loading: loading,
        doc: doc,
        collection: collection,
        config: config,
        title: title,
        navButtons: navButtons,
        navButtonStore: navButtonStore
      };
    })((0, _NavigationPage.default)(_Editor.default))
  };
};

exports.editRoute = editRoute;

var defaultRoutes = function defaultRoutes(collections) {
  var config = collections.config;
  var routes = [];
  if (config.defaultRoutes.new) routes['new'] = newRoute({
    collections: collections,
    config: config
  });
  if (config.defaultRoutes.edit) routes['edit'] = editRoute({
    collections: collections,
    config: config
  });
  if (config.defaultRoutes.view) routes['view'] = viewRoute({
    collections: collections,
    config: config
  });
  if (config.defaultRoutes.list) routes['list'] = listRoute({
    collections: collections,
    config: config
  });

  if (config.collectionTypes.submit && config.defaultRoutes.new) {
    routes['submit'] = submitRoute({
      collections: collections,
      config: config
    });
    routes['submissions'] = listRoute({
      collections: collections,
      config: config,
      submissions: true
    });
  }

  return routes;
};

exports.defaultRoutes = defaultRoutes;