import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import AccountPageFooter from '../components/AccountPageFooter';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const email = this.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        window.dialog(error.reason, 'danger');
      } else {
        window.dialog(`Check ${email} for a reset link!`, 'success');
        history.push('/login');
      }
    });
  }

  render() {
    return (<div className="RecoverPassword">
          <h4 className="page-header">Recover Password</h4>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              Email Address
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
            <Button type="submit">Recover Password</Button>
          </form>
    </div>);
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

module.exports =  RecoverPassword;
