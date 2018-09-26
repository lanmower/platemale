/* eslint-disable consistent-return */
import SimpleSchema from 'simpl-schema';
import initMethods from './methods.js';
import initPublications from './server/publications.js';


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
      required:false,
      autoValue() {
        if (this.isInsert) return Meteor.userId();
      }
    },
    createdAt: {
      type: String,
      label: 'The creation date',
      required:false,
      autoValue() {
        if (this.isInsert) return (new Date()).toISOString();
      },
    },
    updatedAt: {
      type: String,
      label: 'The last update date',
      required:false,
      autoValue() {
        if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
      },
    }
 };
 for(let x in schema) {
   const {type, label, name, required, blackbox} = schema[x];

   schema[name] = { type,label, required, blackbox }
 }
  return schema;
}

export const initCollections = (config) => {
  const {schema, name, offline} = config
  console.log("COLLECTION: ", name);
  const serverCollection = new Meteor.Collection(name);
  //serverCollection.attachSchema(getSchema(config));
  if(Meteor.isClient) {
    if(offline) {
      const clientCollection = new Ground.Collection(name);
      const submissionsCollection = new Ground.Collection(name+'-submissions');
      clientCollection.observeSource(serverCollection.find());
      clientCollection._name = name;
      submissionsCollection._name = name;
      const defaultRoutes = require('./client/crudRoutes.js').default;
      const module = {clientCollection, serverCollection, submissionsCollection, config};
      module.routes = defaultRoutes(module);
      Meteor.modules[name] = module;
      return module;
    } else {
      const defaultRoutes = require('./client/crudRoutes.js').defaultRoutes;
      const module = {serverCollection, config};
      module.routes = defaultRoutes(module);
      Meteor.modules[name] = module;
      return module;
    }
  }
  console.log('test');
  if(Meteor.isServer) {
    initMethods(serverCollection, config);
    const publications = initPublications(serverCollection, config);
    Meteor.modules[name] = {serverCollection, publications};
    return {serverCollection, publications}
  }
 }
