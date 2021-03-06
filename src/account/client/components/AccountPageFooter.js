import React from 'react';
import PropTypes from 'prop-types';

const AccountPageFooter = ({ children }) => (
  <div className="AccountPageFooter">
    {children}
  </div>
);

AccountPageFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

module.exports = AccountPageFooter;
