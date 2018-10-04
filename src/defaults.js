const {Meteor} = global;
import handleRemove from './client/handleRemove';
const defaults = {
  collectionTypes: {
    client: true,
    server: false,
    submission: false
  },
  subscribe:true,
  insert:true,
  viewHandleRemove : handleRemove,
  listHandleRemove : handleRemove,
  listView: {
    primary: ({name})=>{return name?name:''},
    secondary: () => {return null},
    extra: ()=>{return null}
  },
  views: {
    view: (data)=>{return data},
    print: (data)=>{return data},
    form: (data)=>{return data},
  },
  methods: {
    insert:true,
    remove:true,
    update:true
  },
  publish: {
    view:true,
    list:true
  },
  defaultRoutes: {
    view:true,
    new:true,
    edit:true,
    list:true
  },
  before: {
  }
};


module.exports =  (data) => {
  return Object.assign(defaults, data);
};
