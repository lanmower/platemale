/* eslint-disable consistent-return */
import initMethods from './methods.js';
import initPublications from './server/publications.js';
import SimpleSchema from 'simpl-schema';
var camelCase = (function () {
    var DEFAULT_REGEX = /[-_]+(.)?/g;

    function toUpper(match, group1) {
        return group1 ? group1.toUpperCase() : '';
    }
    return function (str, delimiters) {
        return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
    };
})();

const getSchema = (config)=> {
  const {name} = config
  const schema = {
    owner: {
      type: String,
      label: 'The ID of the user this '+name+' belongs to',
      autoValue() {
        if (this.isInsert) return Meteor.userId();
      }
    },
    createdAt: {
      type: String,
      label: 'The creation date',
      autoValue() {
        if (this.isInsert) return (new Date()).toISOString();
      },
    },
    updatedAt: {
      type: String,
      label: 'The last update date',
      autoValue() {
        if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
      },
    }
 };
 for(let x in config.schema) {
   schema[config.schema[x].name] = config.schema[x];
 }
  return schema;
}

export const initCollections = (config) => {
  const {name, collectionTypes} = config;
  const {client, submission, server} = collectionTypes;
  console.log("COLLECTION: ", name);
  const module = {config};
  if(Meteor.isServer) {
    if(server) {
      module.serverCollection = new Meteor.Collection(name);
      const schema = getSchema(config);
      console.log(schema);
      if(module.serverCollection.attachSchema) module.serverCollection.attachSchema(schema);
      initMethods(module.serverCollection, config);
      module.publications = initPublications(module.serverCollection, config);
    }
  }
  if(Meteor.isClient) {
    module.serverCollection = new Meteor.Collection(name);
    const schema = getSchema(config);
    console.log(schema);
    if(module.serverCollection.attachSchema) module.serverCollection.attachSchema(schema);
    if(server) {
      initMethods(module.serverCollection, config);
    }
    if(client) {
      module.clientCollection  = new Ground.Collection(name);
      if(server) module.clientCollection.observeSource(module.serverCollection.find());
      module.clientCollection._name = name;
    }
    if(submission) {
      module.submissionsCollection = new Ground.Collection(name+'-submissions');
      module.submissionsCollection._name = name;
    }
    const {defaultRoutes} = require('./client/crudRoutes.js');

    module.routes = defaultRoutes(module);
  }
  Meteor.modules[name] = module;
  return module;
 }
