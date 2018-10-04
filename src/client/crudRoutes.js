import { withTracker } from 'meteor/react-meteor-data';
import List from './List';
import View from './View';
import Editor from './Editor';
import New from './New';
import NavigationPage from './components/NavigationPage';
import pluralize from 'pluralize';
import capitalize from './capitalize';
import { menuStore } from './components/Navigation';
import splitWords from './splitWords.js';

const viewRoute = ({collections, config}) => {
  const navButtonStore = new ReactiveVar();
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
          const navButtons = navButtonStore.get();
          return { loading, doc, config, title, navButtons, collection, collections, navButtonStore, _id };
      })(NavigationPage(View))
  }
}

const listRoute = ({collections, config, submissions}) => {
    var collection;
    if(submissions) collection = collections.submissionsCollection;
    else if(config.collectionTypes.client) collection = collections.clientCollection;
    else if(config.collectionTypes.server) collection = collections.serverCollection;
    const menu = menuStore.get();
    const navButtonStore = new ReactiveVar()
    menu.push(
      {
        url:'/'+collection._name,
        title:capitalize(pluralize(collection._name))
      }
    );
    return {
        path: "/" + collection._name, component: withTracker(({ match, history }) => {
            const buttonComp = ()=>(<div>{config.insert?AddButton(history, collection):null}</div>)
            const {subscribe} = config;
            const subscription = subscribe?Meteor.subscribe(collection._name):false;
            const docs = collection.find().fetch();
            const loading = subscribe?(!subscription.ready()):false;
            const title = splitWords(capitalize(pluralize(config.name)));
            const navButtons = navButtonStore.get();
            const before = config.before.list;
            console.log(loading);
            if(before) before();
            return {loading, docs, collection, collections, match, history, config, title, navButtons,navButtonStore };
        })(NavigationPage(List))
    }
}

const submitRoute = ({collections, config}) => {
    var collection;
    if(config.collectionTypes.client) collection = collections.clientCollection;
    else if(config.collectionTypes.server) collection = collections.serverCollection;
    const navButtonStore = new ReactiveVar()
    return {
        path: "/" + collection._name, component: withTracker(({ match, history }) => {
            const {subscribe} = config;
            const subscription = subscribe?Meteor.subscribe(collection._name):false;
            const docs = collection.find().fetch();
            const loading = subscribe?(!subscription.ready()):false;
            const title = "New "+splitWords(capitalize(config.name));
            const navButtons = navButtonStore.get();
            const before = config.before.submit;
            if(before) before();

            return {loading, docs, collection, match, history, config, title, navButtons, navButtonStore };
        })(NavigationPage(List))
    }
}

const newRoute = ({collections, config}) => {
  var collection;

  if(config.collectionTypes.client) collection = collections.clientCollection;
  else if(config.collectionTypes.server) collection = collections.serverCollection;

    const navButtonStore = new ReactiveVar();
    return {
            path: "/"+collection._name+"/new", component: withTracker(({ match }) => {
                const navButtons = navButtonStore.get();
                const title = "New "+splitWords(capitalize(config.name));
                const before = config.before.new;
                if(before) before();

                return {
                    config, collection, navButtons, navButtonStore, title
                };
            })(NavigationPage(New))
        }
}

const editRoute = ({collections, config}) => {
  var collection;

  if(config.collectionTypes.client) collection = collections.clientCollection;
  else if(config.collectionTypes.server) collection = collections.serverCollection;
    const navButtonStore = new ReactiveVar()
    const {name, before, subscribe}=config;
    const title = "Edit "+capitalize(name);
    return {
            path: "/"+collection._name+"/:_id/edit", component: withTracker(({ match }) => {
                const { _id } = match.params;
                const subscription = subscribe?Meteor.subscribe(collection._name + '.view', _id):false;
                const doc = collection.findOne(_id);
                const loading = subscribe?(!subscription.ready()):false;
                const navButtons = navButtonStore.get();
                const title = "New "+splitWords(capitalize(name));
                if(before && before.edit) before.edit();
                return {loading, doc, collection, config, title, navButtons, navButtonStore};
            })(NavigationPage(Editor))
        }
}

const defaultRoutes = (collections)=>{
  const {config} = collections;
  const routes = [];
  if(config.defaultRoutes.new)routes['new']=newRoute({collections, config});
  if(config.defaultRoutes.edit)routes['edit']=editRoute({collections, config});
  if(config.defaultRoutes.view)routes['view']=viewRoute({collections, config});
  if(config.defaultRoutes.list)routes['list']=listRoute({collections, config});
  if(config.collectionTypes.submit && config.defaultRoutes.new) {
    routes['submit']=submitRoute({collections, config});
    routes['submissions']=listRoute({collections, config, submissions:true});
  }
  return routes;

}

export {viewRoute, listRoute, newRoute, editRoute, defaultRoutes};
