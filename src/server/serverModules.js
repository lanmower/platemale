import account from '../account/server';
import oauth from '../oauth/server';
Meteor.modules = {account, oauth};
console.log('test');
export default Meteor.modules;
