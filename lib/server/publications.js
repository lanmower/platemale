"use strict";

//import Meteor from 'meteor/meteor';
//import check from 'meteor/check';
var init = function init(serverCollection, config) {
  var _name = serverCollection._name;

  if (config.publish.list) {
    console.log("PUBLICATION:", _name);
    Meteor.publish(_name, function collection() {
      console.log("GET PUBLICATION:", _name);
      return serverCollection.find({});
    });
  }

  if (config.publish.view) {
    console.log("PUBLICATION:", _name + ".view");
    Meteor.publish(_name + '.view', function decksView(_id) {
      check(_id, String);
      var owner = this.userId;
      return serverCollection.find({
        _id: _id
      });
    });
  }
};

module.exports = init;