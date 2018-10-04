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
  var methodToCall = existing ? collectionName + '.update' : collectionName + '.insert';
  var submit = {};
  schema.map(function (field) {
    submit[field.name] = _this.state[field.name];
  });

  if (config.collectionTypes.submission || config.collectionTypes.client) {
    var id;

    if (existing) {
      console.log(doc);
      collection.update(doc._id, {
        $set: submit
      });
      id = doc._id;
    } else {
      id = collection.insert(submit);
    }

    var confirmation = existing ? 'Updated!' : 'Added!';
    this.form.reset();
    Bert.alert(confirmation, 'success');
    history.push("/".concat(collectionName, "/").concat(id));
  } else if (config.collectionTypes.server) {
    Meteor.call(methodToCall, submit, function (error, result) {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        var _confirmation = existing ? 'Updated!' : 'Added!';

        _this.form.reset();

        Bert.alert(_confirmation, 'success');
        console.log(result, "asdf");
        history.push("/".concat(collectionName, "/").concat(result));
      }
    });
  }
}

module.exports = handleSubmit;