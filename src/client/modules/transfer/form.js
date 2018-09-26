import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

module.exports =  ({field, state, onChange})=>{
  return (<div><TextField
                    id={field.name}
                    label={field.label}
                    margin="normal"
                    type={field.inputType?field.inputType:"text"}
                    value={state[field.name]}
                    onChange={onChange}
                    inputProps={{
                      step: field.step
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /></div>);
}
