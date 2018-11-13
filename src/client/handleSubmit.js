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
  const submit = {};
  schema.map((field)=>{
    submit[field.name] = this.state[field.name];
  });
  if(config.collectionTypes.submission || config.collectionTypes.client) {
    let id;
    if(existing) {
      collection.update(doc._id, {$set:submit});
      id = doc._id;
    } else {
      id = collection.insert(submit);
    }
    const confirmation = existing ? 'Updated!' : 'Added!';
    this.form.reset();
    window.dialog(confirmation, 'success');
    history.push(`/${collectionName}/${id}`);
  } else if(config.collectionTypes.server) {
    const methodToCall = existing ? collectionName+'.update' : collectionName+'.insert';
    for(const field in schema) {
      submit[schema.name]=doc[schema.name];
    }
    if(existing) submit._id = doc._id;
    Meteor.call(methodToCall, submit, (error, result) => {
      if (error) {
        window.dialog(error.reason, 'danger');
      }
      else {
        const confirmation = existing ? 'Updated!' : 'Added!';
        this.form.reset();
        window.dialog(confirmation, 'success');
        history.push(`/${collectionName}/${result}`);
      }
    });
  }
}

module.exports = handleSubmit;
