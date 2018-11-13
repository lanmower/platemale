import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

const styles = {
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, content, title, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        {title?<DialogTitle id="simple-dialog-title">{title}</DialogTitle>:""}
        <div>
          {content}
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class dialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  componentDidMount() {
    window.dialog = (content, title)=>(this.setState({content}), this.setState({title}))
    window.alert = (content)=>(this.setState({content}))
  }

  handleClose = value => {
    this.setState({ open: false });

  };

  render() {
    return (
      <div>
        test
        <SimpleDialogWrapped
          content={this.state.content}
          title={this.state.title}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default dialog;
