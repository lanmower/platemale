import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import PublicNavigation from './PublicNavigation';
import OfflineNavigation from './OfflineNavigation';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../client/components/Loading';

const AuthenticatedDisplay = (props) => {
  const {authenticated} = props;
  return authenticated ? <AuthenticatedNavigation {...props} />:<PublicNavigation {...props}/>
}

export const menuStore = ReactiveVar([]);

class Navigation extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  }
  render() {
    const { match, location, history, title, authenticated, loading, connected, navButtons, navButtonStore } = this.props
    return (
      <div>
        <div style={{height:"65px"}}></div>
        <AppBar position="fixed">
          <Toolbar>
            {!connected ? <OfflineNavigation {...this.props} />:<AuthenticatedDisplay {...this.props}/>}
            <Typography type="title" color="inherit">
              {title}
            </Typography>
            <div style={{marginRight: "0px", marginLeft: "auto"}}>{ navButtons }</div>
            {loading?<Loading/>:false}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(withTracker(({navButtonStore}) => {

  const loggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();
  const navButtons = navButtonStore.get();

  return {
    navButtons,
    navButtonStore,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    connected: Meteor.status().connected,
    options:menuStore.get()
  };
})(Navigation));
