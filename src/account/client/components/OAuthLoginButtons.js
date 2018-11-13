import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from "meteor/react-meteor-data";
import {ReactiveVar} from "meteor/reactive-var";
import OAuthLoginButton from './OAuthLoginButton';

const OAuthLoginButtons = ({ serv, emailMessage }) => {
  const services = serv?serv:[];
  console.log(services);
  return services.length ? (
    <div className={`OAuthLoginButtons ${emailMessage ? 'WithEmailMessage' : ''}`}>
      {services.map(service => <OAuthLoginButton key={service} service={service} />)}
      {emailMessage ? <p className="EmailMessage" style={{ marginLeft: `-${emailMessage.offset}px` }}>
        {emailMessage.text}
      </p> : ''}
    </div>
  ) : ""
};


const verificationComplete = new ReactiveVar(false);
const verifiedServices = new ReactiveVar([]);

module.exports =  withTracker(({ services }) => {
  if (!verificationComplete.get()) {
    Meteor.call('oauth.verifyConfiguration', services, (error, response) => {
      if (error) {
        console.warn(error);
      } else {
        verifiedServices.set(response);
        verificationComplete.set(true);
      }
    });
  }

  return {
    services: verifiedServices.get(),
  };
})(OAuthLoginButtons);
