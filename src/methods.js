
import rateLimit from './rate-limit';

const init = (collection, config) => {
  const verify = {};
  for(let x in config.schema) {
    const {name, type} = config.schema[x];
    verify[name] = type;
  }
  if(config.methods.insert) {
    const methods = {};
    methods[collection._name+'.insert'] = (doc)=>{
      return collection.insert({ owner: Meteor.userId(), ...doc });
    };
    Meteor.methods(methods);
  }
  if(config.methods.update) {
    const methods = {};
    console.log("METHOD: "+collection._name+'.update');
    methods[collection._name+'.update'] = (doc)=>{
        console.log("CALLED METHOD: "+collection._name+'.update');
        const documentId = doc._id;
        if(Meteor.isServer) {
          const storedDoc = collection.findOne(documentId);
          console.log(storedDoc, doc);
          if(!storedDoc) throw new Error("This document does not exist or is not visible to you");
          if(storedDoc.owner != Meteor.userId()) throw new Error("This document is owned by someone else");
          collection.update(documentId, { $set: doc });
        }
        return documentId; // Return _id so we can redirect to document after update.
    }
    Meteor.methods(methods);
  }
  if(config.methods.delete) {
    const methods = {};
    console.log("METHOD: "+collection._name+'.remove');
    methods[collection._name+'.remove'] = (doc)=>{
      return collection.remove(documentId);
    }
    Meteor.methods(methods);
  }
  rateLimit({
    methods: [
      collection._name+'.insert',
      collection._name+'.update',
      collection._name+'.remove',
    ],
    limit: 5,
    timeRange: 1000,
  });
};
module.exports =  init;
