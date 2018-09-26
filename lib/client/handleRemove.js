"use strict";

var handleRemove = function handleRemove(_id, collection) {
  if (confirm('Are you sure? This is permanent!')) {
    collection.remove(_id, function (error) {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Deleted!', 'success');
      }
    });
  }
};

module.exports = handleRemove;