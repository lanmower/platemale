import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import NotFound from './components/NotFound';
import { withStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import getElement from './modules';
const {
  Bert
} = require('meteor/themeteorchef:bert');

const styles = theme => ({
  formfield: {
    paddingBottom: "1em",
  },
  root:{

  }
});

class Editor extends React.Component {

  constructor(props) {
    super(props);

    let state = {};
    props.config.schema.map((field)=>{
      state[field.name] = field.default;
    });
    const {doc, config, navButtonStore} = this.props;
    state = doc||state;
    navButtonStore.set(<IconButton className="raised" color="primary" style={{color:"white"}} onClick={(e)=>{this.handleSubmit(e)}}><SaveIcon /></IconButton>);
    this.state = state;
  }

  componentDidMount() {
    const component = this;
    const {doc, config} = this.props;
    const schema = config.schema;
    const rules = {};
    const messages = {};
    schema.map((field)=>{
      rules[field.name] = {required: field.required};
      messages[field.name] = {required: field.requiredMessage};
    });
    if(doc) this.setState(doc);
  }

  handleSubmit() {
    const {
      history,
      collection,
      config,
      classes,
      doc
    } = this.props;
    const {schema} = config;
    const collectionName = collection._name;
    const existing = doc && doc._id;
    const methodToCall = existing ? collectionName+'.update' : collectionName+'.insert';
    const submit = {};
    schema.map((field)=>{
      submit[field.name] = this.state[field.name];
    });

    if (existing) submit._id = existing;

    Meteor.call(methodToCall, submit, (error, id) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        const confirmation = existing ? 'Updated!' : 'Added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/${collectionName}/${id}`);
      }
    });
  }

  render() {
    const {
      doc, config, classes
    } = this.props;
    const {schema} = config;
    const state = this.state;
    const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
    return (
      <form ref={form => (this.form = form)}  onSubmit={event => event.preventDefault()}>
      <FormGroup>
        {
          schema.map((field)=>{
            const value = this.state[field.name]?this.state[field.name]:field.default;
            const newState = {};
            field.view = 'form';
            if(state) {
              const customElement = getElement({field, state, setState:this.setState.bind(this)});
              return (
                <div className={classes.formfield} key={field.name}>
                 {customElement}
                </div>
              )
            }
          })
        }
      </FormGroup>

      <Button className="fab" color="primary" aria-label="add" type="submit" onClick={(e)=>{this.handleSubmit(e)}}>
        <SaveIcon />Save
      </Button>
    </form>
  );
  }
}

Editor.propTypes = {
  doc: PropTypes.object,
  schema: PropTypes.array,
  collection: PropTypes.object,
  config: PropTypes.object

};

module.exports =  withStyles(styles)(Editor);
