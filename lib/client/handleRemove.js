"use strict";

var handleRemove = function handleRemove(_id, collection, history) {
  if (confirm('Are you sure? This is permanent!')) {
    collection.remove(_id, function (error) {
      if (error) {
        alert(error.reason);
      } else {
        alert('Deleted!');
        history.push("/".concat(collection._name));
      }
    });
  }
};

module.exports = handleRemove;