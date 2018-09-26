import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

module.exports =  ({field, state, onChange})=>{
  return (<div><TextField
                    id={field.name}
                    label={field.label}
                    multiline
                    rows="4"
                    margin="normal"
                    value={state[field.name]}
                    onChange={onChange}
                  /></div>);
}
