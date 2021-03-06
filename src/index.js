const {Meteor} = global;
import defaults from "./defaults";
import {initCollections, modules} from './collection.js';
const exports = {};

if(Meteor.isServer) {
  Meteor.modules = exports.modules = require('./server/serverModules').default;
  Meteor.startup(() => {
    console.log(Meteor.modules);
  });
}
else {
  const modules = require('./client/clientModules').default;
  Meteor.modules = exports.modules = modules;
  exports.NavigationPage = require('./navigation/client/NavigationPage').default;
  Meteor.startup(() => {
    require("./client");
    console.log(Meteor.modules);
  });
}

exports.defaults = defaults;
exports.initCollections = initCollections;
export default exports;
