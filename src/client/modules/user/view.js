import React from 'react';

module.exports =  ({field, state, onChange})=>{
  console.log(state);
  return (<div><b>{field.label}</b>: {state[field.name].primaryEmail}</div>);
}
