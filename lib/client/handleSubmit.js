"use strict";

var _this = void 0;

var handleSubmit = function handleSubmit(history, collection, config, doc, state) {
  var schema = config.schema;
  var collectionName = collection._name;
  var existing = doc && doc._id;
  var methodToCall = existing ? collectionName + '.update' : collectionName + '.insert';
  schema.map(function (field) {
    doc[field.name] = _this.state[field.name];
  });
  if (existing) doc._id = existing;
  Meteor.call(methodToCall, doc, function (error, id) {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      var confirmation = existing ? 'Updated!' : 'Added!';

      _this.form.reset();

      Bert.alert(confirmation, 'success');
      history.push("/".concat(collectionName, "/").concat(id));
    }
  });
};

module.exports = handleSubmit;