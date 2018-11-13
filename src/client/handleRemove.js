const handleRemove = (_id, collection, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    collection.remove(_id, (error) => {
      if (error) {
        alert(error.reason);
      }
      else {
        alert('Deleted!');
        history.push(`/${collection._name}`);
      }
    });
  }
};
module.exports =  handleRemove;
