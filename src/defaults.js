const {Meteor} = global;
const handleRemove = Meteor.isClient?require('./client/handleRemove').default:null;
const defaults = {
  offline:false,
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
