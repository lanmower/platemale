import { withTracker } from 'meteor/react-meteor-data';
import List from './List';
import View from './View';
import Editor from './Editor';
import New from './New';
import NavigationPage from '../navigation/client/NavigationPage';
import pluralize from 'pluralize';
import capitalize from './capitalize';
import { menuStore } from './components/Navigation';
import splitWords from './splitWords.js';

const viewRoute = ({collections, config}) => {
  var collection;
  if(config.collectionTypes.client) collection = collections.clientCollection;
  else if(config.collectionTypes.server) collection = collections.serverCollection;
  return {
      path: "/" + collection._name + "/:_id", component: withTracker(({ match, history }) => {
          const { subscribe } = config;
          const { _id } = match.params;
          const subscription = subscribe?Meteor.subscribe(collection._name + '.view', _id):false;
          const doc = collection.findOne(_id);
          const loading = subscribe?(!subscription.ready()):false;
          const title = capitalize(config.name);
          return { loading, doc, config, title, collection, collections, _id };
      })(NavigationPage(View))
  }
}

const listRoute = ({collections, config, submissions}) => {
    var collection;
    if(submissions) collection = collections.submissionsCollection;
    else if(config.collectionTypes.client) collection = collections.clientCollection;
    else if(config.collectionTypes.server) collection = collections.serverCollection;
    const menu = menuStore.get();
    menu.push(
      {
        url:'/'+collection._name,
        title:capitalize(pluralize(collection._name))
      }
    );
    return {
        path: "/" + collection._name, component: withTracker(({ match, history }) => {
            const {subscribe} = config;
            console.log(subscribe);
            const subscription = subscribe?Meteor.subscribe(collection._name):false;
            const docs = collection.find().fetch();
            const loading = subscribe?(!subscription.ready()):false;
            const title = splitWords(capitalize(pluralize(config.name)));
            console.log(loading);
            const before = config.before.list;
            if(before) before();
            return {loading, docs, collection, collections, match, history, config, title };
        })(NavigationPage(List))
    }
}

const submitRoute = ({collections, config}) => {
    var collection;
    if(config.collectionTypes.client) collection = collections.clientCollection;
    else if(config.collectionTypes.server) collection = collections.serverCollection;
    return {
        path: "/" + collection._name, component: withTracker(({ match, history }) => {
            const {subscribe} = config;
            const subscription = subscribe?Meteor.subscribe(collection._name):false;
            const docs = collection.find().fetch();
            const loading = subscribe?(!subscription.ready()):false;
            const title = "New "+splitWords(capitalize(config.name));
            const before = config.before.submit;
            if(before) before();

            return {loading, docs, collection, match, history, config, title };
        })(NavigationPage(List))
    }
}

const newRoute = ({collections, config}) => {
  var collection;

  if(config.collectionTypes.client) collection = collections.clientCollection;
  else if(config.collectionTypes.server) collection = collections.serverCollection;

    return {
            path: "/"+collection._name+"/new", component: withTracker(({ match }) => {
                const title = "New "+splitWords(capitalize(config.name));
                const before = config.before.new;
                if(before) before();

                return {
                    config, collection, title
                };
            })(NavigationPage(New))
        }
}

const editRoute = ({collections, config}) => {
  var collection;

  if(config.collectionTypes.client) collection = collections.clientCollection;
  else if(config.collectionTypes.server) collection = collections.serverCollection;
    const {name, before, subscribe}=config;
    const title = "Edit "+capitalize(name);
    return {
            path: "/"+collection._name+"/:_id/edit", component: withTracker(({ match }) => {
                const { _id } = match.params;
                const subscription = subscribe?Meteor.subscribe(collection._name + '.view', _id):false;
                const doc = collection.findOne(_id);
                const loading = subscribe?(!subscription.ready()):false;
                const title = "New "+splitWords(capitalize(name));
                if(before && before.edit) before.edit();
                return {loading, doc, collection, config, title};
            })(NavigationPage(Editor))
        }
}

const defaultRoutes = (collections)=>{
  const {config} = collections;
  const routes = [];
  if(config.defaultRoutes.new)routes.push(newRoute({collections, config}));
  if(config.defaultRoutes.edit)routes.push(editRoute({collections, config}));
  if(config.defaultRoutes.view)routes.push(viewRoute({collections, config}));
  if(config.defaultRoutes.list)routes.push(listRoute({collections, config}));
  if(config.collectionTypes.submit && config.defaultRoutes.new) {
    routes['submit']=submitRoute({collections, config});
    routes['submissions']=listRoute({collections, config, submissions:true});
  }
  console.log(routes);
  return routes;

}

export {viewRoute, listRoute, newRoute, editRoute, defaultRoutes};
