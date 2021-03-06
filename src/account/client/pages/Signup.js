import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import OAuthLoginButtons from '../components/OAuthLoginButtons';
import AccountPageFooter from '../components/AccountPageFooter';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    /*validate(component.form, {
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
        password: {
          required: true,
          minlength: 6,
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
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });*/
  }

  handleSubmit() {
    const { history } = this.props;

    Accounts.createUser({
      email: this.emailAddress.value,
      password: this.password.value,
      profile: {
        name: {
          first: this.firstName.value,
          last: this.lastName.value,
        },
      },
    }, (error) => {
      if (error) {
        window.dialog(error.reason, 'danger');
      } else {
        window.dialog('Welcome!', 'success');
        history.push('/');
      }
    });
  }

  render() {
    const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
    return (<div className="Signup">
      <div >
      <h4 className="page-header">Sign Up</h4>
      <OAuthLoginButtons
        services={['facebook', 'github', 'google']}
        emailMessage={{
          offset: 97,
          text: '',
        }}
      />
        <form ref={form => (this.form = form)} onSubmit={event => {event.preventDefault();this.handleSubmit();}}>
        <FormGroup>
          <FormLabel>First Name</FormLabel>
          <input
            type="text"
            name="firstName"
            ref={firstName => (this.firstName = firstName)}
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Last Name
              </FormLabel>
          <input
            type="text"
            name="lastName"
            ref={lastName => (this.lastName = lastName)}
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Email Address
              </FormLabel>
          <input
            type="email"
            name="emailAddress"
            ref={emailAddress => (this.emailAddress = emailAddress)}
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Password
              </FormLabel>
          <input
            type="password"
            name="password"
            ref={password => (this.password = password)}
            className="form-control"
          />
          Use at least six characters.
        </FormGroup>
        <FormGroup>
          <Button type="submit" raised color="primary">Sign Up</Button>
          Already have an account? <Link to="/signup">Log In</Link>.
              </FormGroup>
      </form>
    </div>
    </div>);
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

module.exports =  Signup;
