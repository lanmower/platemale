"use strict";

var _global = global,
    Meteor = _global.Meteor;
var handleRemove = Meteor.isClient ? require('./client/handleRemove').default : null;
var defaults = {
  offline: false,
  subscribe: true,
  insert: true,
  viewHandleRemove: handleRemove,
  listHandleRemove: handleRemove,
  listView: {
    primary: function primary(_ref) {
      var name = _ref.name;
      return name ? name : '';
    },
    secondary: function secondary() {
      return null;
    },
    extra: function extra() {
      return null;
    }
  },
  views: {
    view: function view(data) {
      return data;
    },
    print: function print(data) {
      return data;
    },
    form: function form(data) {
      return data;
    }
  },
  methods: {
    insert: true,
    remove: true,
    update: true
  },
  publish: {
    view: true,
    list: true
  },
  defaultRoutes: {
    view: true,
    new: true,
    edit: true,
    list: true
  },
  before: {}
};

module.exports = function (data) {
  return Object.assign(defaults, data);
};