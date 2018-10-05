import React from 'react';

module.exports =  ({field, state, onChange})=>{
  return (<div><b>{field.label}</b>: {state[field.name].primaryEmail}</div>);
}
