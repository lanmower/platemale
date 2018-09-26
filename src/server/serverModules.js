import account from '../account/server';
import oauth from '../oauth/server';
Meteor.modules = {account, oauth};
export default Meteor.modules;
