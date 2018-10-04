function handleSubmit() {
  const {
    history,
    collection,
    config,
    classes,
    doc
  } = this.props;
  const {schema} = config;
  const collectionName = collection._name;
  const existing = doc && doc._id;
  const methodToCall = existing ? collectionName+'.update' : collectionName+'.insert';
  const submit = {};
  schema.map((field)=>{
    submit[field.name] = this.state[field.name];
  });
  if(config.collectionTypes.submission || config.collectionTypes.client) {
    let id;
    if(existing) {
      console.log(doc);
      collection.update(doc._id, {$set:submit});
      id = doc._id;
    } else {
      id = collection.insert(submit);
    }
    const confirmation = existing ? 'Updated!' : 'Added!';
    this.form.reset();
    Bert.alert(confirmation, 'success');
    history.push(`/${collectionName}/${id}`);
  } else if(config.collectionTypes.server) {
    Meteor.call(methodToCall, submit, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        const confirmation = existing ? 'Updated!' : 'Added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        console.log(result, "asdf");
        history.push(`/${collectionName}/${result}`);
      }
    });
  }
}

module.exports = handleSubmit;
