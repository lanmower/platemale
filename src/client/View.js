import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './components/NotFound';
import getElement from './modules';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: "1em",
    minWidth:600,
    maxWidth:800,
    marginLeft:"auto",
    marginRight:"auto"
  }
});
class ViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const {navButtonStore, collections, match, doc, history, config, _id, collection} = this.props;
    navButtonStore.set(<div>
      <IconButton className="raised" style={{color:"white"}} onClick={() => config.viewHandleRemove(_id, collection, history)} aria-label="Delete">
          <DeleteIcon />
      </IconButton>
      <IconButton className="raised" style={{color:"white"}} onClick={() => history.push(`${match.url}/edit`)} aria-label="Delete">
          <EditIcon />
      </IconButton>
    </div>)
  }

  render() {
    const {
      doc, match, history, loading, collection, classes, config
    } = this.props;
    const state = this.state;

  const {schema} = config
  return (doc ? (
    <div className="View">
      <Paper elevation={0} className={classes.root}>
      <div>
          {
            schema.map((field)=>{
              const value = doc[field.name];
              field.view = 'view';
              const customElement = getElement({field, state:doc, value});
              return (
                <div key={field.name}>
                 {customElement}
                </div>
              )
            })
          }
      </div>
      </Paper>
      </div>

  ) : <NotFound />);
}
};


module.exports =  withStyles(styles)(ViewComponent);
