import React from 'react';
import TextField from '@material-ui/core/TextField';

module.exports =  ({field, state, setState})=>{
  const onChange = (event, value) => {
    const newState = {};
    newState[field.name] = event.target.value;
    setState(newState);
  }
  return (<div><TextField
                    id={field.name}
                    label={field.label}
                    margin="normal"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={state[field.name]}
                    onChange={onChange}
                  /></div>);
}
