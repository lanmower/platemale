import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { withTracker } from 'meteor/react-meteor-data';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.getUserType = this.getUserType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOAuthUser = this.renderOAuthUser.bind(this);
    this.renderPasswordUser = this.renderPasswordUser.bind(this);
    this.renderProfileForm = this.renderProfileForm.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        currentPassword: {
          required() {
            // Only required if newPassword field has a value.
            return component.newPassword.value.length > 0;
          },
        },
        newPassword: {
          required() {
            // Only required if currentPassword field has a value.
            return component.currentPassword.value.length > 0;
          },
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        currentPassword: {
          required: 'Need your current password if changing.',
        },
        newPassword: {
          required: 'Need your new password if changing.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  getUserType(user) {
    const userToCheck = user;
    delete userToCheck.services.resume;
    const service = Object.keys(userToCheck.services)[0];
    return service === 'password' ? 'password' : 'oauth';
  }

  handleSubmit() {
    const profile = {
      emailAddress: this.emailAddress.value,
      profile: {
        name: {
          first: this.firstName.value,
          last: this.lastName.value,
        },
      },
    };

    if (this.newPassword.value) profile.password = Accounts._hashPassword(this.newPassword.value);

    Meteor.call('users.editProfile', profile, (error) => {
      if (error) {
        window.dialog(error.reason, 'danger');
      } else {
        window.dialog('Profile updated!', 'success');
      }
    });
  }

  renderOAuthUser(loading, user) {
    return !loading ? (<div className="OAuthProfile">
      {Object.keys(user.services).map(service => (
        <div key={service} className={`LoggedInWith ${service}`}>
          <div className="ServiceIcon"><i className={`fa fa-${service === 'facebook' ? 'facebook-official' : service}`} /></div>
          <p>{`You're logged in with ${capitalize(service)} using the email address ${user.services[service].email}.`}</p>
        </div>
      ))}
    </div>) : <div />;
  }

  renderPasswordUser(loading, user) {

    return !loading ? (<div >
      <FormGroup>
      <FormLabel>First Name</FormLabel>

            <input
              type="text"
              name="firstName"
              defaultValue={user.profile.name.first}
              ref={firstName => (this.firstName = firstName)}
              className="form-control"
            />
            </FormGroup>
      <FormGroup>
      <FormLabel>Last Name</FormLabel>

            <input
              type="text"
              name="lastName"
              defaultValue={user.profile.name.last}
              ref={lastName => (this.lastName = lastName)}
              className="form-control"
            />
            </FormGroup>
      <FormGroup>
      <FormLabel>Email Address</FormLabel>

        <input
          type="email"
          name="emailAddress"
          defaultValue={user.emails[0].address}
          ref={emailAddress => (this.emailAddress = emailAddress)}
          className="form-control"
        />
        </FormGroup>
      <FormGroup>
      <FormLabel>Current Password</FormLabel>

        <input
          type="password"
          name="currentPassword"
          ref={currentPassword => (this.currentPassword = currentPassword)}
          className="form-control"
        />
        </FormGroup>
      <FormGroup>
      <FormLabel>New Password</FormLabel>

        <input
          type="password"
          name="newPassword"
          ref={newPassword => (this.newPassword = newPassword)}
          className="form-control"
        />
        </FormGroup>
        Use at least six characters.
      <FormGroup>
      </FormGroup>
    </div>) : <div />;
  }

  renderProfileForm(loading, user) {
    return !loading ? ({
      password: this.renderPasswordUser,
      oauth: this.renderOAuthUser,
    }[this.getUserType(user)])(loading, user) : <div />;
  }

  render() {
    const { loading, user } = this.props;
    const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
      buttonStore.set(<SaveIcon onClick={this.handleSubmit}/>);

    return (<Paper className="Profile">
        <form   ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          {this.renderProfileForm(loading, user)}
        </form>
    </Paper>);
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

module.exports =  withTracker(() => {
  const subscription = Meteor.subscribe('users.editProfile');

  return {
    loading: !subscription.ready(),
    user: Meteor.user(),
  };
})(Profile);
