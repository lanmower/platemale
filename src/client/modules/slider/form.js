import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/lab/Slider';

module.exports =  ({field, state, setState})=>{
  const onChange = (event, value) => {
    const newState = {};
    newState[field.name] = value;
    setState(newState);
  }
  return (<div><FormLabel>{field.label}</FormLabel><Slider
      min={field.min}
      max={field.max}
      step={field.step}
      value={state[field.name]}
      onChange={onChange}
  />
  <FormLabel>{state[field.name]}</FormLabel></div>);
}
