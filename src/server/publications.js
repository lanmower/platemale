//import Meteor from 'meteor/meteor';
//import check from 'meteor/check';
const init = (serverCollection, config) => {
  const {_name} = serverCollection;
  if(config.publish.list) {
    console.log("PUBLICATION:", _name);
    Meteor.publish(_name, function collection() {
      console.log("GET PUBLICATION:", _name);
      return serverCollection.find({ });
    });
  }
  if(config.publish.view) {
    console.log("PUBLICATION:", _name+".view");
    Meteor.publish(_name+'.view', function decksView(_id) {
      if(typeof _id != 'string') return;
      const owner = this.userId;
      return serverCollection.find({ _id });
    });
  }
}
module.exports =  init;
