"use strict";

function handleSubmit() {
  var _this = this;

  var _this$props = this.props,
      history = _this$props.history,
      collection = _this$props.collection,
      config = _this$props.config,
      classes = _this$props.classes,
      doc = _this$props.doc;
  var schema = config.schema;
  var collectionName = collection._name;
  var existing = doc && doc._id;
  var submit = {};
  schema.map(function (field) {
    submit[field.name] = _this.state[field.name];
  });

  if (config.collectionTypes.submission || config.collectionTypes.client) {
    var id;

    if (existing) {
      collection.update(doc._id, {
        $set: submit
      });
      id = doc._id;
    } else {
      id = collection.insert(submit);
    }

    var confirmation = existing ? 'Updated!' : 'Added!';
    this.form.reset();
    window.dialog(confirmation, 'success');
    history.push("/".concat(collectionName, "/").concat(id));
  } else if (config.collectionTypes.server) {
    var methodToCall = existing ? collectionName + '.update' : collectionName + '.insert';

    for (var field in schema) {
      submit[schema.name] = doc[schema.name];
    }

    if (existing) submit._id = doc._id;
    Meteor.call(methodToCall, submit, function (error, result) {
      if (error) {
        window.dialog(error.reason, 'danger');
      } else {
        var _confirmation = existing ? 'Updated!' : 'Added!';

        _this.form.reset();

        window.dialog(_confirmation, 'success');
        history.push("/".concat(collectionName, "/").concat(result));
      }
    });
  }
}

module.exports = handleSubmit;